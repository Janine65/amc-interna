/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { Account } from '@model/datatypes';
import { BackendService } from '@service/backend.service';
import { TableOptions, TableToolbar } from '@shared/basetable/basetable.component';
import { MessageService } from 'primeng/api';
import { Observable, from } from 'rxjs';

@Component({
  selector: 'app-konten',
  templateUrl: './konten.component.html',
  styleUrls: ['./konten.component.scss']
})
export class KontenComponent implements OnInit {


  lstAccount : Account[] = []
  selAccount: Account = {};
  loading = true;
  cols: TableOptions[] = [];
  toolbar: TableToolbar[] = [];
  editMode = false;
  addMode = false;

  lstStates = [
    {label: 'Aktiv', value: 1},
    {label: 'Inaktiv', value: 0},
  ]
  selState = 1

  constructor(private backendService: BackendService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.cols = [
      { field: 'name', header: 'Name', format: false, sortable: false, filtering: false, filter: undefined },
      { field: 'level', header: 'Level', format: false, sortable: false, filtering: false, filter: undefined },
      { field: 'order', header: 'Order', format: false, sortable: false, filtering: false, filter: undefined },
      { field: 'status', header: 'Status', format: true, sortable: false, filtering: false, filter: undefined },
    ];

    this.toolbar = [
      {
        label: "Edit", btnClass: "p-button-primary p-button-outlined", icon: "pi pi-file-edit",
        isDefault: true, disabledWhenEmpty: true, disabledNoSelection: true, clickfnc: this.editAccount, roleNeeded: ''
      },
      {
        label: "Delete", btnClass: "p-button-secondary p-button-outlined", icon: "pi pi-minus",
        isDefault: false, disabledWhenEmpty: true, disabledNoSelection: true, clickfnc: this.delAccount, roleNeeded: ''
      },
      {
        label: "New", btnClass: "p-button-secondary p-button-outlined", icon: "pi pi-plus",
        isDefault: false, disabledWhenEmpty: false, disabledNoSelection: false, clickfnc: this.addAccount, roleNeeded: ''
      },
    ];

    from(this.backendService.getAccount())
    .subscribe(list => {
      this.lstAccount = list;
      this.loading = false;
    });
  }

  formatField(field: string, value: string | number | boolean | null): string | number | boolean | null {
    if (field == 'status') {
      switch (value as number) {
        case 1:
          return 'Aktiv'

        case 0:
          return 'Inaktiv'

      }
    }
    return value;
  }

  editAccount = (selRec?: Account) => {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const thisRef: KontenComponent = this;
    console.log("Edit Account");
    thisRef.messageService.clear();
    this.clearFields();
    this.editMode = true;
    if (selRec)
      Object.assign(this.selAccount, selRec)
  }

  delAccount = (selRec?: Account) => {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const thisRef: KontenComponent = this;
    console.log("Del Account");
    thisRef.messageService.clear();
    this.clearFields();

    if (selRec)
      this.backendService.delAccount(selRec).subscribe(
        {complete: () => {
          thisRef.lstAccount.splice(thisRef.lstAccount.indexOf((selRec as Account)),1)

          thisRef.messageService.add({ detail: 'Das Geschäftsjahr', closable: true, severity: 'info', sticky: false, summary: 'Anlass beenden' });

        }}
      )
  }

  addAccount = () => {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const thisRef: KontenComponent = this;
    console.log("New Account");
    this.clearFields();
    thisRef.messageService.clear();
    this.addMode = true;
  }

  private clearFields() {
    this.addMode = false;
    this.editMode = false;
    this.selAccount = {}

  }
  save() {
    let sub : Observable<any>;

    if (this.addMode) {
      sub = this.backendService.addAccount(this.selAccount)
    } else {
      sub = this.backendService.updAccount(this.selAccount)
    }
    sub.subscribe(
      {complete: () => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.backendService.getOneDataByOrder(this.selAccount.order!).subscribe(
          { next: (entry) => {
            if (this.addMode) {
              this.lstAccount.push(this.selAccount);
              this.lstAccount.sort((a : Account, b : Account) => (a.order ? a.order : 0)  - (b.order ? b.order : 0))
            }
            else
              this.lstAccount = this.lstAccount.map(obj => [entry].find(o => o.id === obj.id) || obj);

            this.clearFields();
          }}
        )
      }}
    )
  }
}