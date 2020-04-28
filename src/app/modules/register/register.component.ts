import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AuthService} from '../../core/services/auth.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnDestroy, OnInit {
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
      fullName: [null, [
        Validators.required
      ]],
      email: [null, [
        Validators.required,
        Validators.email
      ]],
      password: [null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30)
      ]],
      repeatPassword: [null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30)
      ]],
    });
  }

  onSubmitClick() {
    if (this.formGroup.valid) {
      this.errorMessage = null;
      const body = this.formGroup.getRawValue();
      this._sub.add(
        this._auth.register(body)
          .subscribe(() => {
              this._router.navigateByUrl('/login');
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
