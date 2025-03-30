import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { BackendService } from '@app/service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-attachement-show',
    templateUrl: './attachement-show.component.html',
    styleUrls: ['./attachement-show.component.scss'],
    standalone: false
})
export class AttachementShowComponent implements AfterViewInit, OnDestroy {
  receipt = '';
  year = '';
  pdfFile: SafeResourceUrl = '';
  documentBlobObjectUrl = '';

  constructor(
    private backendService: BackendService,
    public config: DynamicDialogConfig,
    private sanitizer: DomSanitizer
  ) {
    this.receipt = config.data.receipt;
    this.year = config.data.year;
  }

  ngOnDestroy(): void {
    URL.revokeObjectURL(this.documentBlobObjectUrl);
  }

  ngAfterViewInit(): void {
    this.backendService.uploadAtt(this.receipt, this.year).subscribe({
      next: (file) => {
        this.documentBlobObjectUrl = URL.createObjectURL(file);
        this.pdfFile = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.documentBlobObjectUrl
        );
      },
    });
  }
}
