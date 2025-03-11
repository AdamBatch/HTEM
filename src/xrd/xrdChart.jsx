import { useState, useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import data from '../data/6651-spectra.json'

function xrdChart({positionsChosen}) {
    
    const xrd = data.xrd
    const energy = xrd[0].measurement;
    const angle = xrd[0].angle;
    const pos = xrd[0].position;

    const colorPallete = [];
    for (let i = 0; i <= 44; i++) {
        var red = 0;
        var green = 255 - 5 * i;
        var blue = 0 + 5 * i;

        colorPallete.push('rgb(' + red + ',' + green + ',' + blue + ')');
    }

    const xrdScatterData = [];
    for (let i = 0; i < energy.length; i++) {
        xrdScatterData.push([energy[i], pos[i]]);
    }

    const maxIntensityFinder = [];
    for (let i = 1; i <= 44; i++) {
        const xrdScatterDataPosition = xrdScatterData.filter(
            (col) => col[1] == i,
        );
        const val = xrdScatterDataPosition.map((element) => element[0]);
        const maxVal = Math.max(...val);
        maxIntensityFinder.push(maxVal);
    }

    var normalizedScatterData = [];

    const allScatterData = [];
    for (let i = 1; i <= 44; i++) {
        if (xrdScatterData.filter((col) => col[1] == i)) {
            var positionIData = xrdScatterData.filter((col) => col[1] == i);
            allScatterData.push(
                positionIData.map(function (n) {
                    return n[0] / maxIntensityFinder[i - 1];
                }),
            );
            normalizedScatterData = allScatterData.flat();
        }
    }

    const xrdPlot = [];
    for (let i = 0; i < angle.length; i++) {
        xrdPlot.push([angle[i], normalizedScatterData[i], pos[i]]);
    }

    const xrdSubset = xrdPlot.filter(function (value, index, Arr) {
        return index % 2 == 0;
    });

    const series = [];
    for (let k = 0; k < positionsChosen.length; k++) {
        series[k] = {
            name: 'Position ' + positionsChosen[k],
            type: 'line',
            showSymbol: false,
            data: xrdSubset.filter((row) => row[2] == positionsChosen[k]),
            lineStyle: { color: colorPallete[positionsChosen[k]] },
            itemStyle: { color: colorPallete[positionsChosen[k]] },
        };
    }

    // Draw the chart
    // chartInstance.current.setOption({
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
            text: 'XRD Spectra',
            left: 'center',
            top: 10
        },
        xAxis: {
            type: 'value',
            name: '2θ (deg)',
            min: 15,
            max: 55,
            interval: 10,
            nameLocation: 'middle',
            nameTextStyle: {
                padding: [20, 0, 0, 0],
                fontWeight: 'bold',
                fontSize: 18,
            },
        },
        yAxis: {
            type: 'value',
            name: 'Intensity (A.U.)',
            nameLocation: 'middle',
            nameTextStyle: {
                padding: [50, 0, 20, 0], // [top, top, right, ?]
                fontWeight: 'bold',
                fontSize: 18,
                fontColor: 'black'
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
            trigger: 'axis',
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
            text: 'XRD Spectra',
            left: 'center',
            top: 10
        },
        xAxis: {
            type: 'value',
            name: '2θ (deg)',
            min: 15,
            max: 55,
            interval: 10,
            nameLocation: 'middle',
            nameTextStyle: {
                padding: [20, 0, 0, 0],
                fontWeight: 'bold',
                fontSize: 18,
            },
        },
        yAxis: {
            type: 'value',
            name: 'Intensity (A.U.)',
            nameLocation: 'middle',
            nameTextStyle: {
                padding: [50, 0, 20, 0], // [top, top, right, ?]
                fontWeight: 'bold',
                fontSize: 18,
                fontColor: 'black'
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
        );
    }
    else {
        return (
            <ReactECharts
                option={option2}
                notMerge={'true'}
                replaceMerge={'series'}
            />
        );
    }
    
}

export default xrdChart;
