import { useState } from 'react'
import { prosConsStreamUseCase } from '../../../core/use-cases'
import { GptMessage, MyMessage, TextMessageBox, TypingLoader } from '../../components'

interface Message {
  text: string
  isGpt: boolean
}

export const ProsConsStreamPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async (text: string) => {
    setIsLoading(true)

    setMessages((prevMessages) => [...prevMessages, { text, isGpt: false }])

    await prosConsStreamUseCase(text)

    setIsLoading(false)

    // TODO: add msg of GPT
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
              ? <GptMessage key={index} text={"This comes from OpenAI"} />
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
