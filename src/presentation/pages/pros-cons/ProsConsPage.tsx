import { useState } from 'react'
import { PROS_CONS_ERROR_RESPONSE, prosConsUseCase } from '../../../core/use-cases/pros-cons.use-case'
import { GptMessage, MyMessage, TextMessageBox, TypingLoader } from '../../components'

interface Message {
  text: string
  isGpt: boolean
}

export const ProsConsPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async (text: string) => {
    setIsLoading(true)

    setMessages((prevMessages) => [...prevMessages, { text, isGpt: false }])

    const data = await prosConsUseCase(text)

    if (!data.ok) setMessages((prevMessages) => [...prevMessages, { text: PROS_CONS_ERROR_RESPONSE.content, isGpt: true }])
    else setMessages((prevMessages) => [...prevMessages, { text: data.content, isGpt: true, info: data }])

    setIsLoading(false)
  }

  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        <div className='grid grid-cols-12 gap-y-2'></div>

        {/* Welcome */}
        <GptMessage text='Hi there, here you can ask about pros & const of anything you would like' />

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
