import './App.css'
import React from 'react'
import data from './data/6651-property.json'
import ReactEcharts from 'echarts-for-react'

function App() {  
    console.log(data[0].x_mm);
    const xPos = data[0].x_mm;
    const yPos = data[0].y_mm;
    const bandGap = data[0].opt_direct_bandgap;
    const aveTrans = data[0].opt_average_vis_trans;
    const Pos = data[0].position;
    const concentrations = data[0].xrf_concentration;
    const initialPos = Pos.map((x) => x+1)

    const positionGraph = [];
    for (let i = 0; i < xPos.length; i++) {
        positionGraph.push([xPos[i], yPos[i], bandGap[i], aveTrans[i], Pos[i], parseFloat(concentrations[i][0]), parseFloat(concentrations[i][1])])
    }

    const barGraph = [];
    for (let i = 0; i < xPos.length; i++) {
        barGraph.push(bandGap[i])
    }

    function makeObject(obj, key, value) {
        obj[key] = value;
    }

    const concentrationNiO = []
    for (let i = 0; i < concentrations.length; i++) {
        concentrationNiO.push(parseFloat(concentrations[i][0]))
    }

    const concentrationCoO = []
    for (let i = 0; i < concentrations.length; i++) {
        concentrationCoO.push(parseFloat(concentrations[i][1]))
    }

    const concentrationZnO = []
    for (let i = 0; i < concentrations.length; i++) {
        concentrationZnO.push(parseFloat(concentrations[i][2]))
    }

    const concentrationPos = []
    for (let i = 0; i < concentrations.length; i++) {
        concentrationPos.push(parseFloat(Pos[i]))
    }

    const option = {
    grid: {
        left: '8%',
        right: '5%',
        bottom: '12%',
        containLabel: true
    },
    title: {
        text: 'Position #',
        left: 'center',
        top: 0
    },
    tooltip: {
        formatter: function(params) {
        return (
            '% ZnO: ' +
            params.data[5] +
            '<br />% Cu2O: ' +
            params.data[6]
        );
        }
    },
    legend: {
        right: -10
    },
    xAxis: {
        name: 'x Position (mm)',
        nameLocation: 'center',
        nameGap: 25,
    },
    yAxis: {
        name: 'y Position (mm)',
        nameLocation: 'center',
        nameGap: 30,
    },
    series:{
        type: 'scatter',
        data: positionGraph,
        symbolSize: 25,
        label: {
            show: true,
            //position: 'center',
            formatter: function (value){
                return value.data[4];
            },
            color: "black",
            fontSize: 14,
        },   
    },
    brush: {
        type: 'rect'
    }
    };

  return <ReactEcharts 
            option={option}
            style={{ height: '400px', width: '600px' }}
         />

} 

export default App;