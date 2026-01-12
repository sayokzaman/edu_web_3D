import { BrowserRouter, Route, Routes } from 'react-router'
import SolarSystem from './pages/solar-system'
import ScalesPage from './pages/scales-page'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<SolarSystem />} />

                <Route path='/scales' element={<ScalesPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
