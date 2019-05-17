// TODO: This file at the moment is useless because doesn't do anything, read below

$(function() {
  // TODO:-> There is no element with id = cinema
  const cinemaList = $('#cinema');

  let cinemaID;
  let cinema;

  // TODO:-> This event is not triggered, probably because cinemaList doesn't point to any element (no element with id = cinema)
  cinemaList.change(function() {
      console.log('changing');

      // https://stackoverflow.com/a/2888447
      cinemaID = $(this).children(":selected").data('cinema_id');

      // gets the selected movie
      $.ajax(`/api/cinemas/${id}`,   // request url
        {
          success: function (data) {// success callback function

            cinema = data;
          }
        });
    }
)})