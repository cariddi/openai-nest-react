import { useState } from 'react'
import { TRANSLATE_ERROR_RESPONSE, translateUseCase } from '../../../core/use-cases'
import { GptMessage, MyMessage, TextMessageBoxSelect, TypingLoader } from '../../components'

interface Message {
  text: string
  isGpt: boolean
}

const languages = [
  { id: "alemán", text: "Alemán" },
  { id: "árabe", text: "Árabe" },
  { id: "bengalí", text: "Bengalí" },
  { id: "francés", text: "Francés" },
  { id: "hindi", text: "Hindi" },
  { id: "inglés", text: "Inglés" },
  { id: "japonés", text: "Japonés" },
  { id: "mandarín", text: "Mandarín" },
  { id: "portugués", text: "Portugués" },
  { id: "ruso", text: "Ruso" },
];

export const TranslatePage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async (text: string, seletedOption: string) => {
    setIsLoading(true)

    const newMessage = `Translate the following text to the language ${seletedOption}: "${text}".`
    setMessages((prevMessages) => [...prevMessages, { text: newMessage, isGpt: false }])

    const data = await translateUseCase(text, seletedOption)

    if (!data.ok) setMessages((prevMessages) => [...prevMessages, { text: TRANSLATE_ERROR_RESPONSE.message, isGpt: true }])
    else setMessages((prevMessages) => [...prevMessages, { text: data.message, isGpt: true }])

    setIsLoading(false)
  }

  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        <div className='grid grid-cols-12 gap-y-2'></div>

        {/* Welcome */}
        <GptMessage text='Hi there, what would you like me to translate today?' />

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

      <TextMessageBoxSelect
        options={languages}
        onSendMessage={handlePost}
        placeholder='Type here what you need'
        disableCorrections
      />
    </div>
  )
}
