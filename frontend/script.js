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

/*CRUD functions*/

function addEvent()
{

    var form = $('#formDialog').find("form");

    var allFields = $( [] ).add($('#eventName')).add($('#eventDescription')).add($('#eventLocation'));

    $('#formDialog').dialog('option', 'title', 'Create new Event');
    $("#formDialog").dialog({
        buttons: {
            "Create new Event": createEvent,
            Cancel: function() {
                $("#formDialog").dialog( "close" );
            }
        },
        close: function() {
            form[ 0 ].reset();
            allFields.removeClass( "ui-state-error" );
        }
    });
    $("#formDialog").dialog( "open" );
    //populates form for adding event
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

                        var startDate = DateConverter(data[i].startDate);
                        var endDate = DateConverter(data[i].endDate);

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

                        //left wing
                        htmlString += "<tr><td class='leftWing'><p>";
                        htmlString += data[i].title;
                        htmlString += "</p><p>";
                        htmlString += data[i].description;
                        htmlString += "</p></td>";

                        //right wing
                        htmlString += "<td class='rightWing'><p>";
                        htmlString += startDate + " - " + endDate;
                        htmlString += "</p><p>";
                        htmlString += data[i].location;
                        htmlString += "</p></td>";

                        //actions
                        htmlString +="<td><p><span onclick='editEvent(" + data[i].eventId +");' class='glyphicon glyphicon-pencil'></span></p>";
                        htmlString += "<p><span onclick='deleteEvent(" + data[i].eventId +");' class='glyphicon glyphicon-trash'></span></p></td></tr>";


                    }

                }

                $("#eventsList").html(htmlString);

            }

        },
        error: function(err)
        {
            alert("Found an error");
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
            var newStartDate = data.startDate;
            var newEndDate = data.endDate;
            var newAllDay = data.allDay;
            var newDescription = data.description;
            var newLocation = data.location;

            $('#eventName').val(newTitle);
            $('#startDate').val(newStartDate);
            //$('#startTime').val();
            $('#endDate').val(newEndDate);
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

function confirmDeletionOfEvent()
{
    //comfirm that the user wishes to delete event
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

    $('#endDate').val($('#startDate').val());
    $('#endTime').val("23:59");

}

$(document).ready(function(){

    //set up the dialogs and event listeners

    //tabs
    //http://jqueryui.com/tabs/
    $("#tabs").tabs();

    //dialogs
    $("#formDialog").dialog({
        autoOpen: false,
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
        addEvent();
    });

    $("#allDay").click(function(){
       allDay();
    });

    //auto run read events
    readEvents();

});