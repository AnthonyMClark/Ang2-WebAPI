import { Component, Input, Output, EventEmitter } from '@angular/core';
import { App } from '../app';
@Component({
    selector: 'case-activity-selector',
    templateUrl: './case-activity.component.html',
    styleUrls: ['./case-activity.component.css']
})
export class CaseActivityComponent {
    @Input() caseActivity: any;
    @Output() activityID = new EventEmitter<number>();
    selectedIdx: number = 0;
    selectedActivityID: number = 1;
    activitySortDesc = true;
    selectActivity(activityID: number, id: number): void {
        this.activityID.emit(activityID);
        this.selectedIdx = id;
        this.selectedActivityID = activityID;
    }
    sortActivity(itemToSort: string) {
        this.caseActivity.sort((a, b) => {
            if(this.activitySortDesc) {
                if (a[itemToSort] < b[itemToSort]) return -1;
                else if (a[itemToSort] > b[itemToSort]) return 1;
                else return 0;
            }
            else {
                if (a[itemToSort] > b[itemToSort]) return -1;
                else if (a[itemToSort] < b[itemToSort]) return 1;
                else return 0;
            }
        });
        this.activitySortDesc = !this.activitySortDesc;
        //Maintain the highlighted item after sorting
        for(let i = 0; i < this.caseActivity.length; i++) {
            if(this.selectedActivityID == this.caseActivity[i]["activityID"]) {
                this.selectedIdx = i;
            }
        }
    }
}