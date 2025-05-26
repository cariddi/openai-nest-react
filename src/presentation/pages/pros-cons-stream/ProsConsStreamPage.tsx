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

    const reader = await prosConsStreamUseCase(text)
    setIsLoading(false)

    if (!reader) return alert('Could not get the stream reader')

    // Generate "last" mssage
    const decoder = new TextDecoder();
    let message = '';
    setMessages((prevMessages) => [...prevMessages, { text: message, isGpt: true }])

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      message += decoder.decode(value, { stream: true });

      setMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        newMessages[newMessages.length - 1].text = message;

        return newMessages;
      })
    }
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
