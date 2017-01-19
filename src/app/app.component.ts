import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Router } from '@angular/router';
import { App } from './app';
import { SearchParams } from './searchParams';
import { PopoverModule } from 'ngx-popover';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ AppService ]
})
export class AppComponent implements OnInit {
  constructor(private _appService: AppService) { }
  errorMessage: string;
  public case: App;
  selectedActivityID: number = 1;
  selectedIndividualID: number = 1;
  isValidCase: boolean = true;
  params: SearchParams;
  ngOnInit() {
    this.params = new SearchParams("1", null, null, "", "");
    this.getTests(this.params);
  }

  getTests(parameters: SearchParams) {
        this._appService.getTests(parameters)
        .subscribe(value => {
          if(value["caseNo"]) {
            this.case = value;
            this.isValidCase = true;
          }
          else {
            this.isValidCase = false;
          }
        },
        error => {this.errorMessage = <any>error });
  }

  activityID(activityID: number) {
    this.selectedActivityID = activityID;
  }
  individualID(individualID: number) {
    this.selectedIndividualID = individualID;
  }
  searchCase(params: SearchParams) {
    this.getTests(params);
  }
  clearParams(params: SearchParams) {
    params.caseNo = "";
    params.ssn = null;
    params.phoneNo = null;
    params.firstName = "";
    params.lastName = "";
  }
}
