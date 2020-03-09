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
  
  distanceAverageData: any;
  cumulativedistanceAverageData: any;
  calendarData: any;
  distanceChartData: any;
  baseChartOptions: any;
  
  regionSpendingData: any;
  regionSpendingChartConfig: any;

  regionDaysData: any;
  regionDaysChartConfig: any;

  constructor() {
    this.baseChartOptions = {
      width: 500,
    }

    this.distanceAverageData = this.getDistanceAverageChartConfig();
    this.cumulativedistanceAverageData = this.getCumulativeDistanceChartConfig();
    this.distanceChartData = this.getDistanceChartDataConfig();

    this.regionSpendingData = this.getData('regionSpending');
    this.regionSpendingChartConfig = this.getRegionSpendingChartConfig();

    this.regionDaysData = this.getData('regionDays');
    this.regionDaysChartConfig = this.getRegionDaysDataConfig();
    
    
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
    } else if (key === 'distance') {
      return COUNTRIES.map(country => {
        return [country.name, country.distanceCycled]
      });
    } else if (key === 'distanceAverage') {
      return COUNTRIES.map(country => {
        return [
          country.name,
          country.distanceCycled / (country.daysCycled * 5 / 7),
          country.color,
          country.name
        ]});
    } else if (key === 'regionSpending') { 
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
    } else if (key === 'regionDays') { 
      let data = [
        ['China to Portugal',null,0,0],
        ['East Asia','China to Portugal',0,0],
        ['Central Asia','China to Portugal',0,0],
        ['Middle East','China to Portugal',0,0],
        ['Europe','China to Portugal',0,0],
      ];
      COUNTRIES.forEach(c => {
        data.push([c.name, c.region, c.daysCycled, c.daysCycled]);
      });
      return data;
    }
  }
  // *** Charts configurations ******************************
  getDistanceChartDataConfig(): any {
    return {
      title: 'Distance Cycled per Country',
      type: 'Histogram',
      data: this.getData('distance'),
      
      options: {
        ...this.baseChartOptions,
        ...{
          legend: { position: 'none' },
          histogram: { bucketSize: 200 },
          colors: ['#3cc37d'],
          height: 300,
          vAxis: { textPosition: 'none' },
          chartArea: { width:400, height: 200 }
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
  getDistanceAverageChartConfig() {
    return {
      title: 'Average Daily Distance (km)',
      type: 'BarChart',
      data: this.getData('distanceAverage'),
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

  getRegionSpendingChartConfig() {
    return {
      title: 'Money Spent by Country and Region ($NZD)',
      type: 'TreeMap',
      data: this.regionSpendingData,
      options: {
        ...this.baseChartOptions,
        ...{
          minColor: '#d8f3e5',
          midColor: '#8adbb1',
          maxColor: '#3cc37d',
          highlightOnMouseOver: true,
          minHighlightColor: '#f8eaa0',
          midHighlightColor: '#f4df71',
          maxHighlightColor: '#f2d43d',
          headerHeight: 15,
          fontColor: 'black',
          showScale: true,
          maxDepth: 2,
          maxPostDepth: 3,
          useWeightedAverageForAggregation: true,
          showTooltips: true,
          generateTooltip: this.showSpendingTooltip.bind(this),
          fontFamily: 'sans-serif',
          height: 300,
        }
      },
    };
  }
  getRegionDaysDataConfig() {
    return {
      title: 'Days Stayed in each Country and Region',
      type: 'TreeMap',
      data: this.regionDaysData,
      options: {
        ...this.baseChartOptions,
        ...{
          minColor: '#d8f3e5',
          midColor: '#8adbb1',
          maxColor: '#3cc37d',
          highlightOnMouseOver: true,
          minHighlightColor: '#f8eaa0',
          midHighlightColor: '#f4df71',
          maxHighlightColor: '#f2d43d',
          headerHeight: 15,
          fontColor: 'black',
          showScale: true,
          maxDepth: 2,
          maxPostDepth: 3,
          useWeightedAverageForAggregation: true,
          showTooltips: true,
          generateTooltip: this.showDaysTooltip.bind(this),
          fontFamily: 'sans-serif',
          height: 300,
        }
      },
    };
  }
  showSpendingTooltip(row, size, value) {
    return `<div style="background: white;
    padding: 5px;
    color: #f9f9cd;
    font-family: sans-serif;
    font-size: xx-small;
    margin-left: 5px;
    margin-top: 5px;
    background-color: #aa8c03;
    border-left: #574301 solid 0.5em;">` +
    `<strong style="display:block;">${this.regionSpendingData[row][0]}</strong> $${Math.round(size)}</div>`;
  }
  showDaysTooltip(row, size, value) {
    return `<div style="background: white;
    color: #f9f9cd;
    font-family: sans-serif;
    font-size: xx-small;
    margin-left: 5px;
    margin-top: 5px;
    background-color: #333;
    padding: 2px 10px 5px;
    border-top: 5px solid red;
    margin-right: 5px;
    text-align: center;">` +
    `<strong style="display:block;">${this.regionSpendingData[row][0]}</strong>${Math.round(size)} Days</div>`;
  }
}
