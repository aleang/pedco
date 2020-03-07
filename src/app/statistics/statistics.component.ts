import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { GoogleChartComponent } from 'angular-google-charts';
import { COUNTRIES } from "../../assets/trip-data";
import { CurrencyPipe } from '@angular/common';
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['../app.component.less', './statistics.component.less']
})
export class StatisticsComponent implements OnInit {
  
  distanceData: any;
  cumulativeDistanceData: any;
  regionSpendingData: any;
  regionData: any;
  calendarData: any;
  daysChartData: any;
  baseChartOptions: any;

  constructor() {
    this.baseChartOptions = {
      width: 500,
    }

    this.distanceData = this.getDistanceChartConfig();
    this.cumulativeDistanceData = this.getCumulativeDistanceChartConfig();
    this.regionData = this.getData('region');
    this.regionSpendingData = this.getRegionSpendingDataConfig();
    this.daysChartData = this.getDaysChartDataConfig();
    //this.calendarData = this.get

    
  }

  ngOnInit() { }

  // *********************************
  
  getData(key: string) {
    if (key === 'cumulativeDistance') {
      let cumulativeTotal = 0;
      let data = [[new Date(2018, 2, 17), 0]];
      COUNTRIES.forEach(country => {
        cumulativeTotal += country.distanceCycled;
        data.push([country.dateLeft, cumulativeTotal]);
      });
      return data;
      // return [
        
      //   [COUNTRIES[0].dateLeft, COUNTRIES[0].distanceCycled, COUNTRIES[0].distanceCycled],
      //   [new Date(2019, 3, 1),  660,       1120],
      //   [new Date(2019, 11, 11),  1030,      540]
      // ];
    } else if (key === 'days') {
      return COUNTRIES.map(country => {
        return [country.name, country.daysCycled]
      });
    } else if (key === 'distance') {
      return COUNTRIES.map(country => {
        return [
          country.name,
          country.distanceCycled / (country.daysCycled * 5 / 7),
          country.color,
          country.name
        ]});
    } else if (key === 'region') { 
      let data = [
        ['China to Portugal',null,0,0],
        ['East Asia','China to Portugal',0,0],
        ['Central Asia','China to Portugal',0,0],
        ['Middle East','China to Portugal',0,0],
        ['Europe','China to Portugal',0,0],
      ];
      COUNTRIES.forEach(c => {
        data.push([c.name, c.region, c.daysCycled * c.averageDailySpend, c.averageDailySpend]);
      });
      return data;
    }
  }
  // *** Charts configurations ******************************
  getDaysChartDataConfig(): any {
    return {
      title: 'Days Spent in each Country',
      type: 'Histogram',
      data: this.getData('days'),
      
      options: {
        ...this.baseChartOptions,
        ...{
          legend: { position: 'none' },
          histogram: { bucketSize: 20 },
          colors: ['#3cc37d'],
          height: 300,
          vAxis: { textPosition: 'none' }
        }
      }
    };
  }
  
  getCumulativeDistanceChartConfig() {
    return {
      type: 'AreaChart',
      data: this.getData('cumulativeDistance'),
      columnNames: ['Date', 'Cumulative Distance Cycled'],
      options: {
        ...this.baseChartOptions, 
        ...{
          title: 'Total Distance Cycled (approx. 22,000 km)',
          hAxis: {format:'MM/yyyy'},
          vAxis: {minValue: 0},
          legend: {position: 'bottom'},
          selectionMode: 'multiple',
          crosshair: { trigger: 'both' },
          explorer: {},
          chartArea: {left:50,top:20,width:'80%',height:'75%'},
          height: 400
        }
      },
    };
  }
  getDistanceChartConfig() {
    return {
      title: 'Average Daily Distance (km)',
      type: 'BarChart',
      data: this.getData('distance'),
      columnNames: ['Country', 'Distance'],
      options: {
        ...this.baseChartOptions, 
        ...{
          hAxis: {
            title: 'Average Daily Distance (kilometers)',
            minValue: 0
          },
          vAxis: {
            textPosition: 'none',
          },
          legend: { position: "none" },
          height: 300,
          chartArea: {
            width: '80%', height: '70%'
          },
        }
      },
      roles: [
        { role: 'style', type: 'string', index: 2 },
        { role: 'annotation', type: 'string', index: 3 }
      ],
    };
  }

  getRegionSpendingDataConfig() {
    return {
      title: 'Money Spent by Country and Region ($NZD)',
      type: 'TreeMap',
      data: this.regionData,
      options: {
        ...this.baseChartOptions,
        ...{
          minColor: '#d8f3e5',
          midColor: '#8adbb1',
          maxColor: '#3cc37d',
          highlightOnMouseOver: true,
          minHighlightColor: '#c9c9c9',
          midHighlightColor: '#bababa',
          maxHighlightColor: '#999999',
          headerHeight: 15,
          fontColor: 'black',
          showScale: true,
          maxDepth: 2,
          maxPostDepth: 3,
          useWeightedAverageForAggregation: true,
          showTooltips: true,
          generateTooltip: this.showStaticTooltip.bind(this),
          fontFamily: 'sans-serif',
          height: 300,
        }
      },
    };
  }

  showStaticTooltip(row, size, value) {
    return `<div style="background: white;
      border-radius: 5px;
      padding: 5px;
      border: 1px solid grey;
      color: black;
      font-family: sans-serif;
      font-size: xx-small;
      margin-left: 5px;
      margin-top: 5px;">` +
    `<strong>${this.regionData[row][0]}</strong> $${Math.round(size)}</div>`;
  }
}
