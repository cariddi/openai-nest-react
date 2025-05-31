import { useState } from 'react'
import { AUDIO_TO_TEXT_ERROR_RESPONSE, audioToTextUseCase } from '../../../core/use-cases'
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

    setMessages((prevMessages) => [...prevMessages, { text, isGpt: false }])

    const resp = await audioToTextUseCase(audioFile, text)

    if (!resp.ok) setMessages((prevMessages) => [...prevMessages, { text: AUDIO_TO_TEXT_ERROR_RESPONSE.text, isGpt: true }])
    else {
      const gptMessage = `
## Transcription:
__Duration:__ ${Math.round(resp.duration)} seconds
### The transcription text is:
${resp.text}
      `
      setMessages((prevMessages) => [...prevMessages, { text: gptMessage, isGpt: true }])

      for (const segment of resp.segments) {
        const segmentMessage = `
__From ${Math.round(segment.start)} to ${Math.round(segment.end)} seconds:__
${segment.text}
        `

        setMessages((prevMessages) => [...prevMessages, { text: segmentMessage, isGpt: true }])
      }
    }

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
              ? <GptMessage key={index} text={message.text} />
              : <MyMessage key={index} text={message.text.length !== 0 ? message.text : "Transcribing audio file"} />
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

      <TextMessageBoxFile
        onSendMessage={handlePost}
        accept="audio/*"
        placeholder='Type here what you need'
        disableCorrections
      />
    </div>
  )
}
