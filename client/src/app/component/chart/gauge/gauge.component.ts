import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { SettingService } from 'src/app/_services/setting.service';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss'],
})
export class GaugeComponent implements OnInit {
  theme = this.settingService.settingCache.isDarkMode ? 'dark' : 'inherit';
  chartBackgroundColor = this.theme === 'dark' ? '#333538' : '#F0E5DE';
  @Input() data!: any;
  @Input() color: string = '#FAC858';
  @Input() title = {
    text: '即將過期比率',
    subtext: '即將過期數量 / 總數量',
    left: 'center',
  };

  option: EChartsOption = {};

  constructor(private settingService: SettingService) {}

  ngOnInit(): void {
  }

  setChartOption() {
    this.option = {
      backgroundColor: this.chartBackgroundColor,
      color: this.color,
      title: this.title,
      series: [
        {
          type: 'gauge',
          center: ['50%', '52%'],
          anchor: {
            show: true,
            showAbove: true,
            size: 18,
            itemStyle: {
              color: '#D9D4CF',
            },
          },
          pointer: {
            icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
            width: 8,
            length: '70%',
            offsetCenter: [0, '8%'],
          },

          progress: {
            show: true,
            overlap: true,
            roundCap: true,
          },
          axisLine: {
            roundCap: true,
          },
          data: [
            {
              value: this.data.value,
              name: this.data.name,
              title: {
                offsetCenter: ['0%', '75%'],
              },
              detail: {
                offsetCenter: ['0%', '95%'],
              },
            },
          ],
          title: {
            fontSize: 14,
          },
          detail: {
            width: 40,
            height: 14,
            fontSize: 14,
            color: '#fff',
            backgroundColor: 'inherit',
            borderRadius: 3,
            formatter: '{value}%',
          },
        },
      ],
    };
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.setChartOption()
  }
}
