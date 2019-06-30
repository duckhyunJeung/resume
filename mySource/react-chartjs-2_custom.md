# react chartjs2를 이용하여 도넛차트 만들기 + 중앙 text정렬 및 오른쪽에 text 간격조정.

차트가 내 마음대로 바꿀 수 는 있으나... api나 문서가 너무 적어서 며칠 고생했던 코드..

간격과 중앙배치등.. 할 수 있는 방법은 많았지만..

자료가 쉬이 없어 힘들게 구현했던 코드.

차트를 동그랗게 만들고 , 중앙 text 크기가 넘칠경우 두줄로 자르고, 오른쪽 label들의 간격을 조정할 수 있는 코드.


```
import './home.scss';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { sumBy } from 'lodash';
import ScrollAnimation from 'react-animate-on-scroll';

const columnGridAnimationName = 'fadeInDown';
const baasServiceItemDelay = 150;
export const valueAsPercentage = (value, total) => (`${value / total * 100}%`);

export interface IToLegend {
  legend: string | any;
}

export class DoughnutChart extends React.Component<any, IToLegend> {

  myRef: any;

  constructor(props: any) {
    super(props);
    this.state = {
      legend: <> test </>
    };
    this.createMarkup = this.createMarkup.bind(this);
  }

  componentDidMount() {
    const leg = this.generateLegend();
    this.setState({ legend: leg });
  }

  setTextInputRef(element) {
    this.myRef = element;
  }

  generateLegend() {
    if (!this.myRef) return null;
    return (this.myRef as any).chartInstance.generateLegend();
  }

  createMarkup() {
    return { __html: this.state.legend };
  }

  render() {
    const chartDB = this.props.chartData;
    const viewSize = this.props.viewSize;
    const layoutPadding = viewSize > 992 ? 200 : 0;
    const xSize = viewSize > 992 ? 100 : 0;
    return <>
        <Doughnut
          ref={ element => this.setTextInputRef(element)}
          data={{
            labels: chartDB.data.labels,
            datasets: chartDB.data.datasets
          }}
          options={{
            cutoutPercentage: 80,
            elements: {
              arc : { borderWidth: 0 }
            },
            layout: {
              padding: {
                left: 0,
                right: layoutPadding, 
                top: 0,
                bottom: 0
              }
            },
            legend: { display: false },
            legendCallback: chart => {
              const labelData = chart.data.labels;
              const dataset = chart.data.datasets[0];
              const total = sumBy(dataset.data, number => parseInt(number as any, 10));
              const dataBackground = dataset.backgroundColor;
              return dataset.data.map((value, index) => {
                const styleValue = { 'backgroundColor' : dataBackground[index].toString() };
                const outputValue = value;
                return `<li style="font-family:'ApexMk2-Regular'"> <p> <span class="colorspan" style=background-color:${dataBackground[index]}> </span> <span class="datafontsize">${labelData[index]}<br/><span class="percentage-padding"> ${outputValue} %</span></span> </p> </li>`;
              }).join(''); //chart label들 위치 및 간격조정으로 custom만듦.
            }
          }}
          plugins={[
            {
              beforeDraw: chart => {
                const width = chart.chart.width;
                const height = chart.chart.height;
                const ctx = chart.chart.ctx;
                ctx.restore();
                const fontSize = viewSize > 480 ? 14 : 10; // (height / 114).toFixed(2); //view 사이즈 크기에 따라 font 사이즈 변경
                ctx.font = fontSize + 'px ApexMk2-BoldExtended'; //폰트 변경
                ctx.textBaseline = 'middle'; //텍스트 라인 설정
                ctx.textAlign = 'center'; 
                ctx.fillStyle = '#FFFFFF';
                const text = chartDB.centerTitle; //중앙 배치정렬
                const textX = Math.round(width / 2);
                const textY = height / 2; 
                const textArr = text.split('/'); //중앙 텍스트 중간 자르기.
                ctx.fillText(textArr[0], textX - xSize, textY - fontSize / 2); // 도넛 중앙 text 크기 중앙으로 계산식
                ctx.fillText(textArr[1], textX - xSize, textY + fontSize / 2); // 도넛 중앙 text 크기 중앙으로 계산식
                ctx.save();
              }
            }
          ]}
        />
      <ScrollAnimation animateIn={columnGridAnimationName} delay={baasServiceItemDelay}>
        <div dangerouslySetInnerHTML={this.createMarkup()} id={'chartjs-legend'} style={ this.props.chartName === 'tokenSale' ? { 'marginRight': '5%' } : null }/>
      </ScrollAnimation>
      </>;
  }
}


```