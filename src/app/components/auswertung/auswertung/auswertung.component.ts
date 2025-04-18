/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, OnInit } from '@angular/core';
import { MeisterschaftAuswertung, ParamData } from '@model/datatypes';
import { BackendService } from '@app/service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-auswertung',
  templateUrl: './auswertung.component.html',
  styleUrls: ['./auswertung.component.scss'],
  standalone: false,
})
export class AuswertungComponent implements OnInit {
  lstGraphData: MeisterschaftAuswertung[] = [];
  parameter: ParamData[] = [];
  selJahre = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
  ];
  selJahr = 2;
  jahr: number;
  data: any;
  options: any;

  constructor(
    private backendService: BackendService,
    private messageService: MessageService
  ) {
    const str = localStorage.getItem('parameter');
    this.parameter = str ? JSON.parse(str) : [];
    const paramJahr = this.parameter.find((param) => param.key === 'CLUBJAHR');
    this.jahr = Number(paramJahr?.value);
  }

  ngOnInit(): void {
    if (this.jahr) {
      this.selJahre[0] = { value: this.jahr - 2, label: String(this.jahr - 2) };
      this.selJahre[1] = { value: this.jahr - 1, label: String(this.jahr - 1) };
      this.selJahre[2] = { value: this.jahr, label: String(this.jahr) };
      this.selJahr = this.jahr;
    }

    this.updateGraph();
  }

  updateGraph() {
    this.backendService.getChartData(this.selJahr).subscribe({
      next: (list) => {
        this.lstGraphData = list.data as MeisterschaftAuswertung[];

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--p-text-color');
        const textColorSecondary =
          documentStyle.getPropertyValue('--p-text-color');
        const surfaceBorder = documentStyle.getPropertyValue('--p-gray-300');

        const labels: Array<string>[] = [];
        const dataset1: number[] = [];
        const dataset2: number[] = [];

        this.lstGraphData.forEach((rec) => {
          const datum = new Date(rec.datum!);
          labels.push([rec.name!, datum.toLocaleDateString()]);
          dataset1.push(
            rec._count!.meisterschaft ? rec._count!.meisterschaft : 0
          );
          dataset2.push(rec.gaeste ? rec.gaeste : 0);
        });

        this.data = {
          labels: labels,
          datasets: [
            {
              label: 'Teilnehmer',
              backgroundColor: documentStyle.getPropertyValue('--p-blue-500'),
              borderColor: documentStyle.getPropertyValue('--p-blue-500'),
              data: dataset1,
            },
            {
              label: 'Gäste',
              backgroundColor: documentStyle.getPropertyValue('--p-pink-500'),
              borderColor: documentStyle.getPropertyValue('--p-pink-500'),
              data: dataset2,
            },
          ],
        };

        this.options = {
          indexAxis: 'y',
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: textColor,
              },
            },
          },
          scales: {
            x: {
              stacked: true,
              position: 'bottom',
              ticks: {
                color: textColorSecondary,
                stepSize: 1,
                font: {
                  weight: 500,
                },
              },
              grid: {
                color: surfaceBorder,
                drawBorder: false,
              },
            },
            x2: {
              stacked: true,
              position: 'top',
              ticks: {
                color: textColorSecondary,
                stepSize: 1,
                font: {
                  weight: 500,
                },
              },
              grid: {
                color: surfaceBorder,
                drawBorder: false,
              },
              min: 0,
              max: this.data.datasets.reduce(
                (max, dataset) => Math.max(max, ...dataset.data),
                -Infinity
              ),
            },
            y: {
              stacked: true,
              ticks: {
                color: textColorSecondary,
                stepSize: 0,
                min: 0,
                autoSkip: false,
              },
              grid: {
                color: surfaceBorder,
                drawBorder: false,
              },
            },
          },
        };
      },
    });
  }
}
