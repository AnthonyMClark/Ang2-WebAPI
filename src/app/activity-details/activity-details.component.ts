import { Component, Input, ElementRef, OnChanges, OnInit } from '@angular/core';
declare var jQuery: any;
@Component({
    selector: 'activity-details-selector',
    templateUrl: './activity-details.component.html',
    styleUrls: ['./activity-details.component.css']
})
export class ActivityDetailsComponent implements OnChanges {
    constructor(private _elemRef: ElementRef) { }
    @Input() activityDetails: any;
    @Input() activityID: number;
    tableHeaders: any[];
    tableData: any[];
    createTable(headerRow)  {
        let table = jQuery('<table class="table table-hover table-sm"><thead><tr></tr></thead><tbody></tbody></table>');
        var tr = table.find('thead tr');
        headerRow.forEach(function (val, index, arr) {
            tr.append('<th>' + val + '</th>');
        });
        return table;
    }

    ngOnChanges(newID: any) {
        this.buildTable(newID);
    }


    buildTable(newID: any) {
        switch (this.activityID) {
            case 1:
                this.tableHeaders = this.taskHeaders;
                this.tableData = this.setTableData(this.activityID);
                break;
            case 2:
                this.tableHeaders = this.docRecHeaders;
                this.tableData = this.setTableData(this.activityID);
                break;
            case 3:
                this.tableHeaders = this.docMailHeaders;
                this.tableData = this.setTableData(this.activityID);
                break;
            case 4:
                this.tableHeaders = this.appointmentHeaders;
                this.tableData = this.setTableData(this.activityID);
                break;
            case 5:
                this.tableHeaders = this.lobbyHeaders;
                this.tableData = this.setTableData(this.activityID);
                break;
            case 6:
                this.tableHeaders = this.callsHeader;
                this.tableData = this.setTableData(this.activityID);
                break;
            case 7:
                this.tableHeaders = this.esActivitiesHeader;
                this.tableData = this.setTableData(this.activityID);
                break;
            case 8:
                this.tableHeaders = this.childCareHeader;
                this.tableData = this.setTableData(this.activityID);
                break;
            case 9:
                this.tableHeaders = this.kinGAPHeader;
                this.tableData = this.setTableData(this.activityID);
                break;
        }
        if (this.activityDetails) {
            let table = jQuery(this._elemRef.nativeElement).find('#example').DataTable();
            jQuery(this._elemRef.nativeElement).find('.dynTableHolder').children().remove(); //remove the #example table
            let headerRow = this.tableHeaders;
            this.createTable(headerRow);
            let jsonData = this.tableData;
            table = this.createTable(headerRow);
            jQuery(this._elemRef.nativeElement).find('.dynTableHolder').append(table);

            table.DataTable({ 
            data: jsonData,       
            "orderClasses": false,          
            "lengthChange": false,
            "info": false,
            "dom": '<"top"i>rt<"bottom"flp><"clear">',
            language: {
                search: "_INPUT_",
                searchPlaceholder: "Search..."
            } });
        }
    }



    taskHeaders = ["Create" , "Priority", "Type", "Form #", "Form Cat", "WRK CD"];//, "Assigned To", "Comp By", "Comp Date", "Description"];
    docRecHeaders = ["Date Added", "Form #", "Category", "Source", "Task Created", "Link to FileNet"];
    docMailHeaders = ["Date Mailed", "Form #", "Category", "Source"];
    appointmentHeaders = ["Date", "Start", "Type", "Location", "Status", "Asgn To", "Comp", "Notify", "LIMS Note", "LIMS Link"];
    lobbyHeaders = ["Date", "Kiosk Time", "SSN", "Reason", "Location", "LIMS Link"];
    callsHeader = ["Date", "Time", "Duration", "From Cust", "To County", "Rec By", "To Cust", "From County"]//, "Call By", "Srv Ctr"];
    esActivitiesHeader = ["Activity", "Status", "Name", "Exp Hours", "Unit", "Start Date", "End Date", "Link"];
    childCareHeader = ["Date", "Category", "Form #", "Source"];
    kinGAPHeader = ["Date", "Category", "Form #", "Source"];

    setTableData(chosenActivityID: number): any[] {
        let details = [];
        if (chosenActivityID == this.activityDetails.tasksID) {
            for (let i = 0; i < this.activityDetails.tasks.length; i++) {
                let createDate = this.activityDetails.tasks[i]["createDate"]
                let priority = this.activityDetails.tasks[i]["priority"]
                let type = this.activityDetails.tasks[i]["type"]
                let formNo = this.activityDetails.tasks[i]["formNo"]
                let formCat = this.activityDetails.tasks[i]["formCat"]
                let workerCode = this.activityDetails.tasks[i]["workerCode"]
                let status = this.activityDetails.tasks[i]["status"]
                let assignedTo = this.activityDetails.tasks[i]["assignedTo"]
                let completedBy = this.activityDetails.tasks[i]["completedBy"]
                let completedDate = this.activityDetails.tasks[i]["completedDate"]
                let description = this.activityDetails.tasks[i]["description"]
                let activity = new Array(createDate, priority, type, formNo, formCat, workerCode); //, status, assignedTo, completedBy, completedDate, description);
                details.push(activity);
            }
        }
        else if (chosenActivityID == this.activityDetails.docRecID) {
            for (let i = 0; i < this.activityDetails.docRec.length; i++) {
                let dateAdded = this.activityDetails.docRec[i]["dateAdded"]
                let formNo = this.activityDetails.docRec[i]["formNo"]
                let category = this.activityDetails.docRec[i]["category"]
                let source = this.activityDetails.docRec[i]["source"]
                let taskCreationStatus = this.activityDetails.docRec[i]["taskCreationStatus"]
                let fileNetLink = this.activityDetails.docRec[i]["fileNetLink"]
                let activity = new Array(dateAdded, formNo, category, source, taskCreationStatus, fileNetLink);
                details.push(activity);
            }
        }
        else if (chosenActivityID == this.activityDetails.docMailedID) {
            for (let i = 0; i < this.activityDetails.docMailed.length; i++) {
                let dateMailed = this.activityDetails.docMailed[i]["dateMailed"]
                let formNo = this.activityDetails.docMailed[i]["formNo"]
                let category = this.activityDetails.docMailed[i]["category"]
                let source = this.activityDetails.docMailed[i]["source"]
                let activity = new Array(dateMailed, formNo, category, source);
                details.push(activity);
            }
        }
        else if (chosenActivityID == this.activityDetails.appointmentID) {
            for (let i = 0; i < this.activityDetails.appointment.length; i++) {
                let date = this.activityDetails.appointment[i]["date"]
                let startTime = this.activityDetails.appointment[i]["startTime"]
                let type = this.activityDetails.appointment[i]["type"]
                let location = this.activityDetails.appointment[i]["location"]
                let status = this.activityDetails.appointment[i]["status"]
                let assignedTo = this.activityDetails.appointment[i]["assignedTo"]
                let completedBy = this.activityDetails.appointment[i]["completedBy"]
                let reminder = this.activityDetails.appointment[i]["reminder"]
                let limsNote = this.activityDetails.appointment[i]["limsNote"]
                let limsLink = this.activityDetails.appointment[i]["limsLink"]
                let activity = new Array(date, startTime, type, location, status, assignedTo, completedBy, reminder, limsNote, limsLink);
                details.push(activity);
            }
        }
        else if (chosenActivityID == this.activityDetails.lobbyID) {
            for (let i = 0; i < this.activityDetails.lobby.length; i++) {
                let date = this.activityDetails.lobby[i]["date"]
                let kioskTime = this.activityDetails.lobby[i]["kioskTime"]
                let reason = this.activityDetails.lobby[i]["reason"]
                let location = this.activityDetails.lobby[i]["location"]
                let limsLink = this.activityDetails.lobby[i]["limsLink"]
                let ssn = this.activityDetails.lobby[i]["ssn"]
                let activity = new Array(date, kioskTime, reason, location, limsLink, ssn);
                details.push(activity);
            }
        }
        else if (chosenActivityID == this.activityDetails.callsID) {
            for (let i = 0; i < this.activityDetails.calls.length; i++) {
                let date = this.activityDetails.calls[i]["date"]
                let time = this.activityDetails.calls[i]["time"]
                let duration = this.activityDetails.calls[i]["duration"]
                let fromClientPhone = this.activityDetails.calls[i]["fromClientPhone"]
                let toCountyPhone = this.activityDetails.calls[i]["toCountyPhone"]
                let receiveWKCD = this.activityDetails.calls[i]["receiveWKCD"]
                let toClientPhone = this.activityDetails.calls[i]["toClientPhone"]
                let fromCountyPhone = this.activityDetails.calls[i]["fromCountyPhone"]
                let callingWKCD = this.activityDetails.calls[i]["callingWKCD"]
                let isServiceCenter = this.activityDetails.calls[i]["isServiceCenter"]
                let activity = new Array(date, time, duration, fromClientPhone, toCountyPhone, receiveWKCD, toClientPhone, fromCountyPhone)//, callingWKCD, isServiceCenter);
                details.push(activity);
            }
        }
        else if (chosenActivityID == this.activityDetails.esActivitiesID) {
            for (let i = 0; i < this.activityDetails.esActivities.length; i++) {
                let activityName = this.activityDetails.esActivities[i]["activity"]
                let status = this.activityDetails.esActivities[i]["status"]
                let lastName = this.activityDetails.esActivities[i]["lastName"]
                let firstName = this.activityDetails.esActivities[i]["firstName"]
                let expHours = this.activityDetails.esActivities[i]["expHours"]
                let unit = this.activityDetails.esActivities[i]["unit"]
                let startDate = this.activityDetails.esActivities[i]["startDate"]
                let endDate = this.activityDetails.esActivities[i]["endDate"]
                let activityLink = this.activityDetails.esActivities[i]["activityLink"]
                let activity = new Array(activityName, status, lastName + ", " + firstName, expHours, unit, startDate, endDate, activityLink);
                details.push(activity);
            }
        }
        else if (chosenActivityID == this.activityDetails.childCareID) {
            for (let i = 0; i < this.activityDetails.childCare.length; i++) {
                let dateMailed = this.activityDetails.childCare[i]["dateMailed"]
                let formNo = this.activityDetails.childCare[i]["formNo"]
                let category = this.activityDetails.childCare[i]["category"]
                let source = this.activityDetails.childCare[i]["source"]
                let activity = new Array(dateMailed, formNo, category, source);
                details.push(activity);
            }
        }
        else if (chosenActivityID == this.activityDetails.kinGAPID) {
            for (let i = 0; i < this.activityDetails.kinGAP.length; i++) {
                let dateMailed = this.activityDetails.kinGAP[i]["dateMailed"]
                let formNo = this.activityDetails.kinGAP[i]["formNo"]
                let category = this.activityDetails.kinGAP[i]["category"]
                let source = this.activityDetails.kinGAP[i]["source"]
                let activity = new Array(dateMailed, formNo, category, source);
                details.push(activity);
            }
        }
        return details;
    }
}