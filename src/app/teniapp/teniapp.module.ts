import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../shared/material.module';
import {RouterModule, Routes} from '@angular/router';
import {TeniappMainComponent} from './teniapp-main.component';
import { LoginComponent } from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';

const routes: Routes = [
  { path: '', component: LoginComponent,
    // children: [
    //   { path: ':id', component: MainContentComponent},
    //   { path: '', component: MainContentComponent}
    // ]
  },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    TeniappMainComponent,
    LoginComponent
  ]
})
export class TeniappModule { }