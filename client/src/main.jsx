import { createRoot } from 'react-dom/client'
import './index.css'
import {App} from './App.jsx'
import {HashRouter} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import { AuthContProvider } from './context/AuthContext.jsx'
import { MessageContProv } from './context/MessageCont.jsx'
import { ConverasationProvider } from './context/Conversation.jsx'
import { SocketContProvider } from './context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
    <HashRouter>
    <AuthContProvider>
    <SocketContProvider>
    <MessageContProv>
    <ConverasationProvider>
    <Toaster/>
    <App />
    </ConverasationProvider>
    </MessageContProv>

    </SocketContProvider>
    </AuthContProvider>
     </HashRouter>
)
