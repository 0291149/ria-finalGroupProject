/**
 * Created by inet2005 on 4/3/17.
 */

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

    //event listeners
    $("#logout").click(function(){
        alert("I logged out.");
    });

    //auto run read events
    readEvents();

});