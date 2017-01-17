import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { CaseIndividualsComponent } from './case-individuals/case-individuals.component';
import { IndividualDetailsComponent } from './individual-details/individual-details.component';
import { CaseCommentsComponent } from './case-comments/case-comments.component'; 
import { ActivityDetailsComponent } from './activity-details/activity-details.component';
import { CaseActivityComponent } from './case-activity/case-activity.component';
import { CipBannerComponent } from './cip-banner/cip-banner.component';

@NgModule({
  declarations: [
    AppComponent,
    CaseIndividualsComponent,
    IndividualDetailsComponent,
    CaseCommentsComponent,
    ActivityDetailsComponent,
    CaseActivityComponent,
    CipBannerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
