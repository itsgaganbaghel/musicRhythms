
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { Routers } from './Components/Routes/Router.jsx'
import AuthContext from './Components/Context/AuthContext.jsx'
import SongContext from './Components/Context/SongContext.jsx'
import ModalContext from './Components/Context/ModalContext.jsx'
import { ThemeProvider } from './Components/Context/ThemeProvider.jsx'

createRoot(document.getElementById('root')).render(
    <ThemeProvider>
        <ModalContext>
            <SongContext>
                <AuthContext>
                    <RouterProvider router={Routers} >
                    </RouterProvider>
                </AuthContext>
            </SongContext>
        </ModalContext>
    </ThemeProvider>
)
