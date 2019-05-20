

$(function()
{
    const movieList = $('#movie');
    const theaterList = $('#theater');
    const addScreening = $('#addScreening');
    const price = $('#price');
    const screeningDate = $('#screeningDate');
    const screeningTime = $('#screeningTime');
    const details = $('#details');


    let movieId;
    let theaterId;

    let movie;
    let theater;

    movieList.change(function() {

        // https://stackoverflow.com/a/2888447
        movieId = $(this).children(":selected").data('movie_id');

        // gets the selected movie
        $.ajax(`/api/movie/${movieId}`,   // request url
            {
                success: function (data) {// success callback function

                    movie = data;
                }
            });
    })

    theaterList.change(function() {

        // https://stackoverflow.com/a/2888447
        theaterId = $(this).children(":selected").data('theater_id');

        $.ajax(`/api/theater/${theaterId}`,   // request url
            {
                success: function (data) {// success callback function

                    theater = data;
                }
            });
    })

    addScreening.click(function() {
            let screening = {
                "movie": movie,
                "theater": theater,
                "price": price.val(),
                "date":screeningDate.val(),
                "time":screeningTime.val()
                            }

    $.ajax({
        type: "POST",
        url:"/api/screenings/add",
        dataType: "json",
        data: JSON.stringify(screening),
        contentType: "application/json; charset=utf-8",
        success: function(data){
            // refresh the table only
            $("#screeningTable").load(window.location + " #screeningTable").scrollTop("#screeningTable".scrollHeight);
            window.scrollTo(0,0);
            details.removeAttribute("open");


        }
    })
        console.log('request sent');
    })

}
)