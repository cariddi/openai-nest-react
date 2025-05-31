import { useRef, useState } from 'react';

interface TextMessageBoxFileProps {
  onSendMessage: (message: string, file: File) => void;
  placeholder?: string;
  disableCorrections?: boolean;
  accept?: string;
}

export const TextMessageBoxFile: React.FC<TextMessageBoxFileProps> = ({
  onSendMessage,
  disableCorrections = false,
  placeholder,
  accept
}) => {
  const [message, setMessage] = useState("")

  const [selectedFile, setSelectedFile] = useState<File | null>()
  const inputFileRef = useRef<HTMLInputElement>(null)

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!selectedFile) return

    onSendMessage(message, selectedFile)
    setMessage("")
    setSelectedFile(null)
  }

  return (
    <form className='flex flex-row items-center h-16 rounded-xl bg-white w-full px-4' onSubmit={handleSendMessage}>
      <div className='mr-3'>
        <button
          type='button'
          className='flex items-center justify-center text-gray-400 hover:text-gray-600'
          onClick={() => inputFileRef.current?.click()}
        >
          <i className='fa-solid fa-paperclip text-xl'></i>
        </button>

        <input
          type='file'
          hidden
          ref={inputFileRef}
          accept={accept}
          onChange={(e) => setSelectedFile(e.target.files?.item(0))}
        />
      </div>

      <div className='flex-grow'>
        <div className='relative w-full'>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type='text'
            autoFocus
            name='message'
            className='flex w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10'
            placeholder={placeholder}
            autoComplete={disableCorrections ? 'off' : 'on'}
            autoCorrect={disableCorrections ? 'off' : 'on'}
            spellCheck={disableCorrections ? "true" : "false"}
          />
        </div>
      </div>

      <div className='ml-4'>
        <button className='btn-primary' disabled={!selectedFile}>
          {
            (selectedFile)
              ? <span className='mr-2'>{selectedFile.name.substring(0, 10) + "..."}</span>
              : <span className='mr-2'>Submit</span>
          }

          <i className='fa-regular fa-paper-plane'></i>
        </button>
      </div>
    </form>
  )
}
