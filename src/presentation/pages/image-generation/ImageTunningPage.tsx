import { useState } from 'react'
import { imageGenerationUseCase, imageVariationUseCase } from '../../../core/use-cases'
import type { ImageGenerationInfo } from '../../../interfaces'
import { GptMessage, GptMessageSelectableImage, MyMessage, TextMessageBox, TypingLoader } from '../../components'

interface Message {
  text: string
  isGpt: boolean
  info?: ImageGenerationInfo
}

interface OriginalImagAndMask {
  original: string | undefined
  mask: string | undefined
}

export const ImageTunningPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      isGpt: true,
      text: 'Base image',
      info: {
        alt: 'base image',
        imageUrl: 'http://localhost:3000/gpt/image-generation/1748824592736.png'
      }
    }
  ])

  const [originalImagAndMask, setoriginalImagAndMask] = useState<OriginalImagAndMask>({
    original: undefined,
    mask: undefined
  })

  const handleVariation = async () => {
    setIsLoading(true)

    const { ok, revised_prompt, url } = await imageVariationUseCase(originalImagAndMask.original!)

    if (!ok) setMessages((prevMessages) => [...prevMessages, { text: 'Could not generate image', isGpt: true }])
    else setMessages(
      (prevMessages) => [
        ...prevMessages,
        {
          text: 'Variation generated',
          isGpt: true,
          info: {
            alt: revised_prompt,
            imageUrl: url
          }
        }
      ]
    )

    setIsLoading(false)
  }

  const handlePost = async (text: string) => {
    setIsLoading(true)

    setMessages((prevMessages) => [...prevMessages, { text, isGpt: false }])

    const { mask, original } = originalImagAndMask
    const { ok, revised_prompt, url } = await imageGenerationUseCase(text, original, mask)

    if (!ok) setMessages((prevMessages) => [...prevMessages, { text: 'Could not generate image', isGpt: true }])
    else setMessages(
      (prevMessages) => [
        ...prevMessages,
        {
          text,
          isGpt: true,
          info: {
            imageUrl: url,
            alt: revised_prompt,
          }
        }
      ]
    )

    setIsLoading(false)
  }

  return (
    <>
      {
        originalImagAndMask.original && (
          <div
            className='fixed flex flex-col items-center top-10 right-10 z-10 fade-in'
          >
            <span>Editing</span>
            <img
              src={originalImagAndMask.mask ?? originalImagAndMask.original}
              alt='Original Image'
              className='border rounded-xl w-36 h-36 object-cover'
            />
            <button
              className='btn-primary mt-2'
              onClick={handleVariation}
            >
              Generate Variation
            </button>
          </div>
        )
      }
      <div className='chat-container'>
        <div className='chat-messages'>
          <div className='grid grid-cols-12 gap-y-2'></div>

          {/* Welcome */}
          <GptMessage text='What image would you like to generate today?' />

          {
            messages.map((message, index) => (
              message.isGpt
                ? message.info
                  ? (
                    <GptMessageSelectableImage
                      key={index}
                      imageUrl={message.info?.imageUrl}
                      alt={message.info?.alt}
                      onImageSelected={(maskImageUrl: string) => setoriginalImagAndMask({
                        original: message.info?.imageUrl!,
                        mask: maskImageUrl
                      })}
                    />
                  )
                  : <GptMessage key={index} text={message.text} />
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
    </>
  )
}
