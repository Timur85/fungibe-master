import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AuthService} from '../../core/services/auth.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnDestroy, OnInit {
  formGroup: FormGroup;
  errorMessage: string;

  private _sub = new Subscription();

  constructor(
    private _auth: AuthService,
    private _fb: FormBuilder,
    private _cdr: ChangeDetectorRef,
    private _router: Router) {
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  ngOnInit() {
    this.formGroup = this._fb.group({
      email: [null, [
        Validators.required,
        Validators.email
      ]],
      password: [null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30)
      ]],
    });
  }

  onSubmitClick() {
    if (this.formGroup.valid) {
      this.errorMessage = null;
      const {email, password} = this.formGroup.getRawValue();
      this._sub.add(
        this._auth.login(email, password)
          .subscribe(() => {
              this._router.navigateByUrl('/');
            },
            (res: HttpErrorResponse) => {
              if (res && res.message) {
                this.errorMessage = res.message;
                this._cdr.markForCheck();
              }
            }
          )
      );
    }
  }

}
