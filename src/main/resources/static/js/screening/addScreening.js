

$(function()
{
    const movieList = $('#movie');
    const theaterList = $('#theater');
    const addScreening = $('#addScreening');
    const price = $('#price');
    const screeningDate = $('#screeningDate');
    const screeningTime = $('#screeningTime');

    let movieId;
    let theaterId;

    let cinema;
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

                    console.log(theater);
                    theater = data;


                    $.ajax(`/api/cinemas/${theater.cinemaId}`,   // request url
                        {
                            success: function (data) {// success callback function

                                cinema = data;
                                console.log(cinema);
                            }
                        })



                }
            });
    })

    //when u select a time for screening
    screeningTime.change(() => {

        console.log(cinema);
        console.log(screeningTime.val());

        //TODO: give feedback to user based on time selected
        if(screeningTime.val() < cinema.openingHour){

            console.log("too early sry");
        } else {
            console.log("good time sir");
        }

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
            // redirect to /bookings once request is successful
            $(location).attr('href','/screenings');
        }
    })
        console.log('request sent');
    })

}
)