import type { OrthographyResponse } from '../../../interfaces'

interface GptOrthographyMessageProps extends OrthographyResponse { }

export const GptOrthographyMessage: React.FC<GptOrthographyMessageProps> = ({ errors, message, userScore }) => {
  return (
    <div className='col-start-1 col-end-9 p-3 rounded-lg'>
      <div className='flex flex-row items-start'>

        <div className='flex items-center justify-center h-10 w-10 rounded-full bg-green-400 flex-shrink-0'>
          G
        </div>
        <div className='relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl'>

          <h3 className='text-3xl'>Score: {userScore}%</h3>
          <p>{message}</p>

          <ul>
            {
              errors.length === 0
                ? <p>No errors found, excellent!</p>
                : (
                  <>
                    <h3 className='text-2xl'>Errors found</h3>
                    <ul>
                      {
                        errors.map((error, i) => (
                          <li key={i} className='text-red-500'>
                            {error}
                          </li>
                        ))
                      }
                    </ul>
                  </>
                )
            }
          </ul>
        </div>


      </div>
    </div>
  )
}
