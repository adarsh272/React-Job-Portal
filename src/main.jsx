import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserTypeProvider } from './context/UserTypeContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <UserTypeProvider>
        <App />
      </UserTypeProvider>
    </AuthProvider>
  </React.StrictMode>,
)
