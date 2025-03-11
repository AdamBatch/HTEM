import React from 'react'
import data from '../data/6651-property.json'
import ReactEcharts from 'echarts-for-react'


function concentrationChart({positionsChosen}){
    console.log(positionsChosen)
    const Pos = data[0].position;

    const concentrations = data[0].xrf_concentration;

    const colorPallete = [];
    for (let i = 0; i < 45; i++) {
        var red = 0;
        var green = 255 - 5 * i;
        var blue = 0 + 5 * i;

        colorPallete.push('rgb(' + red + ',' + green + ',' + blue + ')');
    }

    const colorsChosen = []
    for (let i = 0; i < positionsChosen.length; i++){
        colorsChosen.push(colorPallete[positionsChosen[i]])
    }
    console.log(colorsChosen)

    const concentrationNiO = []
    for (let i = 0; i < concentrations.length; i++) {
        concentrationNiO.push(parseFloat(concentrations[i][0]).toFixed(2))
    }

    const concentrationCoO = []
    for (let i = 0; i < concentrations.length; i++) {
        concentrationCoO.push(parseFloat(concentrations[i][1]).toFixed(2))
    }

    const concentrationZnO = []
    for (let i = 0; i < concentrations.length; i++) {
        concentrationZnO.push(parseFloat(concentrations[i][2]).toFixed(2))
    }

    const concentrationPos = []
    for (let i = 0; i < concentrations.length; i++) {
        concentrationPos.push(Pos[i])
    }

    const NiOChosen = []
    for (let i = 0; i < positionsChosen.length; i++) {
        NiOChosen.push(concentrationNiO[positionsChosen[i]-1])
    }
    const CoOChosen = []
    for (let i = 0; i < positionsChosen.length; i++) {
        CoOChosen.push(concentrationCoO[positionsChosen[i]-1])
    }

    const ZnOChosen = []
    for (let i = 0; i < positionsChosen.length; i++) {
        ZnOChosen.push(concentrationZnO[positionsChosen[i]-1])
    }

    const posChosen = []
    for (let i = 0; i < positionsChosen.length; i++) {
        posChosen.push(concentrationPos[positionsChosen[i]-1])
    }
    
    const option1 = {
        color: colorsChosen,
        grid: {
            left: '8%',
            right: '5%',
            bottom: '12%',
            containLabel: true
        },
        title: {
            text: 'Concentration',
            left: 'center',
            top: 10
        },
        tooltip: {
            trigger: "axis",
            formatter: function(params) {
                return (
                    '% CoO: ' + 
                    params[2].data +
                    '<br />% ZnO: ' +
                    params[1].data +
                    '<br />% NiO: ' +
                    params[0].data
                );
            }
        },
        xAxis: {
            name: 'Sample Position #',
            nameLocation: 'center',
            nameGap: 30,
            data: positionsChosen,
            type: 'category',
            nameTextStyle: {
                fontWeight: 'bold',
                fontSize: 18,
            },
            axisTick: {
                alignWithLabel:'true',
                interval: 0
            },
            axisLabel: {
                interval: 1
            },
            
        },
        yAxis: {
            name: 'Concentration (%)',
            nameLocation: 'center',
            nameGap: 30,
            type:'value',
            max: 100,
            nameTextStyle: {
                fontWeight: 'bold',
                fontSize: 18,
            },
            axisTick: {
                show:'true'
            }
        },
        series: [
            {
                type: 'bar',
                data: NiOChosen,
                stack: 'x',
                itemStyle: {
                    borderWidth: 1.5,
                    borderColor: "#000"
                },
            },
            {
                type: 'bar',
                data: ZnOChosen,
                stack: 'x',
                itemStyle: {
                    borderWidth: 1.5,
                    borderColor: "#000"
                },
            },
            {
                type: 'bar',
                data: CoOChosen,
                stack: 'x',
                itemStyle: {
                    borderWidth: 1.5,
                    borderColor: "#000"
                },
            },
        ],
        colorBy: 'data'
    }

    const option2 = {
        color: colorsChosen,
        grid: {
            left: '8%',
            right: '5%',
            bottom: '12%',
            containLabel: true
        },
        title: {
            text: 'Concentration',
            left: 'center',
            top: 10
        },
        tooltip: {
            trigger: "axis",
            formatter: function(params) {
                return (
                    '% CoO: ' + 
                    params[2].data +
                    '<br />% ZnO: ' +
                    params[1].data +
                    '<br />% NiO: ' +
                    params[0].data
                );
            }
        },
        xAxis: {
            name: 'Sample Position #',
            nameLocation: 'center',
            nameGap: 30,
            data: positionsChosen,
            type: 'category',
            nameTextStyle: {
                fontWeight: 'bold',
                fontSize: 18,
            },
            axisTick: {
                alignWithLabel:'true',
                interval: 0
            },
            axisLabel: {
                interval: 0
            },
            
        },
        yAxis: {
            name: 'Concentration (%)',
            nameLocation: 'center',
            nameGap: 30,
            type:'value',
            max: 100,
            nameTextStyle: {
                fontWeight: 'bold',
                fontSize: 18,
            },
            axisTick: {
                show:'true'
            }
        },
        series: [
            {
                type: 'bar',
                data: NiOChosen,
                stack: 'x',
                itemStyle: {
                    borderWidth: 1.5,
                    borderColor: "#000"
                  },
            },
            {
                type: 'bar',
                data: ZnOChosen,
                stack: 'x',
                itemStyle: {
                    borderWidth: 1.5,
                    borderColor: "#000"
                  },
            },
            {
                type: 'bar',
                data: CoOChosen,
                stack: 'x',
                itemStyle: {
                    borderWidth: 1.5,
                    borderColor: "#000"
                  },
            },
        ],
    }

    if (positionsChosen.length > 20){
        return (
            <ReactEcharts 
                option={option1}
            />
        )
    }
    else {
        return(
            <ReactEcharts 
                option={option2}
            />
        )
    }
    
} export default concentrationChart