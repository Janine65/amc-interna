import { Component } from '@angular/core';
import { BackendService } from '@app/service';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-attachment-add',
    templateUrl: './attachment-add.component.html',
    styleUrls: ['./attachment-add.component.scss'],
    standalone: false
})
export class AttachmentAddComponent {
  journalid = 0;
  jahr: string = '';
  uploadFiles: File[] = [];
  uploadProgress: number | null = null;
  uploadSub?: Subscription;

  constructor(
    private backendService: BackendService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private messageService: MessageService
  ) {
    this.journalid = config.data.journalid;
    this.jahr = config.data.jahr;
  }

  prepareFiles(files: File[]) {
    this.uploadProgress = 0;
    for (const f of files) {
      this.backendService.uploadFiles(f).subscribe({
        next: (response) => {
          if (response.type == 'info') {
            this.uploadFiles.push(f);
          }
        },
        complete: () => {
          this.uploadProgress = 100;
        },
      });
    }
  }

  cancelUpload() {
    if (this.uploadSub) this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = undefined;
  }

  back() {
    this.ref.close();
  }

  save() {
    const files = this.uploadFiles.map((value: File) => value.name).join(',');
    console.log(files);
    if (files.length > 0)
      this.backendService
        .bulkAddReceipt(this.jahr, this.journalid, files)
        .subscribe({
          next: (resp) => {
            console.log(resp);
            this.messageService.add({
              severity: 'success',
              summary: 'Erfolg',
              detail: resp.message,
            });
            this.ref.close();
          },
        });
    this.ref.close();
  }
}
