
import { createRoot } from 'react-dom/client'
import './index.css'
import PositionPasser from './positionPasser'
import { StrictMode } from 'react'

createRoot(document.getElementById('mainApp')).render(
  <StrictMode>
    <PositionPasser />
  </StrictMode>
)

