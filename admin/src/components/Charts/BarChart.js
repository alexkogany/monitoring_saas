import React from "react";
import {
    chartTooltip, centerTextPlugin
  } from "Components/Charts";
import {Bar} from 'react-chartjs-2';


class BarChart extends React.Component {
    
    state = {
      options : {
        legend: {
          position: "bottom",
          labels: {
            padding: 30,
            usePointStyle: true,
            fontSize: 12
          }
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
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
            ],
            xAxes: [
              {
                gridLines: {
                  display: false
                }
              }
            ]
          },
          tooltips: chartTooltip
        }
      }
    }
    
    constructor(props){
      super(props);            
    }

    componentWillMount(){                     
    }

    componentDidMount(){      
    }

    render() {
      return (
        
        <Bar {...this.props} {...this.state} />
        
      );
    }

  }


  export default BarChart;