import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { GoogleOAuthProvider } from '@react-oauth/google'
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
import { Toaster } from '@/components/ui/toaster'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='964055842588-hlq05p5frulh1jetq2qqngan7vnscbuh.apps.googleusercontent.com'>
      <App />
      <ToastContainer />
      <Toaster />
    </GoogleOAuthProvider>
  </React.StrictMode>
)
