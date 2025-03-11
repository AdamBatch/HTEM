import { useState, useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import data from '../data/6651-spectra.json'

function opticalChart({positionsChosen}) {
    
    const optical = data.optical
    const energy = optical[0].energy;
    const wavelength = energy.map((x) => Math.round(1240 / x));
    const abs = optical[0].absorption_coefficient;
    const absScaled = abs.map((x) => x / 100000);
    const pos2 = optical[0].position;
    console.log(positionsChosen)

    const spectraPlot = [];
    for (let i = 0; i < wavelength.length; i++) {
        spectraPlot.push([wavelength[i], absScaled[i], pos2[i]]);
    }

    const subSet = spectraPlot.filter(function (value, index, Arr) {
        return index % 2 == 0;
    });

    const colorPallete = [];
    for (let i = 0; i <= 44; i++) {
        var red = 0;
        var green = 255 - 5 * i;
        var blue = 0 + 5 * i;

        colorPallete.push('rgb(' + red + ',' + green + ',' + blue + ')');
    }

    const series = [];
    for (let k = 0; k <= positionsChosen.length; k++) {
        series[k] = {
            name: 'Position ' + positionsChosen[k],
            type: 'line',
            showSymbol: false,
            data: subSet.filter((row) => row[2] == positionsChosen[k]),
            lineStyle: { color: colorPallete[positionsChosen[k]] },
            itemStyle: { color: colorPallete[positionsChosen[k]] },
        };
    }

    // Draw the chart
    const option1 = {
        grid: {
            left: '8%',
            right: '5%',
            bottom: '12%',
            containLabel: true,
        },
        toolbox: {
            show: true,
            feature: {
                saveAsImage: {
                    show: true,
                },
            },
        },
        title: {
            text: 'Optical Spectra',
            left: 'center',
            top: 10
        },
        xAxis: {
            type: 'value',
            name: 'Wavelength (nm)',
            min: 200,
            max: 1700,
            interval:300,
            nameLocation: 'middle',
            nameGap: 30,
            nameTextStyle: {
                // padding: [10, 0, 0, 0],
                fontWeight: 'bold',
                fontSize: 18,
            },
        },
        yAxis: {
            type: 'value',
            name: 'Absorbitivity (inv cm M)',
            nameLocation: 'middle',
            nameGap: 50,
            axisLabel: {
                formatter: '{value} E5',
                // align: 'center'
              },
            nameTextStyle: {
                // padding: [0, 0, 10, 0], // [top, top, right, ?]
                fontWeight: 'bold',
                fontSize: 18,
            },
        },
        series: series,
    };

    const option2 = {
        grid: {
            left: '8%',
            right: '5%',
            bottom: '12%',
            containLabel: true,
        },
        tooltip: {
            trigger:'axis',
            textStyle: {
                width: 800, // Max width of the tooltip
                overflow: 'break',
                height: 400, // Handle text overflow
            },
            maxTooltipItems: 10,
        }, 
        toolbox: {
            show: true,
            feature: {
                saveAsImage: {
                    show: true,
                },
            },
        },
        title: {
            text: 'Optical Spectra',
            left: 'center',
            top: 10
        },
        xAxis: {
            type: 'value',
            name: 'Wavelength (nm)',
            min: 200,
            max: 1700,
            interval: 300,
            nameLocation: 'middle',
            nameGap: 30,
            nameTextStyle: {
                // padding: [10, 0, 0, 0],
                fontWeight: 'bold',
                fontSize: 18,
            },
        },
        yAxis: {
            type: 'value',
            name: 'Absorbitivity (inv cm M)',
            nameLocation: 'middle',
            nameGap: 50,
            axisLabel: {
                formatter: '{value} E5',
                // align: 'center'
              },
            nameTextStyle: {
                // padding: [0, 0, 10, 0], // [top, top, right, ?]
                fontWeight: 'bold',
                fontSize: 18,
            },
        },
        series: series,
    };

    if (positionsChosen.length > 10){
        return (
        <ReactECharts
            option={option1}
            notMerge={'true'}
            replaceMerge={'series'}
        />
        )
    }
    else {
        return(
        <ReactECharts
            option={option2}
            notMerge={'true'}
            replaceMerge={'series'}
        />
        )
    }
}

export default opticalChart;
