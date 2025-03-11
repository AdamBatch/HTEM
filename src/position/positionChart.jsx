import { useState, useEffect, useRef, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';


function positionChart({setPositionsChosen}) {
    const xValues = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 1,
        2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
    ];

    const yValues = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3,
        3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    ];

    const positionID = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
        39, 40, 41, 42, 43, 44,
    ];

    const positionGraph = [];
    for (let i = 0; i < xValues.length; i++) {
        positionGraph.push([xValues[i], yValues[i], positionID[i]]);
    }

    const colorPallete = [];
    for (let i = 0; i <= 44; i++) {
        var red = 0;
        var green = 255 - 5 * i;
        var blue = 0 + 5 * i;

        colorPallete.push('rgb(' + red + ',' + green + ',' + blue + ')');
    }

    const [option, setOption] = useState({
        // grid: {
        //     left: '8%',
        //     right: '5%',
        //     bottom: '12%',
        //     containLabel: true,
        // },
        title: {
            text: 'Sample Position #',
            top: 10,
            left: 'center'
        },
        visualMap: [
            {
                type: 'continuous',
                dimension: 2,
                min: 0,
                max: 45,
                show: false,
                inRange: {
                    color: colorPallete,
                },
            },
        ],
        legend: {
            right: -10,
        },
        xAxis: {
            axisTick: { show: false },
            axisLabel: { show: false }
        },
        yAxis: {
            axisTick: { show: false },
            axisLabel: { show: false },
            min: 1
        },
        series: {
            type: 'scatter',
            data: positionGraph,
            symbolSize: 25,
            label: {
                show: true,
                //position: 'center',
                formatter: function (value) {
                    return value.data[2];
                },
                color: 'black',
                fontSize: 14,
            },
        },
        brush: {
            type: 'rect',
        },
    });

    const onBrushSelected = (params) => {
        var selected = params.batch[0].selected[0].dataIndex;
        const resetIndex = selected.map((x) => x + 1);
        if (selected.length === 0) {
            setPositionsChosen(positionID);
        } else {
            setPositionsChosen(resetIndex);
        }
    };

    const Chart = useMemo(() => {
        if (!option) {
            return;
        }

        return (
            <>
            <ReactECharts
                option={option}
                onEvents={{
                    brushSelected: onBrushSelected,
                }}
            />
            </>
        );
    }, [option]);

    return (
        <>{Chart}</>
    );
}

export default positionChart;
