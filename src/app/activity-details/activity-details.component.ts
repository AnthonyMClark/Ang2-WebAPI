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
        if (chosenActivityID == this.activityDetails.TasksID) {
            for (let i = 0; i < this.activityDetails.Tasks.length; i++) {
                let createDate = this.activityDetails.Tasks[i]["CreateDate"]
                let priority = this.activityDetails.Tasks[i]["Priority"]
                let type = this.activityDetails.Tasks[i]["Type"]
                let formNo = this.activityDetails.Tasks[i]["FormNo"]
                let formCat = this.activityDetails.Tasks[i]["FormCat"]
                let workerCode = this.activityDetails.Tasks[i]["WorkerCode"]
                let status = this.activityDetails.Tasks[i]["Status"]
                let assignedTo = this.activityDetails.Tasks[i]["AssignedTo"]
                let completedBy = this.activityDetails.Tasks[i]["CompletedBy"]
                let completedDate = this.activityDetails.Tasks[i]["CompletedDate"]
                let description = this.activityDetails.Tasks[i]["Description"]
                let activity = new Array(createDate, priority, type, formNo, formCat, workerCode); //, status, assignedTo, completedBy, completedDate, description);
                details.push(activity);
            }
        }
        else if (chosenActivityID == this.activityDetails.DocRecID) {
            for (let i = 0; i < this.activityDetails.DocRec.length; i++) {
                let dateAdded = this.activityDetails.DocRec[i]["DateAdded"]
                let formNo = this.activityDetails.DocRec[i]["FormNo"]
                let category = this.activityDetails.DocRec[i]["Category"]
                let source = this.activityDetails.DocRec[i]["Source"]
                let taskCreationStatus = this.activityDetails.DocRec[i]["TaskCreationStatus"]
                let fileNetLink = this.activityDetails.DocRec[i]["FileNetLink"]
                let activity = new Array(dateAdded, formNo, category, source, taskCreationStatus, fileNetLink);
                details.push(activity);
            }
        }
        else if (chosenActivityID == this.activityDetails.DocMailedID) {
            for (let i = 0; i < this.activityDetails.DocMailed.length; i++) {
                let dateMailed = this.activityDetails.DocMailed[i]["DateMailed"]
                let formNo = this.activityDetails.DocMailed[i]["FormNo"]
                let category = this.activityDetails.DocMailed[i]["Category"]
                let source = this.activityDetails.DocMailed[i]["Source"]
                let activity = new Array(dateMailed, formNo, category, source);
                details.push(activity);
            }
        }
        else if (chosenActivityID == this.activityDetails.AppointmentID) {
            for (let i = 0; i < this.activityDetails.Appointment.length; i++) {
                let date = this.activityDetails.Appointment[i]["Date"]
                let startTime = this.activityDetails.Appointment[i]["StartTime"]
                let type = this.activityDetails.Appointment[i]["Type"]
                let location = this.activityDetails.Appointment[i]["Location"]
                let status = this.activityDetails.Appointment[i]["Status"]
                let assignedTo = this.activityDetails.Appointment[i]["AssignedTo"]
                let completedBy = this.activityDetails.Appointment[i]["CompletedBy"]
                let reminder = this.activityDetails.Appointment[i]["Reminder"]
                let limsNote = this.activityDetails.Appointment[i]["LimsNote"]
                let limsLink = this.activityDetails.Appointment[i]["LimsLink"]
                let activity = new Array(date, startTime, type, location, status, assignedTo, completedBy, reminder, limsNote, limsLink);
                details.push(activity);
            }
        }
        else if (chosenActivityID == this.activityDetails.LobbyID) {
            for (let i = 0; i < this.activityDetails.Lobby.length; i++) {
                let date = this.activityDetails.Lobby[i]["Date"]
                let kioskTime = this.activityDetails.Lobby[i]["KioskTime"]
                let reason = this.activityDetails.Lobby[i]["Reason"]
                let location = this.activityDetails.Lobby[i]["Location"]
                let limsLink = this.activityDetails.Lobby[i]["LimsLink"]
                let ssn = this.activityDetails.Lobby[i]["SSN"]
                let activity = new Array(date, kioskTime, reason, location, limsLink, ssn);
                details.push(activity);
            }
        }
        else if (chosenActivityID == this.activityDetails.CallsID) {
            for (let i = 0; i < this.activityDetails.Calls.length; i++) {
                let date = this.activityDetails.Calls[i]["Date"]
                let time = this.activityDetails.Calls[i]["Time"]
                let duration = this.activityDetails.Calls[i]["Duration"]
                let fromClientPhone = this.activityDetails.Calls[i]["FromClientPhone"]
                let toCountyPhone = this.activityDetails.Calls[i]["ToCountyPhone"]
                let receiveWKCD = this.activityDetails.Calls[i]["ReceiveWKCD"]
                let toClientPhone = this.activityDetails.Calls[i]["ToClientPhone"]
                let fromCountyPhone = this.activityDetails.Calls[i]["FromCountyPhone"]
                let callingWKCD = this.activityDetails.Calls[i]["CallingWKCD"]
                let isServiceCenter = this.activityDetails.Calls[i]["IsServiceCenter"]
                let activity = new Array(date, time, duration, fromClientPhone, toCountyPhone, receiveWKCD, toClientPhone, fromCountyPhone)//, callingWKCD, isServiceCenter);
                details.push(activity);
            }
        }
        else if (chosenActivityID == this.activityDetails.ESActivitiesID) {
            for (let i = 0; i < this.activityDetails.ESActivities.length; i++) {
                let activityName = this.activityDetails.ESActivities[i]["Activity"]
                let status = this.activityDetails.ESActivities[i]["Status"]
                let lastName = this.activityDetails.ESActivities[i]["LastName"]
                let firstName = this.activityDetails.ESActivities[i]["FirstName"]
                let expHours = this.activityDetails.ESActivities[i]["ExpHours"]
                let unit = this.activityDetails.ESActivities[i]["Unit"]
                let startDate = this.activityDetails.ESActivities[i]["StartDate"]
                let endDate = this.activityDetails.ESActivities[i]["EndDate"]
                let activityLink = this.activityDetails.ESActivities[i]["ActivityLink"]
                let activity = new Array(activityName, status, lastName + ", " + firstName, expHours, unit, startDate, endDate, activityLink);
                details.push(activity);
            }
        }
        else if (chosenActivityID == this.activityDetails.ChildCareID) {
            for (let i = 0; i < this.activityDetails.ChildCare.length; i++) {
                let dateMailed = this.activityDetails.ChildCare[i]["DateMailed"]
                let formNo = this.activityDetails.ChildCare[i]["FormNo"]
                let category = this.activityDetails.ChildCare[i]["Category"]
                let source = this.activityDetails.ChildCare[i]["Source"]
                let activity = new Array(dateMailed, formNo, category, source);
                details.push(activity);
            }
        }
        else if (chosenActivityID == this.activityDetails.KinGAPID) {
            for (let i = 0; i < this.activityDetails.KinGAP.length; i++) {
                let dateMailed = this.activityDetails.KinGAP[i]["DateMailed"]
                let formNo = this.activityDetails.KinGAP[i]["FormNo"]
                let category = this.activityDetails.KinGAP[i]["Category"]
                let source = this.activityDetails.KinGAP[i]["Source"]
                let activity = new Array(dateMailed, formNo, category, source);
                details.push(activity);
            }
        }
        return details;
    }
}