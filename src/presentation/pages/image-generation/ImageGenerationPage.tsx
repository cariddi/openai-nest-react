import { useState } from 'react'
import { imageGenerationUseCase } from '../../../core/use-cases'
import type { ImageGenerationInfo } from '../../../interfaces'
import { GptMessage, MyMessage, TextMessageBox, TypingLoader } from '../../components'

interface Message {
  text: string
  isGpt: boolean
  info?: ImageGenerationInfo
}

export const ImageGenerationPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async (text: string) => {
    setIsLoading(true)

    setMessages((prevMessages) => [...prevMessages, { text, isGpt: false }])

    // TODO: use case
    const { ok, revised_prompt, url } = await imageGenerationUseCase(text)

    if (!ok) setMessages((prevMessages) => [...prevMessages, { text: 'Could not generate image', isGpt: true }])
    else setMessages((prevMessages) => [...prevMessages, { text: url, isGpt: true, info: { alt: revised_prompt, imageUrl: url } }])

    setIsLoading(false)

    // TODO: add msg of GPT
  }

  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        <div className='grid grid-cols-12 gap-y-2'></div>

        {/* Welcome */}
        <GptMessage text='What image would you like to generate today?' />

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
