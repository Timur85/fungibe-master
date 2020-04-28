import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AuthService} from '../../core/services/auth.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetComponent implements OnDestroy, OnInit {
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
      ]]
    });
  }

  onSubmitClick() {
    if (this.formGroup.valid) {
      this.errorMessage = null;
      const {email} = this.formGroup.getRawValue();
      this._sub.add(
        this._auth.resetPassword(email)
          .subscribe(() => {

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
