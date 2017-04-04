/**
 * Created by inet2005 on 4/3/17.
 */

/*Helpers*/

function DateConverter(data)
{

    var date = new Date(data);
    var stringDate = date.toDateString();

    var minutes = "";
    if(date.getMinutes() == 0)
    {
        minutes =  "00";
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
            //$("#formDialog").dialog( "close" );
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
                        htmlString +="<td><p><span class='glyphicon glyphicon-floppy-disk'></span></p>";
                        htmlString += "<p><span class='glyphicon glyphicon-trash'></span></p></td></tr>";


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

function editEvent()
{
    //populates form for editing event
}

function updateEvent()
{
    //ajax call to update event
}

function confirmDeletionOfEvent()
{
    //comfirm that the user wishes to delete event
}

function deleteEvent()
{
    //ajax call to delete event
}

function allDay() {

    //when all day is checked change the start date and end date of event

    var dateObj = new Date();
    var month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    var day = ("0" + (dateObj.getDate())).slice(-2);
    var year = dateObj.getUTCFullYear();

    newdate = year + "-" + month + "-" + day;

    $('#endDate').val(newdate);
    alert($('#endTime').val());
    // var meridiem = 'AM';
    // var d = new Date(),
    //     h = d.getHours(),
    //     m = d.getMinutes();
    // if(h < 10) h = '0' + h;
    // else meridiem = 'PM';
    // if(m < 10) m = '0' + m;
    // var time = h + ':' + m + " " + meridiem;
    //$('#endTime').val(time);
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