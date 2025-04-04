import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

import { Alert, AlertType } from '@app/models';
import { AlertService } from '@app/service';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    standalone: false
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() id = 'default-alert';
  @Input() fade = true;

  alerts: Alert[] = [];
  alertSubscription!: Subscription;
  routeSubscription!: Subscription;

  constructor(private router: Router, private alertService: AlertService) { }

  ngOnInit() {
      // subscribe to new alert notifications
      this.alertSubscription = this.alertService.onAlert(this.id)
          .subscribe(alert => {
              // clear alerts when an empty alert is received
              if (!alert.message) {
                  // filter out alerts without 'keepAfterRouteChange' flag
                  this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);

                  // remove 'keepAfterRouteChange' flag on the rest
                  let i;
                  for (i = this.alerts.length - 1; i >= 0; i -= 1) {
                      if (this.alerts[i].keepAfterRouteChange) {
                        this.alerts.splice(i, 1);
                      }
                  }
                  return;
              }

              // add alert to array
              this.alerts.push(alert);

              // auto close alert if required
              if (alert.autoClose) {
                  setTimeout(() => this.removeAlert(alert), 3000);
              }
         });

      // clear alerts on location change
      this.routeSubscription = this.router.events.subscribe(event => {
          if (event instanceof NavigationStart) {
              this.alertService.clear(this.id);
          }
      });
  }

  ngOnDestroy() {
      // unsubscribe to avoid memory leaks
      this.alertSubscription.unsubscribe();
      this.routeSubscription.unsubscribe();
  }

  removeAlert(alert: Alert) {
      // check if already removed to prevent error on auto close
      if (!this.alerts.includes(alert)) return;

      if (this.fade) {
          // fade out alert
          alert.fade = true;

          // remove alert after faded out
          setTimeout(() => {
              this.alerts = this.alerts.filter(x => x !== alert);
          }, 250);
      } else {
          // remove alert
          this.alerts = this.alerts.filter(x => x !== alert);
      }
  }

  cssButtonClass(alert: Alert) {
    if (!alert) return '';

    const classes = ['p-button-rounded', 'p-button-text'];
            
    const alertTypeClass = {
        [AlertType.Success]: 'p-button--success',
        [AlertType.Error]: 'p-button-danger',
        [AlertType.Info]: 'p-button-info',
        [AlertType.Warning]: 'p-button-warning'
    }

    classes.push(alertTypeClass[alert.type]);

    if (alert.fade) {
        classes.push('fade');
    }

    return classes.join(' ');
  }

  cssClass(alert: Alert) {
      if (!alert) return '';

      const classes = ['alert', 'alert-dismissable', 'mt-6', 'container'];
              
      const alertTypeClass = {
          [AlertType.Success]: 'alert alert-success',
          [AlertType.Error]: 'alert alert-danger',
          [AlertType.Info]: 'alert alert-info',
          [AlertType.Warning]: 'alert alert-warning'
      }

      classes.push(alertTypeClass[alert.type]);

      if (alert.fade) {
          classes.push('fade');
      }

      return classes.join(' ');
  }
}
