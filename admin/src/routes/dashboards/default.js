import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Progress,
  CardSubtitle,
  CardHeader
} from "reactstrap";
import {
  PolarShadow,
  LineShadow,
  SmallLineChart,
  RadarShadow,
  DoughnutShadow
} from "Components/Charts";
import { Colxx, Separator } from "Components/CustomBootstrap";
import BreadcrumbContainer from "Components/BreadcrumbContainer";
import Sortable from "react-sortablejs";
import CircularProgressbar from "react-circular-progressbar";
import "chartjs-plugin-datalabels";
import "react-circular-progressbar/dist/styles.css";

import {
  visitChartConfig,
  conversionChartConfig,
  lineChartConfig,
  polarChartConfig,
 
  barChartConfigData,
  smallChartData1,
  smallChartData2,
  smallChartData3,
  smallChartData4,
  doughnutChartConfig,
  radarChartConfig
} from "Constants/chartConfig";

import profileStatusData from "Data/dashboard.profile.status.json";
import { receiveData_last7days } from "../../redux/charts/actions"
import { connect } from "react-redux";

import ChartComponent, { HorizontalBar } from "react-chartjs-2";




import BarChart from "../../components/Charts/BarChart";

import { ThemeColors } from "Util/ThemeColors";
const colors = ThemeColors();



const profileStatuses = profileStatusData.data;

class AnalyticsDashboard extends Component {
  constructor(props) {
    super(props);
    //console.log(action111111);
    //alert(addTodo('ssss'));
    this.props.receiveData_last7days();

  }

    render() {
      return (
        <Fragment>
          {/*<Row>
            <input type="textbox" value={
              this.props.last7days!==undefined?
              this.props.last7days.ret_val.length:
              0
            } defaultValue=""></input>
          </Row>*/}
          <Row>
            <Colxx xxs="12">
              <BreadcrumbContainer
                heading={<IntlMessages id="menu.analytics" />}
                match={this.props.match}
              />
              <Separator className="mb-5" />
            </Colxx>
          </Row>
          <Row>
            <Colxx sm="12" md="6" className="mb-4">
              <Card className="dashboard-filled-line-chart">
                <CardBody>
                  <div className="float-left float-none-xs">
                    <div className="d-inline-block">
                      <h5 className="d-inline">
                        <IntlMessages id="dashboards.website-visits" />
                      </h5>
                      <span className="text-muted text-small d-block">
                        <IntlMessages id="dashboards.unique-visitors" />
                      </span>
                    </div>
                  </div>
  
                  <div className="btn-group float-right float-none-xs mt-2">
                    <UncontrolledDropdown>
                      <DropdownToggle
                        caret
                        color="primary"
                        className="btn-xs"
                        outline
                      >
                        <IntlMessages id="dashboards.this-week" />
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem>
                          <IntlMessages id="dashboards.last-week" />
                        </DropdownItem>
                        <DropdownItem>
                          <IntlMessages id="dashboards.this-month" />
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                </CardBody>
  
                <div className="chart card-body pt-0">
                  <LineShadow {...visitChartConfig} />
                </div>
              </Card>
            </Colxx>
            <Colxx sm="12" md="6" className="mb-4">
              <Card className="dashboard-filled-line-chart">
                <CardBody>
                  <div className="float-left float-none-xs">
                    <div className="d-inline-block">
                      <h5 className="d-inline">
                        <IntlMessages id="dashboards.conversion-rates" />
                      </h5>
                      <span className="text-muted text-small d-block">
                        <IntlMessages id="dashboards.per-session" />
                      </span>
                    </div>
                  </div>
  
                  <div className="btn-group float-right float-none-xs mt-2">
                    <UncontrolledDropdown>
                      <DropdownToggle
                        caret
                        color="secondary"
                        className="btn-xs"
                        outline
                      >
                        <IntlMessages id="dashboards.this-week" />
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem>
                          <IntlMessages id="dashboards.last-week" />
                        </DropdownItem>
                        <DropdownItem>
                          <IntlMessages id="dashboards.this-month" />
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                </CardBody>
  
                <div className="chart card-body pt-0">
                  <LineShadow {...conversionChartConfig} />
                </div>
              </Card>
            </Colxx>
          </Row>
  
          <Row>
            <Colxx xl="4" lg="6" md="12" className="mb-4">
              <Card className="h-100">
                <CardBody>
                  <CardTitle>
                    <IntlMessages id="dashboards.product-categories" />
                  </CardTitle>
                  <div className="dashboard-donut-chart">
                    <DoughnutShadow {...doughnutChartConfig} />
                  </div>
                </CardBody>
              </Card>
            </Colxx>
            <Colxx xl="4" lg="6" md="12" className="mb-4">
              <Card className="dashboard-progress">
                <CardBody>
                  <CardTitle>
                    <IntlMessages id="dashboards.profile-status" />
                  </CardTitle>
                  {profileStatuses.map((s, index) => {
                    return (
                      <div key={index} className="mb-4">
                        <p className="mb-2">
                          {s.title}
                          <span className="float-right text-muted">
                            {s.status}/{s.total}
                          </span>
                        </p>
                        <Progress value={(s.status / s.total) * 100} />
                      </div>
                    );
                  })}
                </CardBody>
              </Card>
            </Colxx>
            <Colxx xl="4" lg="12" md="12">
              <Row>
                <Colxx xxs="6" className="mb-4">
                  <Card className="dashboard-small-chart-analytics">
                    <CardBody>
                      <SmallLineChart {...smallChartData1} />
                    </CardBody>
                  </Card>
                </Colxx>
                <Colxx xxs="6" className="mb-4">
                  <Card className="dashboard-small-chart-analytics">
                    <CardBody>
                      <SmallLineChart {...smallChartData2} />
                    </CardBody>
                  </Card>
                </Colxx>
                <Colxx xxs="6" className="mb-4">
                  <Card className="dashboard-small-chart-analytics">
                    <CardBody>
                      <SmallLineChart {...smallChartData3} />
                    </CardBody>
                  </Card>
                </Colxx>
                <Colxx xxs="6" className="mb-4">
                  <Card className="dashboard-small-chart-analytics">
                    <CardBody>
                      <SmallLineChart {...smallChartData4} />
                    </CardBody>
                  </Card>
                </Colxx>
              </Row>
            </Colxx>
          </Row>    

          <Row className="mb-4">
              <Colxx xxs="12">
                <Card>
                  <CardBody>
                    <CardTitle>
                    <IntlMessages id="charts.bar" />
                    </CardTitle>
                    <Row>
                      <Colxx xxs="18" lg="8" className="mb-5">
                        <CardSubtitle>
                          <IntlMessages id="charts.shadow" />
                        </CardSubtitle>
                        <div className="chart-container">
                          <BarChart {...barChartConfigData2}/>
                          {/*<TestChart {...barChartConfigData}/>*/}
                          {/*<BarShadow {...barChartConfig} />*/}
                          {/*<ChartComponent type="bar" {...barChartConfig} />*/}
                        </div>
                      </Colxx>                      
                    </Row>
                  </CardBody>
                </Card>
              </Colxx>
          </Row>   
        </Fragment>
      );
    }
  }
//labels: ["Papa", "February", "March", "April", "May", "June" ,"Xer"],
  export const barChartConfigData2 = {
    data: {
      labels: [],
      datasets: [
        {
          borderColor: colors.themeColor1,
          backgroundColor: colors.themeColor1_10,
          data: [],
          borderWidth: 2
        }
      ]
    }
  };


   {/* export const barChartConfigoptions2 = {
    options : {
      scales: {
          xAxes: [{
              barPercentage: 0.5,
              barThickness: 6,
              maxBarThickness: 8,
              minBarLength: 2,
              gridLines: {
                  offsetGridLines: false
              }
          }]
        }
    }
  };

export class TestChart extends React.Component {
    
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

  export class BarShadow extends React.Component {
    componentWillMount() {
      Chart.defaults.barWithShadow = Chart.defaults.bar;
      Chart.controllers.barWithShadow = Chart.controllers.bar.extend({
        draw: function(ease) {
          Chart.controllers.bar.prototype.draw.call(this, ease);
          var ctx = this.chart.ctx;
          ctx.save();
          ctx.shadowColor = "rgba(0,0,0,0.2)";
          ctx.shadowBlur = 7;
          ctx.shadowOffsetX = 5;
          ctx.shadowOffsetY = 7;
          ctx.responsive = true;
          Chart.controllers.bar.prototype.draw.apply(this, arguments);
          ctx.restore();
        }
      });
    }
  
    render() {
      return (
        <ChartComponent
          ref={ref => (this.chart_instance = ref && ref.chart_instance)}
          type="barWithShadow"
          {...this.props}
        />
      );
    }
  }*/}

  const mapStateToProps = ({ authUser,chart }) => {
    const { user, loading } = authUser;
    const { last7days, testvalue } = chart;
    

    if(last7days!==undefined){
      last7days.ret_val.forEach(function(item) {
        barChartConfigData2.data.labels.push(item.domain_name);
        barChartConfigData2.data.datasets[0].data.push(item.activity_sum);
      });
      
    }

    return { user, loading , testvalue , last7days};
  };
  
  export default connect(mapStateToProps,{receiveData_last7days})
                 (AnalyticsDashboard);