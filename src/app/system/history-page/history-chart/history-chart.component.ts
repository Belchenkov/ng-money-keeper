import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.scss']
})
export class HistoryChartComponent {
  @Input() data: any[];

  // options
  view: any[] = [545, 355];
  showLabels = true;
  isDoughnut = true;
  colorScheme = {
    domain: ['#5AA454', '#C7B42C', '#A10A28', '#3d38a0']
  };

  constructor() {
  }
}
