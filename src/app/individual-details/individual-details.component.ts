import { Component, Input, ElementRef, OnChanges } from '@angular/core';
declare var jQuery: any;

@Component({
    selector: 'indv-details-selector',
    templateUrl: './individual-details.component.html',
    styleUrls: ['./individual-details.component.css']
})
export class IndividualDetailsComponent implements OnChanges {
    constructor(private _elemRef: ElementRef){}
    @Input() individualDetails: any;
    @Input() individualID: number;
    ngOnChanges(individualID: any) {
        if (this.individualDetails && this.individualDetails.length > 0) {
            let details = [];
            for (let i = 0; i < this.individualDetails.length; i++) {
                if(this.individualDetails[i]["IndivID"] == this.individualID) {
                    let program = this.individualDetails[i]["Program"]
                    let status = this.individualDetails[i]["Status"]
                    let rrDueDate = this.individualDetails[i]["RRDueDate"]
                    let toaWeeks = this.individualDetails[i]["TOAWeeks"]
                    let grantAmount = this.individualDetails[i]["GrantAmount"]
                    let workerCode = this.individualDetails[i]["WorkerCode"]
                    let indvidual = new Array(program, status, rrDueDate, toaWeeks, grantAmount, workerCode);
                    details.push(indvidual);
                }
            }
            jQuery(this._elemRef.nativeElement).find('#indvDetailsTable').DataTable({
                data: details,
                columns: [
                    { title: "Program" },
                    { title: "Status" },
                    { title: "RR Due" },
                    { title: "TOA (wk)" },
                    { title: "Grant Amt" },
                    { title: "Worker" }
                ],
                destroy: true,
                "lengthChange": false,
                "info": false,
                "dom": '<"top"i>rt<"bottom"flp><"clear">',
                language: {
                    search: "_INPUT_",
                    searchPlaceholder: "Search..."
                }
            });
        }
    }
}