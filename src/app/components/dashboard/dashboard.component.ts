/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable prefer-spread */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, from, map, zip } from 'rxjs';
import { BackendService } from '@app/service';
import { Fiscalyear, OverviewData, ParamData } from 'src/app/models/datatypes';
import pkg from './../../../../package.json';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    standalone: false
})
export class DashboardComponent implements OnInit, OnDestroy {
  dashboarData : OverviewData[] = []
  parameter: ParamData[] = [];
  fiscalyear?: Fiscalyear;
  jahr = '';
  subs!: Subscription;
  loading = true;

  constructor(private backendService: BackendService) {}
  
  ngOnDestroy(): void {
    if (this.subs) 
      this.subs.unsubscribe();
  }
  
  ngOnInit() {
    
    this.subs = from(this.backendService.getParameterData())
    .subscribe(async list => {
      this.parameter = list.data as ParamData[];
      console.log(this.parameter);
      localStorage.setItem('parameter', JSON.stringify(this.parameter));
      const element = this.parameter.find(element => element.key === 'CLUBJAHR');
      if (element) {
        this.jahr = element.value;      
        const header = document.getElementById('header');
        header!.innerText = "Auto-Moto-Club Swissair - Clubjahr " + this.jahr
        this.subs.unsubscribe();
        this.subs = zip(
          this.backendService.getAbout(),
          this.backendService.getDashboardAdressData(),
          this.backendService.getDashboardAnlaesseData(),
          this.backendService.getDashboardClubmeisterData(),
          this.backendService.getDashboardKegelmeisterData(),
          this.backendService.getDashboarJournalData(this.jahr)
          )
        .pipe(map(([about, list1, list2, list3, list4, retdata]) => {
          localStorage.setItem('aboutBackend', JSON.stringify(about));
          localStorage.setItem('aboutFrontend', JSON.stringify(pkg));
          this.dashboarData.push.apply(this.dashboarData, list1.data);
          this.dashboarData.push.apply(this.dashboarData, list2.data);
          this.dashboarData.push.apply(this.dashboarData, list3.data);
          this.dashboarData.push.apply(this.dashboarData, list4.data);
          this.fiscalyear = retdata.data as Fiscalyear;
          if (this.fiscalyear) {
            let value = ''
            switch (this.fiscalyear.state) {
              case 1:
                value = this.fiscalyear.name + " - offen"
                break;
              case 2:
                value = this.fiscalyear.name + " - prov. abgeschlossen"
                break;
              default:
                value = this.fiscalyear.name + " - abgeschlossen"
                break;
            }
            this.dashboarData.push({label: 'Buchhaltung', value: value})
          }
          this.loading = false;
          console.log(this.dashboarData)
        }))
        .subscribe()
      }
  });
}

public getJahr() : string {
  if (!this.loading)
    return this.jahr
  return ''
}
  getAnzahlForKey(key: string): string {
    const element = this.dashboarData.find((rec) => rec.label === key)
    if (element)
      return element.value;

    return 'not found';
  }
}
