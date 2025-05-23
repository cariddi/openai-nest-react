import { GptMessage, MyMessage, TextMessageBox, TypingLoader } from '../../components'

export const OrthographyPage = () => {
  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        <div className='grid grid-cols-12 gap-y-2'></div>

        {/* Bienvenida */}
        <GptMessage text='Hola, puedes escribir tu texto en español, y te ayudo con las correciones' />

        <MyMessage text='Hello World' />

        <TypingLoader className='fade-in' />

      </div>

      <TextMessageBox onSendMessage={(message: string) => console.log({ message })} placeholder='Type here what you need' disableCorrections />
    </div>
  )
}
