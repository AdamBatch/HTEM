import PositionChart from './position/positionChart'
import ConcentrationChart from './Concentration/concentrationChart'
import OpticalChart from './optical/opticalChart'
import XRDChart from './xrd/xrdChart'
import Description from './description'
import { useState } from 'react'

function ToPosition({setPositionsChosen}){
    return(
        <PositionChart
            setPositionsChosen = {setPositionsChosen}
        />
    )
}

function ToConcentration({positionsChosen}){
    return(
        <ConcentrationChart
            positionsChosen = {positionsChosen}
        />
    )
}

function ToOptical({positionsChosen}){
    return(
        <OpticalChart
            positionsChosen = {positionsChosen}
        />
    )
}

function ToXRD({positionsChosen}){
    return(
        <XRDChart
            positionsChosen = {positionsChosen}
        />
    )
}



function positionPasser() {

    const positions = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 
        12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 
        22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 
        32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 
        42, 43, 44,
    ]

    const [positionsChosen, setPositionsChosen] = useState(positions)

        return (
            <div className = 'wrapper'>
                <div className = 'description'>
                    <Description/>
                </div>
                <div className = 'positionGraph'>
                    <ToPosition
                        setPositionsChosen = {setPositionsChosen}
                    />
                </div>
                <div className = 'concentrationGraph'>
                    <ToConcentration
                        positionsChosen = {positionsChosen}
                    />
                </div>
                <div className='opticalGraph'>
                    <ToOptical
                        positionsChosen = {positionsChosen}
                    />
                </div>
                <div className='xrdGraph'>
                    <ToXRD
                        positionsChosen = {positionsChosen}
                    />
                </div>
            </div>
        );
}

export default positionPasser;