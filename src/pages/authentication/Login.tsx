import { FC } from 'react'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import videoBg from '@/assets/bg-video.mp4'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { HiChevronDoubleDown } from 'react-icons/hi'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import ZooLogo from '@/assets/logo.webp'
// import { useNavigate } from 'react-router-dom'
// import { useMutation } from 'react-query'

// import { apiCaller } from '@/utils'
// import { useUserStore } from '@/stores'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useNavigate } from 'react-router-dom'
import { useUserStore } from '@/stores'
import { useMutation } from 'react-query'
import { apiCaller } from '@/utils'

const Login: FC = () => {
  // const token = useUserStore((state) => state.user)?.token
  const setUser = useUserStore((state) => state.setUser)

  const navigate = useNavigate()
  // const { login, isLoading, isSuccess } = useLogin()
  // const { getUser } = useAuth()

  const usMutation = useMutation({
    mutationFn: (credentialResponse: CredentialResponse) => {
      return apiCaller.get('/auth/login-google', credentialResponse)
    },
    onSuccess: (data) => {
      console.log('data: ', data)
      setUser({ token: data.data.accessToken })
      // setUser(data.data)
      navigate('/dashboard')
    },
    onError: (error) => {
      if (error instanceof Error) console.log('error: ', error)
    }
  })
  // if (isSuccess) {
  //   navigate('/dashboard')
  // }
  return (
    <div className='font-ime w-screen h-screen flex relative justify-center items-center bg-white'>
      <div className='absolute  inset-0 '>
        <video src={videoBg} className='w-full h-full object-cover' autoPlay muted loop />
      </div>
      <div className='z-10 flex flex-col gap- items-center backdrop-blur-3xl bg-slate-200 bg-opacity-20  shadow-2xl  p-4  md:p-10 rounded-xl min-h-1/2 max-w-lg justify-between'>
        <h1 className='flex flex-col  items-center gap-8 mb-10'>
          <div
            className='scale-150 animate-fade animate-once animate-duration-[5000ms]
'
          >
            <Avatar>
              <AvatarImage src={ZooLogo} className='object-cover' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <span className='drop-shadow-lg animate-pulse animate-infinite animate-duration-[3000ms] uppercase text-5xl md:text-7xl font-extrabold bg-gradient-to-tr from-gray-200 to-slate-50  text-transparent bg-clip-text  '>
            zoocamp
          </span>
          {/* <span className=' text-white italic font-sans text-4xl font-extrabold capitalize'>welcome</span> */}
        </h1>
        {!usMutation.isLoading ? (
          <div className='flex gap-3 flex-col items-center'>
            <p className='font-medium text-lg text-white'>Sign in to continue</p>
            <HiChevronDoubleDown color={'white'} className='animate-bounce animate-infinite' />
            <div className='shadow-2xl'>
              <GoogleLogin
                onSuccess={(credentialResponse: CredentialResponse) => {
                  console.log('credentialResponse: ', credentialResponse)
                  // apiCaller.post<string>('/test-login-google', credentialResponse, {}, {}).then((data) => {
                  //   console.log('data: ', data)
                  //   setUser({ token: data.data })
                  // })
                  // const usProfile: dataCredential = jwt_decode(credentialResponse.credential as string)
                  usMutation.mutate(credentialResponse)
                  // if (token && isSuccess) navigate('/dashboard')

                  // usMutation.mutate(credentialResponse)
                }}
                onError={() => {
                  console.log('Login Failed')
                }}
              />
            </div>
          </div>
        ) : (
          <Button disabled variant={'ghost'} size={'lg'}>
            <div className='font-ime flex items-center text-white'>
              <AiOutlineLoading3Quarters className='mr-2 h-4 w-4 animate-spin' />
              <span className='font-ultra text-white'>Please wait . . .</span>
            </div>
          </Button>
        )}
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login
