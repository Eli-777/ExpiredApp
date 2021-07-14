import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { EChartsOption } from 'echarts';
import { SettingService } from 'src/app/_services/setting.service';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss'],
})
export class PieComponent implements OnInit, OnChanges {
  theme = this.settingService.settingCache.isDarkMode ? 'dark' : 'inherit';
  chartBackgroundColor = this.theme === 'dark' ? '#333538' : '#F0E5DE';
  chartOption: EChartsOption = {};
  @Input() seriesData: object[] = [];

  constructor(private settingService: SettingService) {}

  ngOnInit(): void {}

  setChartOption(seriesData: object[] = []) {
    this.chartOption = {
      backgroundColor: this.chartBackgroundColor,
      title: {
        text: '類別占比',
        subtext: '類別數量 / 總數量',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {d}%',
      },
      series: [
        {
          name: '類別',
          type: 'pie',
          radius: '50%',
          data: seriesData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setChartOption(this.seriesData);
  }

}
