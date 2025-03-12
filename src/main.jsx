import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PositionPasser from './positionPasser'

createRoot(document.getElementById('mainApp')).render(
  <StrictMode>
    <PositionPasser />
  </StrictMode>
)

