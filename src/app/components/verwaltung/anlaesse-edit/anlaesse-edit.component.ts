import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Anlass } from '@model/datatypes';
import { BackendService } from '@app/service';
import { MessageService } from 'primeng/api';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { Subscription, from } from 'rxjs';

@Component({
    selector: 'app-anlaesse-edit',
    templateUrl: './anlaesse-edit.component.html',
    styleUrls: ['./anlaesse-edit.component.scss'],
    providers: [DialogService],
    standalone: false
})
export class AnlaesseEditComponent implements OnInit {
  anlass: Anlass = {};
  lstFKAnlaesse: Anlass[] = [];
  dlstFKAnlaesse: { value: string; id: number }[] = [];
  selFKAnlaesse: { value?: string; id?: number } = {};
  subs!: Subscription;
  lstStatus = [
    { name: 'Aktiv', code: 1 },
    { name: 'Inaktiv', code: 0 },
  ];
  dialogRef!: DynamicDialogRef;

  constructor(
    private backendService: BackendService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private dialogService: DialogService,
    private messageService: MessageService
  ) {
    this.anlass = config.data.anlass;
  }

  ngOnInit(): void {
    this.getAnlaesse();
  }
  back() {
    this.ref.close();
  }

  getAnlaesse() {
    this.subs = from(
      this.backendService.getAnlaesseFKData(
        (this.anlass.datum_date.getFullYear() - 1).toFixed(0)
      )
    ).subscribe({
      next: (list) => {
        this.dlstFKAnlaesse = list.data as {
          value: string;
          id: number;
        }[];

        console.log(this.dlstFKAnlaesse);

        if (this.anlass.anlaesseid) {
          const fFK = this.dlstFKAnlaesse.find(
            (entry) => entry.id == this.anlass.anlaesseid
          );
          if (fFK) this.selFKAnlaesse = fFK;
        }
      },
    });
  }

  save(f: NgForm) {
    if (f.invalid) {
      this.messageService.add({
        detail:
          'Die Daten sind noch nicht korrekt und können nicht gespeichert werden',
        closable: true,
        severity: 'error',
        summary: 'Adresse speichern',
      });
      return;
    }

    if (
      this.anlass.datum !=
      this.anlass.datum_date?.toLocaleDateString('fr-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    )
      this.anlass.datum = this.anlass.datum_date?.toLocaleDateString('fr-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });

    const prom =
      this.anlass.id == undefined || this.anlass.id == 0
        ? this.backendService.addAnlaesseData(this.anlass)
        : this.backendService.updAnlaesseData(this.anlass);
    prom.subscribe({
      next: (anl) => {
        console.log(anl);
        this.ref.close(anl.data as Anlass);
      },
    });
  }
}
