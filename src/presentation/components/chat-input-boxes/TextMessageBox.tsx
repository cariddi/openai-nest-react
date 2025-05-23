import { useState } from 'react';

interface TextMessageBoxProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disableCorrections?: boolean;
}

export const TextMessageBox: React.FC<TextMessageBoxProps> = ({
  onSendMessage,
  disableCorrections = false,
  placeholder
}) => {
  const [message, setMessage] = useState("")

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (message.trim().length === 0) return

    onSendMessage(message)
    setMessage("")
  }

  return (
    <form className='flex flex-row items-center h-16 rounded-xl bg-white w-full px-4' onSubmit={handleSendMessage}>
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
        <button className='btn-primary'>
          <span className='mr-2'>Submit</span>
          <i className='fa-regular fa-paper-plane'></i>
        </button>
      </div>
    </form>
  )
}
