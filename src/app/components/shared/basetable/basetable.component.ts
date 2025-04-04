/* eslint-disable @typescript-eslint/no-explicit-any */
import { DecimalPipe } from '@angular/common';
import {
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AccountService } from '@app/service';
import { Table } from 'primeng/table';

export class TableOptions {
  public header?: string;
  public field?: string;
  public pipe?: any;
  public args?: [any] | any;
  public format = false;
  public sortable = false;
  public sorting?: string;
  public filtering = false;
  public filter?: string;
  public class?: string;
}

export class TableData {
  public id?: number;
  public createdAt?: Date;
  public updatedAt?: Date;
  public classRow?: string;
}

export class TableToolbar {
  public label: string;
  public btnClass: string;
  public icon: string;
  public isDefault: boolean;
  public disabledWhenEmpty: boolean;
  public disabledNoSelection: boolean;
  public roleNeeded: string;
  public isEditFunc: boolean;
  public clickfnc: (selRec?: TableData, lstData?: TableData[]) => void;
  constructor(
    label: string,
    btnClass: string,
    icon: string,
    isDefault: boolean,
    disabledWhenEmpty: boolean,
    disabledNoSelection: boolean,
    roleNeeded: string,
    clickfnc: (
      selRec?: TableData | undefined,
      lstData?: TableData[] | undefined
    ) => void,
    isEditFunc = false
  ) {
    this.label = label;
    this.btnClass = btnClass;
    this.icon = icon;
    this.isDefault = isDefault;
    this.roleNeeded = roleNeeded ?? roleNeeded;
    this.disabledWhenEmpty = disabledWhenEmpty;
    this.disabledNoSelection = disabledNoSelection;
    this.clickfnc = clickfnc;
    this.isEditFunc = isEditFunc;
  }
}

@Component({
    selector: 'app-basetable',
    templateUrl: './basetable.component.html',
    styleUrls: ['./basetable.component.scss'],
    standalone: false
})
export class BaseTableComponent implements OnInit, OnDestroy {
  @Input() tableOptions: TableOptions[] = [];
  @Input() tableData: TableData[] = [];
  @Input() formatFunction:
    | ((
        field: string,
        value: string | number | boolean | null
      ) => string | number | boolean | null)
    | undefined;
  @Input() tableToolbar?: TableToolbar[] = [];
  @Input() localStorage = 'basetable';
  @Input() diffCalcHight = 300;
  @Input() editable = true;
  @Input() rowClassField = '';

  selectedRecord?: TableData;
  filteredRows = this.tableData;
  public objHeight$ = '500px';
  getScreenWidth = 0;
  getScreenHeight = 0;
  DecimalPipe?: DecimalPipe;

  constructor(private accountService: AccountService) {}

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    console.log(this.getScreenWidth, this.getScreenHeight);
    this.getHeight();
  }

  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    this.getHeight();
    if (!this.getEditFunc()) this.editable = false;
  }

  ngOnDestroy() {
    return;
  }

  private getHeight() {
    this.objHeight$ =
      (this.getScreenHeight - this.diffCalcHight).toFixed(0) + 'px';
  }

  clear(table: Table) {
    table.clear();
    localStorage.removeItem(this.localStorage);
  }

  checkSorting(): boolean {
    let retVal = false;
    retVal = this.tableOptions.find((opt) => opt.sorting) != undefined;
    return retVal;
  }

  checkFiltering(): boolean {
    let retVal = false;
    retVal = this.tableOptions.find((opt) => opt.filtering) != undefined;
    return retVal;
  }

  getEditFunc() {
    const funcEdit = this.tableToolbar?.findIndex((entry) => entry.isEditFunc);
    if (funcEdit != undefined && funcEdit > -1)
      if (this.isButtonAllowed(funcEdit))
        return this.tableToolbar?.at(funcEdit)?.clickfnc;

    return false;
  }

  retDefaultFunc(): any {
    const funcDefault = this.tableToolbar?.find((entry) => entry.isDefault);
    if (funcDefault) {
      // check first the role
      const ind = this.tableToolbar?.findIndex(
        (value) => value.label == funcDefault.label
      );
      if (ind != undefined && !this.isButtonDisabled(ind))
        return funcDefault.clickfnc;
    }
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filterEvent(event: any) {
    this.filteredRows = event.filteredValue;
  }

  selectData(data: TableData) {
    console.log('selectData: ', data);
    this.selectedRecord = data;
    const funcDefault = this.retDefaultFunc();
    if (funcDefault && this.selectedRecord) funcDefault(this.selectedRecord);
  }

  editData(data: TableData) {
    console.log('editData: ', data);
    this.selectedRecord = data;
    const funcDefault = this.getEditFunc();
    if (funcDefault && this.selectedRecord) funcDefault(this.selectedRecord);
  }

  isButtonAllowed(ind: number): boolean {
    if (this.tableToolbar) {
      if (this.tableToolbar[ind].roleNeeded != '') {
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          if (
            user.role != this.tableToolbar[ind].roleNeeded &&
            user.role != 'admin'
          )
            return false;
        }
      }
    }
    return true;
  }

  isButtonDisabled(ind: number): boolean {
    if (this.tableToolbar) {
      if (!this.isButtonAllowed(ind)) return true;
      if (this.filteredRows.length == 0 && this.checkFiltering())
        return this.tableToolbar[ind].disabledWhenEmpty;

      if (this.selectedRecord == undefined)
        return this.tableToolbar[ind].disabledNoSelection;

      return false;
    }

    return true;
  }

  clickOnToolbar(ind: number) {
    if (this.tableToolbar) {
      console.log(`Button ${this.tableToolbar[ind].label} pressed`);
      this.tableToolbar[ind].clickfnc(
        this.selectedRecord ? this.selectedRecord : undefined,
        this.filteredRows
      );
    }
  }
}
