import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatPaginatorModule, MatSortModule,MatTableModule } from '@angular/material';
import { CdkDetailRowDirective } from '@app/shared';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent,MatTableComponent } from '@app/core';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MatTableComponent,
    CdkDetailRowDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
