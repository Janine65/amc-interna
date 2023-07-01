/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, OnInit } from '@angular/core';
import { Account, Journal, ParamData } from '@model/datatypes';
import { BackendService } from '@service/backend.service';
import { TableOptions, TableToolbar } from '@shared/basetable/basetable.component';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, from } from 'rxjs';
import { AttachementListComponent } from '../attachement-list/attachement-list.component';
import { AttachmentAddComponent } from '../attachment-add/attachment-add.component';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss'],
  providers: [DialogService]
})
export class JournalComponent implements OnInit {

  dialogRef?: DynamicDialogRef;

  selJahre = [{}]
  selJahr = 0;

  lstJournal: Journal[] = []
  selJournal: Journal = {};
  loading = true;
  cols: TableOptions[] = [];
  toolbar: TableToolbar[] = [];
  editMode = false;
  addMode = false;

  lstStates = [
    { label: 'Aktiv', value: 1 },
    { label: 'Inaktiv', value: 0 },
  ]
  selState = 1
  parameter: ParamData[];
  jahr: number;
  lstAccounts: Account[] = [];
  lstFromAccounts: Account[] = [];
  lstToAccounts: Account[] = [];
  selFromAccount: Account = {};
  selToAccount: Account = {};

  constructor(
    private backendService: BackendService,
    private dialogService: DialogService,
    private messageService: MessageService) {
    const str = localStorage.getItem('parameter');
    this.parameter = str ? JSON.parse(str) : [];
    const paramJahr = this.parameter.find((param) => param.key === 'CLUBJAHR');
    this.jahr = Number(paramJahr?.value)
    this.selJahr = this.jahr;
    this.selJahre.pop();
    this.selJahre.push({ label: (this.jahr - 1).toString(), value: this.jahr - 1 });
    this.selJahre.push({ label: this.jahr.toString(), value: this.jahr });
    this.selJahre.push({ label: (this.jahr + 1).toString(), value: this.jahr + 1 });

  }

  ngOnInit(): void {
    this.cols = [
      { field: 'journalno', header: 'No.', format: false, sortable: false, filtering: false, filter: undefined },
      { field: 'date', header: 'Datum', format: true, sortable: false, filtering: false, filter: undefined },
      { field: 'fromAcc', header: 'Konto Soll', format: false, sortable: false, filtering: false, filter: undefined },
      { field: 'toAcc', header: 'Konto Haben', format: false, sortable: false, filtering: false, filter: undefined },
      { field: 'memo', header: 'text', format: false, sortable: false, filtering: false, filter: undefined },
      { field: 'amount', header: 'Betrag', format: false, sortable: false, filtering: false, filter: undefined },
    ];

    this.toolbar = [
      {
        label: "Edit", btnClass: "p-button-primary p-button-outlined", icon: "pi pi-file-edit",
        isDefault: true, disabledWhenEmpty: true, disabledNoSelection: true, clickfnc: this.editJournal, roleNeeded: 'admin'
      },
      {
        label: "Delete", btnClass: "p-button-secondary p-button-outlined", icon: "pi pi-minus",
        isDefault: false, disabledWhenEmpty: true, disabledNoSelection: true, clickfnc: this.delJournal, roleNeeded: 'admin'
      },
      {
        label: "New", btnClass: "p-button-secondary p-button-outlined", icon: "pi pi-plus",
        isDefault: false, disabledWhenEmpty: false, disabledNoSelection: false, clickfnc: this.addJournal, roleNeeded: 'admin'
      },
      {
        label: "Anhänge", btnClass: "p-button-secondary p-button-outlined", icon: "pi pi-list",
        isDefault: false, disabledWhenEmpty: true, disabledNoSelection: true, clickfnc: this.showAtt, roleNeeded: 'admin'
      },
      {
        label: "Anhänge", btnClass: "p-button-secondary p-button-outlined", icon: "pi pi-plus",
        isDefault: false, disabledWhenEmpty: true, disabledNoSelection: true, clickfnc: this.addAtt, roleNeeded: 'admin'
      },
      {
        label: "Anhänge", btnClass: "p-button-secondary p-button-outlined", icon: "pi pi-upload",
        isDefault: false, disabledWhenEmpty: true, disabledNoSelection: true, clickfnc: this.addNewAtt, roleNeeded: 'admin'
      },
      {
        label: "Alle Anhänge", btnClass: "p-button-secondary p-button-outlined", icon: "pi pi-list",
        isDefault: false, disabledWhenEmpty: false, disabledNoSelection: false, clickfnc: this.showAllAtt, roleNeeded: 'admin'
      },
    ];
    this.readJournal();
  }

  private readJournal() {
    from(this.backendService.getJournal(this.selJahr))
      .subscribe(list => {
        this.lstJournal = list;
        this.lstJournal.forEach(x => {
          x.date_date = new Date(x.date!);
          x.fromAcc = x.fromAccount?.longname;
          x.from_account = x.fromAccount?.id;
          x.toAcc = x.toAccount?.longname;
          x.to_account = x.toAccount?.id;
        })
        from(this.backendService.getAccount())
          .subscribe(list2 => {
            this.lstAccounts = list2;
          })
        this.loading = false;
      });

  }

  formatField(field: string, value: string | number | boolean | null): string | number | boolean | null {

    if (field == 'date') {
      const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "2-digit", day: "2-digit" };  
      return new Intl.DateTimeFormat('de-CH', options).format(new Date(value as string))
      //return new Date((value as string)).toLocaleDateString('de-CH', options)
    }
    return value;
  }

  chgJahr() {
    this.readJournal();
  }

  fromAccountSel(acc: Account) {
    // TODO document why this method 'fromAccountSel' is empty
    this.lstFromAccounts = []
    this.selJournal.fromAccount = acc;
  }

  toAccountSel(acc: Account) {
    // TODO document why this method 'fromAccountSel' is empty
    this.lstToAccounts = []
    this.selJournal.toAccount = acc;
  }

  fromAccountSearch(event: AutoCompleteCompleteEvent) {
    // TODO document why this method 'fromAccountSel' is empty
  this.lstFromAccounts = []
    const lstString = event.query.split(" ");
    if (!lstString || lstString.length == 0)
      return;

    this.lstFromAccounts = this.lstAccounts.filter(acc => {
      let match = false
      lstString.forEach(text => {
        const regex = new RegExp(text, "i")
        const matchL = acc.name!.match(regex);
        const matchV = String(acc.order!).match(regex);
        if (matchL || matchV)
          match = true
      })
      return match
    })
    if (this.lstFromAccounts.length == 1) {
      this.fromAccountSel(this.lstFromAccounts[0]);
    }
  }

  toAccountSearch(event: AutoCompleteCompleteEvent) {
    // TODO document why this method 'toAccountSel' is empty
    this.lstToAccounts = []
    const lstString = event.query.split(" ");
    if (!lstString || lstString.length == 0)
      return;

    this.lstToAccounts = this.lstAccounts.filter(acc => {
      let match = false
      lstString.forEach(text => {
        const regex = new RegExp(text, "i")
        const matchL = acc.name!.match(regex);
        const matchV = String(acc.order!).match(regex);
        if (matchL || matchV)
          match = true
      })
      return match
    })
    if (this.lstToAccounts.length == 1) {
      this.toAccountSel(this.lstToAccounts[0]);
    }
  }

  addNewAtt = (selRec?: Journal) => {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const thisRef: JournalComponent = this;
    thisRef.messageService.clear();
    if (selRec)
      thisRef.dialogRef = thisRef.dialogService.open(AttachmentAddComponent, {
        data: {
          jahr: thisRef.selJahr,
          journalid: selRec.id,
        },
        header: 'Neuen Anhang zu Journaleintrag ' + selRec.memo + ' hinzufügen',
        width: '90%',
        height: '90%',
        resizable: true,
        modal: true,
        maximizable: true,
        draggable: true
      });
  }

  addAtt = (selRec?: Journal) => {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const thisRef: JournalComponent = this;
    thisRef.messageService.clear();
    if (selRec)
      thisRef.dialogRef = thisRef.dialogService.open(AttachementListComponent, {
        data: {
          journalid: selRec.id,
          jahr: thisRef.selJahr,
          type: 'add'
        },
        header: 'Anhänge zu Journaleintrag ' + selRec.memo + ' hinzufügen',
        width: '90%',
        height: '90%',
        resizable: true,
        modal: true,
        maximizable: true,
        draggable: true
      });
  }


  showAtt = (selRec?: Journal) => {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const thisRef: JournalComponent = this;
    console.log("Show Attachement");
    thisRef.messageService.clear();

    if (selRec) {
      // thisRef.backendService.getAttachment(selRec.id!).subscribe({
      //   next: (att) => console.log(att)
      // })
      thisRef.dialogRef = thisRef.dialogService.open(AttachementListComponent, {
        data: {
          journalid: selRec.id,
          jahr: this.selJahr,
          type: 'one'
        },
        header: 'Anhänge anzeigen für den Journaleintrag ' + selRec.memo,
        width: '90%',
        height: '90%',
        resizable: true,
        modal: true,
        maximizable: true,
        draggable: true
      });
    }
  }

  showAllAtt = () => {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const thisRef: JournalComponent = this;
    console.log("Show All Attachement");
    thisRef.messageService.clear();
    // thisRef.backendService.getAttachment(selRec.id!).subscribe({
    //   next: (att) => console.log(att)
    // })
    thisRef.dialogRef = thisRef.dialogService.open(AttachementListComponent, {
      data: {
        journalid: undefined,
        jahr: this.selJahr,
        type: 'all'
      },
      header: 'Alle Anhänge anzeigen für das Jahr ' + this.jahr,
      width: '90%',
      height: '90%',
      resizable: true,
      modal: true,
      maximizable: true,
      draggable: true
    });

  }

  editJournal = (selRec?: Journal) => {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const thisRef: JournalComponent = this;
    console.log("Edit Journal");
    thisRef.messageService.clear();
    thisRef.clearFields();
    thisRef.editMode = true;
    if (selRec) {
      Object.assign(thisRef.selJournal, selRec);
      console.log(thisRef.selJournal)
    }
  }

  delJournal = (selRec?: Journal) => {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const thisRef: JournalComponent = this;
    console.log("Del Journal");
    thisRef.messageService.clear();
    this.clearFields();

    if (selRec)
      this.backendService.delJournal(selRec).subscribe(
        {
          complete: () => {
            thisRef.lstJournal.splice(thisRef.lstJournal.indexOf(selRec), 1)

            // thisRef.messageService.add({ detail: 'Das Geschäftsjahr', closable: true, severity: 'info', sticky: false, summary: 'Anlass beenden' });

          }
        }
      )
  }

  addJournal = () => {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const thisRef: JournalComponent = this;
    console.log("New Journal");
    this.clearFields();
    thisRef.messageService.clear();
    this.addMode = true;
  }

  private clearFields() {
    this.addMode = false;
    this.editMode = false;
    this.selJournal = {}

  }
  save() {
    let sub: Observable<any>;

    this.selJournal.from_account = this.selJournal.fromAccount?.id;
    this.selJournal.to_account = this.selJournal.toAccount?.id;

    if (this.addMode) {
      sub = this.backendService.addJournal(this.selJournal)
    } else {
      sub = this.backendService.updJournal(this.selJournal)
    }
    sub.subscribe(
      {
        next: (record) => {
          this.backendService.getOneJournal(record.id).subscribe(
            {
              next: (result) => {
                result.date_date = new Date(result.date!);
                result.fromAcc = result.fromAccount?.name;
                result.from_account = result.fromAccount?.id;
                result.toAcc = result.toAccount?.name;
                result.to_account = result.toAccount?.id;

                if (this.addMode) {
                  this.lstJournal.push(result);
                  this.lstJournal.sort((a: Journal, b: Journal) => (a.journalno ? a.journalno : 0) - (b.journalno ? b.journalno : 0))
                }
                else
                  this.lstJournal = this.lstJournal.map(obj => [result].find(o => o.id === obj.id) || obj);

                this.clearFields();

              }
            }
          )
        }
      }
    )
  }
  reset() {
    this.clearFields()
  }
}
