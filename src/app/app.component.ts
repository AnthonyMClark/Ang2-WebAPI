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
  isInvalidSearch: boolean;
  params: SearchParams;
  ngOnInit() {
    this.params = new SearchParams("f", null, null, "", "");
    this.checkParamVals(this.params);
    if(!this.isInvalidSearch) {
      this.getTests(this.params);
    }
  }

  getTests(parameters: SearchParams) {
        this._appService.getTests(parameters)
        .subscribe(value => {
          if(value["CaseNo"]) {
            this.isValidCase = true;
          }
          else {
            this.isValidCase = false;
          }
          this.case = value;
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
    this.checkParamVals(params);
    if(!this.isInvalidSearch) {
      this.getTests(params);
    }
  }
  clearParams(params: SearchParams) {
    params.caseNo = "";
    params.ssn = null;
    params.phoneNo = null;
    params.firstName = "";
    params.lastName = "";
  }
  checkParamVals(params: SearchParams) {
    if(params.caseNo != "") {
      this.isInvalidSearch = false;
    }
    else if(params.ssn != null){
      this.isInvalidSearch = false;
    }
    else if(params.phoneNo != null){
      this.isInvalidSearch = false;
    }
    else if(params.firstName != ""){
      this.isInvalidSearch = false;
    }
    else if(params.lastName = ""){
      this.isInvalidSearch = false;
    }
    else {
      this.isInvalidSearch = true;
    }
  }
}
