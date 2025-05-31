import { useState } from 'react'
import { audioToTextUseCase } from '../../../core/use-cases'
import { GptMessage, MyMessage, TextMessageBoxFile, TypingLoader } from '../../components'

interface Message {
  text: string
  isGpt: boolean
}

export const AudioToTextPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async (text: string, audioFile: File) => {
    setIsLoading(true)

    await audioToTextUseCase(audioFile, text)
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
        <GptMessage text='Hi there, what audio would you like me to transcribe today?' />

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

      <TextMessageBoxFile onSendMessage={handlePost} accept='audio/*' placeholder='Type here what you need' disableCorrections />
    </div>
  )
}
