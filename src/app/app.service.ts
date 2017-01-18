import { Injectable } from '@angular/core';
import { App } from './app';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { SearchParams } from './searchParams';
@Injectable()
export class AppService {
    public values: any;
    constructor(public _http: Http) { }
    private _appURL = '';
    getTests(params: SearchParams) : Observable<App>{
        this._appURL = 'http://localhost:24656/api/todo/search/?id=' + params.caseNo + '&ssn=' + params.ssn + '&phone=' + params.phoneNo +
         '&first=' + params.firstName + '&last=' + params.lastName; // URL to web api
        return this._http.get(this._appURL, { withCredentials: true })
            .map(res => <App>res.json())
            .catch(this.handleError);
    }
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}