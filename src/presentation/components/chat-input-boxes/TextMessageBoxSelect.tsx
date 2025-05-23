import { useState } from 'react';

interface TextMessageBoxSelectProps {
  onSendMessage: (message: string, selectedOption: string) => void;
  placeholder?: string;
  disableCorrections?: boolean;
  options: Option[]
}

interface Option {
  id: string;
  text: string;
}

export const TextMessageBoxSelect: React.FC<TextMessageBoxSelectProps> = ({
  onSendMessage,
  disableCorrections = false,
  placeholder,
  options
}) => {
  const [message, setMessage] = useState("")
  const [selectedOption, setselectedOption] = useState<string>("")

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (message.trim().length === 0) return

    onSendMessage(message, selectedOption)
    setMessage("")
  }

  return (
    <form className='flex flex-row items-center h-16 rounded-xl bg-white w-full px-4' onSubmit={handleSendMessage}>
      <div className='flex-grow'>
        <div className='flex'>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type='text'
            autoFocus
            name='message'
            className='w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10'
            placeholder={placeholder}
            autoComplete={disableCorrections ? 'off' : 'on'}
            autoCorrect={disableCorrections ? 'off' : 'on'}
            spellCheck={disableCorrections ? "true" : "false"}
          />

          <select
            name="select"
            className='w-2/5 ml-5 border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10'
            value={selectedOption}
            onChange={(e => setselectedOption(e.target.value))}
          >
            <option value={""}>Select an option</option>
            {
              options.map(({ id, text }) => (
                <option key={id} value={id}>
                  {text}
                </option>
              ))
            }
          </select>
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
