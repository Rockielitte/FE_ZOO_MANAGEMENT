import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
import { Toaster } from '@/components/ui/toaster'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='934045492148-r2m81eqq4724ukrj1bs8jlp5gn585pc8.apps.googleusercontent.com'>
      <App />
      {/* <ToastContainer /> */}
      <Toaster />
    </GoogleOAuthProvider>
  </React.StrictMode>
)
