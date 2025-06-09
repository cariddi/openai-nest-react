import { useEffect, useState } from 'react'
import { createThreadUseCase, postUserQuestionUseCase } from '../../../core/use-cases'
import { GptMessage, MyMessage, TextMessageBox, TypingLoader } from '../../components'

interface Message {
  text: string
  isGpt: boolean
}

export const AssistantPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const [threadId, setThreadId] = useState<string>()

  useEffect(() => {
    const threadId = localStorage.getItem('threadId')

    if (threadId) setThreadId(threadId)
    else {
      createThreadUseCase().then((id) => {
        setThreadId(id)
        localStorage.setItem('threadId', id)
      })
    }
  }, [])

  useEffect(() => {
    if (threadId) {
      setMessages((prevMessages) => [...prevMessages, { text: `Current thread ID is: ${threadId}`, isGpt: true }])
    }
  }, [threadId])


  const handlePost = async (text: string) => {
    if (!threadId) return

    setIsLoading(true)

    setMessages((prevMessages) => [...prevMessages, { text, isGpt: false }])

    const replies = await postUserQuestionUseCase(threadId, text)

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
