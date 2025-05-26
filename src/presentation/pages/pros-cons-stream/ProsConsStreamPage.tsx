import { useRef, useState } from 'react'
import { prosConsStreamGeneratorUseCase } from '../../../core/use-cases'
import { GptMessage, MyMessage, TextMessageBox, TypingLoader } from '../../components'

interface Message {
  text: string
  isGpt: boolean
}

export const ProsConsStreamPage = () => {
  const abortController = useRef(new AbortController())
  const isRunning = useRef(false)

  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async (text: string) => {
    if (isRunning.current) {
      abortController.current.abort()
      abortController.current = new AbortController()
    }

    setIsLoading(true)
    isRunning.current = true

    setMessages((prevMessages) => [...prevMessages, { text, isGpt: false }])

    const stream = prosConsStreamGeneratorUseCase(text, abortController.current.signal)
    setIsLoading(false)

    setMessages((prevMessages) => [...prevMessages, { text: "", isGpt: true }])

    for await (const chunk of stream) {
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        newMessages[newMessages.length - 1].text = chunk;

        return newMessages;
      })
    }

    isRunning.current = false
  }

  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        <div className='grid grid-cols-12 gap-y-2'></div>

        {/* Welcome */}
        <GptMessage text='What would you like to compare today?' />

        {
          messages.map((message, index) => (
            message.isGpt
              ? <GptMessage key={index} text={message.text} />
              : <MyMessage key={index} text={message.text} />
          ))
        }

        {
          isLoading && (
            <div className='col-start-1 col-end-12 fade-in'>
              <TypingLoader />
            </div>
          )
        }

      </div>

      <TextMessageBox onSendMessage={handlePost} placeholder='Type here what you need' disableCorrections />
    </div>
  )
}
