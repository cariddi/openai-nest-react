import { useState } from 'react'
import { ORTHOGRAPHY_ERROR_RESPONSE, orthographyUseCase } from '../../../core/use-cases'
import type { OrthographyInfo } from '../../../interfaces'
import { GptMessage, GptOrthographyMessage, MyMessage, TextMessageBox, TypingLoader } from '../../components'

interface Message {
  text: string
  isGpt: boolean
  info?: OrthographyInfo
}

export const OrthographyPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async (text: string) => {
    setIsLoading(true)

    setMessages((prevMessages) => [...prevMessages, { text, isGpt: false }])

    const data = await orthographyUseCase(text)

    if (!data.ok) setMessages((prevMessages) => [...prevMessages, { text: ORTHOGRAPHY_ERROR_RESPONSE.message, isGpt: true }])
    else setMessages((prevMessages) => [...prevMessages, { text: data.message, isGpt: true, info: data }])

    setIsLoading(false)
  }

  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        <div className='grid grid-cols-12 gap-y-2'></div>

        {/* Welcome */}
        <GptMessage text='Hola, puedes escribir tu texto en español, y te ayudo con las correciones' />

        {
          messages.map(
            (message, index) => (
              message.isGpt
                ? <GptOrthographyMessage key={index} {...message.info!} />
                : <MyMessage key={index} text={message.text} />
            )
          )
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
