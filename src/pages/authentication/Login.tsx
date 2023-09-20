import { FC } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import videoBg from '@/assets/bg-video.mp4'
import { Button } from '@/components/ui/button'
const Login: FC = () => {
  return (
    <div className='w-screen h-screen flex relative justify-center items-center bg-white'>
      <div className='absolute  inset-0 opacity-50'>
        <video src={videoBg} className='w-full h-full object-cover' autoPlay muted loop />
      </div>
      <div className='z-10 flex flex-col gap-5'>
        <h1 className='bg-gradient-to-tr from-orange-600 to-slate-50 text-transparent bg-clip-text '>
          <span className=' text-black font-sans text-5xl font-extrabold'>Sign in to join </span>
          <span className='uppercase text-7xl font-extrabold '>zoocamp</span>
        </h1>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse)
          }}
          onError={() => {
            console.log('Login Failed')
          }}
        />
      </div>
    </div>
  )
}

export default Login
