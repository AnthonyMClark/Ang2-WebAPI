import { Component, Input, EventEmitter, Output } from '@angular/core';
import { App } from '../app';

@Component({
    selector: 'case-indv-selector',
    templateUrl: './case-individuals.component.html',
    styleUrls: ['./case-individuals.component.css']
})
export class CaseIndividualsComponent {
    @Input() individualData: any;
    @Output() individualID = new EventEmitter<number>();
    selectedIdx: number = 0;
    selectedIndivID: number = 1;
    activitySortDesc = true;
    selectIndividual(individualID: number, id: number): void {
        this.individualID.emit(individualID);
        this.selectedIdx = id;
        this.selectedIndivID = individualID;
    }
    sortActivity(itemToSort: string) {
        this.individualData.sort((a, b) => {
            if (this.activitySortDesc) {
                if ("dob") {
                    a = a[itemToSort].split('/').reverse().join('');
                    b = b[itemToSort].split('/').reverse().join('');
                    return a > b ? 1 : a < b ? -1 : 0;
                }
                else {
                    if (a[itemToSort] < b[itemToSort]) return -1;
                    else if (a[itemToSort] > b[itemToSort]) return 1;
                    else return 0;
                }
            }
            else {
                if ("dob") {
                    a = a[itemToSort].split('/').reverse().join('');
                    b = b[itemToSort].split('/').reverse().join('');
                    return a < b ? 1 : a > b ? -1 : 0;
                }
                else {
                    if (a[itemToSort] > b[itemToSort]) return -1;
                    else if (a[itemToSort] < b[itemToSort]) return 1;
                    else return 0;
                }
            }
        });

        this.activitySortDesc = !this.activitySortDesc;
        //Maintain the highlighted item after sorting
        for (let i = 0; i < this.individualData.length; i++) {
            if (this.selectedIndivID == this.individualData[i]["indivID"]) {
                this.selectedIdx = i;
            }
        }
    }
}