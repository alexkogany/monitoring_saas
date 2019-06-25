import React from 'react';
import {HorizontalBar} from 'react-chartjs-2';
import {
    chartTooltip, centerTextPlugin
  } from "Components/Charts";
import { ThemeColors } from "Util/ThemeColors";
const colors = ThemeColors();


const data = {
    labels: ['Risk Level','Second mimad'],
    datasets: [
         {
            label: 'Low',
            data: [67.8],
            borderColor: colors.themeColor1,
            //backgroundColor: colors.themeColor1_10,
            backgroundColor: '#D6E9C6' // green
          },
          {
            label: 'Moderate',
            data: [20.7,50.8],
            borderColor: colors.themeColor1,
            //backgroundColor: colors.themeColor1_10,
            backgroundColor: '#FAEBCC' // yellow
          },
          {
            label: 'High',
            data: [11.4,12.1],
            borderColor: colors.themeColor1,
            //backgroundColor: colors.themeColor1_10,
            backgroundColor: '#EBCCD1' // red
          }
    ]
};

const options =  {
    scales: {
      xAxes: [
                { 
                    stacked: true,
                    gridLines: {
                    display: false
                    } 
                }
            ],
      yAxes: [
                { 
                    stacked: true ,
                    gridLines: {
                        display: true,
                        lineWidth: 1,
                        color: "rgba(0,0,0,0.1)",
                        drawBorder: false
                    },
               
                    ticks: {
                        beginAtZero: true,
                        stepSize: 100,
                        min: 300,
                        max: 800,
                        padding: 20
                        }
                }
            ]
    },
    tooltips: chartTooltip,
    //responsive: true,
    //maintainAspectRatio: false,
  }

class HorizontalBar1 extends React.Component {
//const horizontalBar = React.createClass({
  //displayName: 'BarExample',

  render() {
    return (
      <div>
        <h2>Horizontal Bar Example</h2>
        <HorizontalBar data={data} options={options}/>
      </div>
    );
  }
};

export default HorizontalBar1;