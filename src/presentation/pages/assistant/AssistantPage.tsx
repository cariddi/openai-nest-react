import { useState } from 'react'
import { GptMessage, MyMessage, TextMessageBox, TypingLoader } from '../../components'

interface Message {
  text: string
  isGpt: boolean
}

export const AssistantPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async (text: string) => {
    setIsLoading(true)

    setMessages((prevMessages) => [...prevMessages, { text, isGpt: false }])

    // TODO: use case

    setIsLoading(false)

    // TODO: add msg of GPT
  }

  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        <div className='grid grid-cols-12 gap-y-2'></div>

        {/* Welcome */}
        <GptMessage text='Good morning! I am Sam, what can I help you with today?' />

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
