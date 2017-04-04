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
    //populates form for adding event
}

function createEvent()
{
    //ajax call to create
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

$(document).ready(function(){

    //set up the dialogs and event listeners

    //dialogs
    $("#formDialog").dialog({
        autoOpen: false
    });

    $("#confirmDeleteDialog").dialog({
        autoOpen: false
    });

    //event listeners
    $("#logout").click(function(){
        alert("I logged out.");
    });

    //auto run read events
    readEvents();

});