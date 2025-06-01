import { useEffect, useRef } from 'react';

interface GptMessageSelectableImageProps {
  text?: string
  imageUrl: string
  alt: string
}

export const GptMessageSelectableImage: React.FC<GptMessageSelectableImageProps> = ({ text, imageUrl, alt }) => {
  console.log({ text, imageUrl, alt });
  const originalImageRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')

    const image = new Image()

    image.crossOrigin = 'Anonymous'
    image.src = imageUrl

    originalImageRef.current = image

    image.onload = () => {
      ctx?.drawImage(image, 0, 0, canvas.width, canvas.height)
    }
  }, [])

  return (
    <div className='col-start-1 col-end-9 p-3 rounded-lg'>
      <div className='flex flex-row items-start'>

        <div className='flex items-center justify-center h-10 w-10 rounded-full bg-green-400 flex-shrink-0'>
          G
        </div>
        <div className='relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl'>
          <canvas
            ref={canvasRef}
            width={1024}
            height={1024}
          />
          {/* <img
            src={imageUrl}
            alt={alt}
            className='mt-2 rounded-xl w-96 h-96 object-cover'
          /> */}
        </div>

      </div>
    </div>
  )
}
