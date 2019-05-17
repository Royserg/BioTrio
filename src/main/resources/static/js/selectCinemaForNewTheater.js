$(function()
{
const cinemaList = $('#cinema')

let cinemaID;

let cinema;

cinemaList.change(function() {

    // https://stackoverflow.com/a/2888447
    cinemaID = $(this).children(":selected").data('cinema_id');

    // gets the selected movie
    $.ajax(`/api/cinemas/${id}`,   // request url
        {
            success: function (data) {// success callback function

                cinema = data;
            }
        });
})})