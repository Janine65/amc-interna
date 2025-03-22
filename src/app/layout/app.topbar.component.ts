import { Component, ElementRef, ViewChild } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
  standalone: false,
})
export class AppTopBarComponent {
  @ViewChild('menubutton') menuButton!: ElementRef;
  @ViewChild('topbarmenu') menu!: ElementRef;

  iconDarkmode = 'pi pi-moon';
  iconLightmode = 'pi pi-sun';
  iconMode = this.iconLightmode;

  constructor(public layoutService: LayoutService) {}

  toggleDarkMode() {
    const element = document.querySelector('html');
    element.classList.toggle('my-app-dark');
    this.iconMode = element.classList.contains('my-app-dark')
      ? this.iconDarkmode
      : this.iconLightmode;
  }
}
