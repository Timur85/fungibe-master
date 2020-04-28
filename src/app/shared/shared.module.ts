import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule, MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatToolbarModule
} from '@angular/material';

const material = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatToolbarModule,
  MatMenuModule,
  MatDialogModule,
];

const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
];


@NgModule({
  declarations: [],
  imports: [
    ...material,
    ...modules,
  ],
  exports: [
    ...material,
    ...modules,
  ]
})
export class SharedModule {
}
