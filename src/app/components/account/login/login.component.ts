import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { last } from 'rxjs/operators';
import { AccountService, AlertService } from '@app/service';
import { AlertType } from '@app/models';
import { MessageService } from 'primeng/api';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None,
  standalone: false,
})
export class LoginComponent implements OnInit {
  loading = false;
  submitted = false;
  fg: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.fg = this.fb.group({
      email: [''],
      password: [''],
    });
    return;
  }

  async onReset() {
    // reset alerts on submit
    this.alertService.clear();
    if (this.fg.get('email').value == '') {
      this.alertService.alert({
        autoClose: false,
        fade: false,
        type: AlertType.Error,
        message: 'Email nicht ausgefüllt',
        keepAfterRouteChange: false,
      });
      return;
    }

    this.submitted = true;
    this.loading = true;
    this.accountService
      .newPasswort(this.fg.get('email').value)
      .pipe(last())
      .subscribe({
        next: async () => {
          // get return url from query parameters or default to home page
          this.alertService.alert({
            autoClose: false,
            fade: false,
            type: AlertType.Success,
            message: 'Mail gesendet mit neuem Passwort',
            keepAfterRouteChange: false,
          });
          await this.router.navigateByUrl('/');
        },
      });
  }

  onSubmit() {
    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.fg.invalid) {
      return;
    }

    this.submitted = true;

    this.loading = true;

    this.accountService
      .login(this.fg.get('email').value, this.fg.get('password').value)
      .pipe(last())
      .subscribe({
        next: async () => {
          // get return url from query parameters or default to home page
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          console.log(returnUrl);
          await this.router.navigateByUrl(returnUrl);
        },
        error: (error) => {
          this.alertService.error(error);
          this.loading = false;
        },
      });
  }
}
