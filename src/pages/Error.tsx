// type Props = {}
import bgImage from '@/assets/su-san-lee-g3PyXO4A0yc-unsplash.jpg'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import { Button } from '@/components/ui/button'
const errorQuoteMap = {
  400: 'Bad Request: The server could not understand the request.',
  401: 'Unauthorized: The requested resource requires authentication.',
  404: 'Not Found: The requested resource could not be found.',
  500: 'Internal Server Error: An unexpected condition was encountered by the server.'
  // Add more error status codes and corresponding quotes as needed
}
const defaultQuote = 'Unknown Error: An unexpected error occurred.'
const Error = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const status = Number(queryParams.get('errorStatus')) || 404
  return (
    <div className='w-full flex flex-col  justify-center items-center h-full gap-2 '>
      <h1
        className='-mb-16 animate-bounce animate-infinite animate-duration-1000 animate-ease-in font-luck text-7xl md:text-9xl font-extrabold tracking-widest text-transparent bg-contain bg-clip-text'
        style={{
          backgroundImage: `url(${bgImage})`
        }}
      >
        Oops!
      </h1>
      <div className='p-8   '>
        <h1 className=' font-bold text-5xl md:text-8xl font-ultra'>{status}</h1>
        <h1 className='my-2  font-bold text-xl md:text-2xl'>{errorQuoteMap[status as 404] || defaultQuote}</h1>
        <p className='my-2 '>Sorry about that! Please visit our hompage to get where you need to go.</p>
        <Button
          onClick={() => {
            navigate('')
          }}
          className='sm:w-full lg:w-auto my-2  flex gap-4 items-center border rounded md py-4 px-8 text-center focus:ring-opacity-50'
        >
          <span className='animate-shake animate-infinite animate-duration-[5000ms] animate-ease-linear animate-reverse'>
            <BiArrowBack></BiArrowBack>
          </span>
          Go back home
        </Button>
      </div>
    </div>
  )
}

export default Error
