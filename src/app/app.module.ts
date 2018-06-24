import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialDashboardComponent } from './material-dashboard/material-dashboard.component';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule } from '@angular/material';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  { path: 'dashboard', loadChildren: './teniapp/teniapp.module#TeniappModule'},
  { path: '**', redirectTo: 'dashboard'}
];


@NgModule({
  declarations: [
    AppComponent,
    MaterialDashboardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
