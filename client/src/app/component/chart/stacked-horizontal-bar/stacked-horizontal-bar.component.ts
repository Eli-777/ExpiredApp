import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { EChartsOption } from 'echarts';
import { SettingService } from 'src/app/_services/setting.service';

@Component({
  selector: 'app-stacked-horizontal-bar',
  templateUrl: './stacked-horizontal-bar.component.html',
  styleUrls: ['./stacked-horizontal-bar.component.scss'],
})
export class StackedHorizontalBarComponent implements OnInit {
  theme = this.settingService.settingCache.isDarkMode ? 'dark' : 'inherit';
  chartBackgroundColor = this.theme === 'dark' ? '#333538' : '#F0E5DE';
  option: EChartsOption = {};
  @Input() yAxis: string[] = []
  @Input() seriesNotExpiredData: number[] = []
  @Input() seriesExpiringData: number[] = []
  @Input() seriesExpiredData: number[] = []

  constructor(private settingService: SettingService) {}

  ngOnInit(): void {
  }


  setChartOption() {
    this.option = {
      backgroundColor: this.chartBackgroundColor,
      color: ['#ABD0CE', '#FAC858', '#f3786a'],
      title: {
        text: '各類別組成分析',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
        },
      },
      legend: {
        data: [
          '未到期',
          '即將到期',
          '已過期',
        ],
        top: '10%',
      },
      grid: {
        left: '3%',
        right: '6%',
        bottom: '3%',
        top: '20%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
      },
      yAxis: {
        type: 'category',
        data: this.yAxis,
      },
      series: [
        {
          name: '未到期',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
          },
          emphasis: {
            focus: 'series',
          },
          data: this.seriesNotExpiredData,
        },
        {
          name: '即將到期',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
          },
          emphasis: {
            focus: 'series',
          },
          data: this.seriesExpiringData,
        },
        {
          name: '已過期',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
          },
          emphasis: {
            focus: 'series',
          },
          data: this.seriesExpiredData,
        },
      ],
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setChartOption()
  }
}
