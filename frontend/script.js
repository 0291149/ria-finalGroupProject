/**
 * Created by inet2005 on 4/3/17.
 */

/*Helpers*/

function DateConverter(data)
{

    var date = new Date(data);
    var stringDate = date.toDateString();

    var minutes = "";
    if(date.getMinutes() < 10)
    {
        minutes =  "0" + date.getMinutes();
    }
    else
    {
        minutes =  date.getMinutes();
    }

    stringDate += " " + date.getHours() + ":" + minutes;

    return stringDate.toString();

}

function DateSplitter(date)
{
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function timeSplitter(date)
{
    var time = new Date(date);
    var hour = time.getHours();
    var minute = time.getMinutes();
    if(minute < 10) minute ='0' + minute;
    if(hour < 10) hour ='0' + hour;

    return [hour,minute].join(':');

}


function displayDate(data, className)
{
    /*<tr class="rowOne">
     <td class="leftWing">Christmas Dinner</td>
     <td class="rightWing">December 23, 2017 4:00PM</td>
     <td><span class="glyphicon glyphicon-floppy-disk"></span></td>
     </tr>
     <tr class="rowTwo">
     <td class="leftWing">Christmas with mom</td>
     <td class="rightWing">Mom's place</td>
     <td><span class="glyphicon glyphicon-trash"></span></td>
     </tr>*/

    /*
     title           date        action
     description     location    action
     */

    var startDate = DateConverter(data.startDate);
    var endDate = DateConverter(data.endDate);

    //start the row
    var htmlString = "<tr class='"+ className +"'>";

    //left wing
    htmlString += "<td class='leftWing'><p>";
    htmlString += data.title;
    htmlString += "</p><p>";
    htmlString += data.description;
    htmlString += "</p></td>";

    //right wing
    htmlString += "<td class='rightWing'><p>";
    htmlString += startDate + " - " + endDate;
    htmlString += "</p><p>";
    htmlString += data.location;
    htmlString += "</p></td>";

    //actions
    htmlString +="<td><p><span onclick='editEvent(" + data.eventId +");' class='glyphicon glyphicon-pencil'></span></p>";
    htmlString += "<p><span onclick='deleteEvent(" + data.eventId +");' class='glyphicon glyphicon-trash'></span></p></td>";

    //end the row
    htmlString += "</tr>";

    return htmlString;
}

function displayError()
{
    $("#errors").html("There was an error processing your request. Please try again later.");
}

function validateFields()
{
    isValid = true;

    if($("#eventName").val().length == 0)
    {
        $("#eventNameError").html("Please fill out this field.");
        isValid = false;
    }
    if($("#startDate").val().length == 0)
    {
        $("#startDateError").html("Please fill out this field.");
        isValid = false;
    }
    if($("#startTime").val().length == 0)
    {
        $("#startTimeError").html("Please fill out this field.");
        isValid = false;
    }
    if($("#endDate").val().length == 0)
    {
        $("#endDateError").html("Please fill out this field.");
        isValid = false;
    }
    if($("#endTime").val().length == 0)
    {
        $("#endTimeError").html("Please fill out this field.");
        isValid = false;
    }
    if($("#eventDescription").val().length == 0)
    {
        $("#eventDescriptionError").html("Please fill out this field.");
        isValid = false;
    }
    if($("#eventLocation").val().length == 0)
    {
        $("#eventLocationError").html("Please fill out this field.");
        isValid = false;
    }

    if ($('#startDate').val() > $('#endDate').val()) {
        $("#eventLocationError").html("Your end date is before the start date.");
        isValid = false;
    }

    var dateObj = new Date();
    var month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    var day = ("0" + (dateObj.getDate())).slice(-2);
    var year = dateObj.getUTCFullYear();
    var currentDate = year + "-" + month + "-" + day;

    var d = new Date(),
        h = d.getHours(),
        m = d.getMinutes();
        if(h < 10) h = '0' + h;
        if(m < 10) m = '0' + m;
        var time = h + ":" + m;

    if($('#endDate').val() + " " + $('#endTime').val() < currentDate + " " + time){
        $("#endDateError").html("Your event has already ended");
        isValid = false;
    }


    return isValid;
}

/*CRUD functions*/

function addEvent()
{

    //populates form for adding event

    var form = $('#formDialog').find("form");

    var allFields = $( [] ).add($('#eventName')).add($('#eventDescription')).add($('#eventLocation'));
    var errorFields = $( [] ).add($('#eventNameError'))
        .add($('#startDateError')).add($('#startTimeError')).add($('#endDateError')).add($('#endTimeError'))
        .add($('#eventDescriptionError')).add($('#eventLocationError'));


    $('#formDialog').dialog('option', 'title', 'Create new Event');
    $('#formDialog').dialog();
    $("#formDialog").dialog({
        buttons: [
            {
                text: "Create new Event",
                click: function () {
                    if (validateFields()) {
                        createEvent();
                        form[0].reset();
                        allFields.removeClass("ui-state-error");
                        errorFields.html("");
                    }
                }
            },
            {
                text: "Cancel",
                click: function () {
                    $("#formDialog").dialog("close");
                    form[ 0 ].reset();
                    allFields.removeClass( "ui-state-error" )
                    errorFields.html("");
                }
            }
        ],
        Cancel: function () {
            $("#formDialog").dialog("close");
            form[ 0 ].reset();
            allFields.removeClass( "ui-state-error" );
            errorFields.html("");
        }
    });
    $("#formDialog").dialog( "open" );
}

function createEvent()
{
    var allDay;
    if ($('#allDay').val() == 'on'){
        allDay = 'y';
    }
    else{
        allDay = 'n';
    }
    //ajax call to create
    $.ajax({
        url: "http://localhost:3000/events",
        method: "POST",
        data: {
            title: $('#eventName').val(),
            startDate: $('#startDate').val() + " " + $('#startTime').val(),
            endDate: $('#endDate').val() + " " + $('#endTime').val(),
            isAllDay: allDay,
            description: $('#eventDescription').val(),
            location: $('#eventLocation').val(),
            userId: 1 //hardcoded userId for now until we get authentication working
        },
        success: function(data){
            $("#formDialog").dialog( "close" );
            readEvents();
        }
    });
}

function readEvents()
{
    //ajax call to read all events
    $.ajax({
        url: "http://localhost:3000/events",
        method: "GET",
        success: function(data){

            if(data != null && data.length > 0)
            {
                var htmlString = "";

                for(var i=0;i<data.length;i++)
                {

                    if(data[i].title != null && data[i].title.length > 0 && data[i].startDate != null && data[i].startDate.length > 0 && data[i].endDate != null && data[i].endDate.length > 0 && data[i].description != null && data[i].description.length > 0 && data[i].isAllDay != null && data[i].isAllDay.length > 0 && data[i].location != null && data[i].location.length > 0)
                    {

                        date = new Date();

                        //check if the start date has not passed
                        if(new Date(data[i].startDate) > date)
                        {
                            //alert("This day has not passed");

                            htmlString += displayDate(data[i], "")

                        }
                        //check if the start time/date has passed, but the end date/time has not
                        else if(new Date(data[i].startDate) < date && date <= new Date(data[i].endDate))
                        {

                            htmlString += displayDate(data[i], 'currentEvent');

                        }


                    }

                }

                $("#eventsList").html(htmlString);

            }

            $("#errors").html("");

        },
        error: function(err)
        {
            //alert("Found an error");
            displayError();
        }
    });
}

function editEvent(id)
{
    $.ajax({
        url: "http://localhost:3000/events/" + id,
        method: "GET",

        success: function (data) {
            var newTitle = data.title;
            var newStartDate = DateSplitter(data.startDate);
            var newEndDate = DateSplitter(data.endDate);
            var newStartTime = timeSplitter(data.startDate);
            var newEndTime = timeSplitter(data.endDate);


            var newAllDay = data.allDay;
            var newDescription = data.description;
            var newLocation = data.location;

            $('#eventName').val(newTitle);
            $('#startDate').val(newStartDate);
            $('#startTime').val();
            $('#endDate').val(newEndDate);
            $('#startTime').val(newStartTime);
            $('#endTime').val(newEndTime);

            //endTime: $('#endTime').val();
            // $('#allDay').val(newAllDay);
            $('#eventDescription').val(newDescription);
            $('#eventLocation').val(newLocation);
            // userId: 1;

        }
    });
    //populates form for editing event
    // $('#formDialog').dialog('option', 'title', 'Edit Event');
    $("#formDialog").dialog({
        buttons: {
            "Edit Event": updateEvent,
            Cancel: function() {
                $("#formDialog").dialog( "close" );
            }
        }
        // close: function() {
        //     form[ 0 ].reset();
        //     allFields.removeClass( "ui-state-error" );
        // }
    });
    $("#formDialog").dialog('open');


}

function updateEvent(id)
{
    //ajax call to update event
    // $(function(){
        // $("#formDialog").dialog({
        //     resizable:false,
        //     height: "auto",
        //     width: 400,
        //     modal:true,
        //     buttons:{
        //         "Edit Event": function(){
                    $.ajax({
                        url: "http://localhost:3000/events",
                        method: "PUT",
                        data: {
                            title: $('#eventName').val(),
                            startDate: $('#startDate').val(),
                            //startTime: $('#startTime').val(),
                            endDate: $('#endDate').val(),
                            //endTime: $('#endTime').val(),
                            isAllDay: allDay,
                            description: $('#eventDescription').val(),
                            location: $('#eventLocation').val(),
                            userId: 1 //hardcoded userId for now until we get authentication working
                        },
                        success: function(data){
                            $("#formDialog").dialog( "close" );
                            readEvents();
                        }
                    });
                    $(this).dialog('close');

                // },
                // Cancel: function(){
                //     $(this).dialog('close');
                // }
            // }
        // });
    // });
}

function deleteEvent(id)
{
    $("#confirmDeleteDialog").dialog('open');
    //ajax call to delete event
    //create a jquery ui
    $(function(){
        $("#confirmDeleteDialog").dialog({
            resizable:false,
            height: "auto",
            width: 400,
            modal:true,
            buttons:{
                "Delete Event": function(){
                    $.ajax({
                        url:"http://localhost:3000/events/" + id,
                        type:"Delete",
                        success: function(result){
                            readEvents();
                        }
                    });
                    $(this).dialog('close');

                },
                Cancel: function(){
                    $(this).dialog('close');
                }
            }
        });
    });


}

function allDay() {

    //when all day is checked change the start date and end date of event
    $('#startTime').val("00:00");
    $('#endDate').val($('#startDate').val());
    $('#endTime').val("23:59");

}

$(document).ready(function(){

    var form = $('#formDialog').find("form");

    var allFields = $( [] ).add($('#eventName')).add($('#eventDescription')).add($('#eventLocation'));
    var errorFields = $( [] ).add($('#eventNameError'))
        .add($('#startDateError')).add($('#startTimeError')).add($('#endDateError')).add($('#endTimeError'))
        .add($('#eventDescriptionError')).add($('#eventLocationError'));

    //set up the dialogs and event listeners

    //tabs
    //http://jqueryui.com/tabs/
    $("#tabs").tabs();

    //dialogs
    $("#formDialog").dialog({
        autoOpen: false,
        width: 500,
        modal: true
    });

    $("#confirmDeleteDialog").dialog({
        autoOpen: false
    });

    //event listeners
    $("#logout").click(function(){
        alert("I logged out.");
    });
    /*$("#login").click(function(){
        alert("I logged in.");
    });*/
    $( "#createNew" ).click(function() {
        form[0].reset();
        allFields.removeClass("ui-state-error");
        errorFields.html("");
        addEvent();
    });

    $("#allDay").click(function(){
       allDay();
    });

    //auto run read events
    readEvents();

});