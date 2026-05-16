import { Injectable, NgZone, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private messageService = inject(MessageService);
  private zone = inject(NgZone);
  private alertService = inject(AlertService);

  showSuccess(message: string): void {
    // Had an issue with the snackbar being ran outside of angular's zone.
    this.zone.run(() => {
      this.alertService.info(message, { autoClose: true });
      //      this.messageService.add({detail: message, severity: 'info'});
    });
  }

  showError(message: string): void {
    this.zone.run(() => {
      // The second parameter is the text in the button.
      // In the third, we send in the css class for the snack bar.
      this.alertService.error(message);
      //this.messageService.add({detail: message, severity: 'error'});
    });
  }
}
