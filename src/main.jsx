import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ConcentrationChart from './Concentration/concentrationChart'
import PositionChart from './position/positionChart'
import OpticalChart from './optical/opticalChart'
import XrdChart from './xrd/xrdChart'
import PositionPasser from './positionPasser'

createRoot(document.getElementById('mainApp')).render(
  <StrictMode>
    <PositionPasser />
  </StrictMode>
)

// createRoot(document.getElementById('concentrationGraph')).render(
//   <StrictMode>
//     <ConcentrationChart />
//   </StrictMode>
// )

// createRoot(document.getElementById('positionGraph')).render(
//   <StrictMode>
//     <PositionChart />
//   </StrictMode>
// )

// createRoot(document.getElementById('opticalGraph')).render(
//   <StrictMode>
//     <OpticalChart />
//   </StrictMode>
// )

// createRoot(document.getElementById('xrdGraph')).render(
//   <StrictMode>
//     <XrdChart />
//   </StrictMode>
// )