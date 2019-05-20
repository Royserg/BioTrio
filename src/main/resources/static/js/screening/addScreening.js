
$(function()
{
    const movieList = $('#movie');
    const theaterList = $('#theater');
    const addScreening = $('#addScreening');
    const price = $('#price');
    const screeningDate = $('#screeningDate');
    const screeningTime = $('#screeningTime');

    let goodTime = false;

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

        //TODO: give feedback to user based on time selected
        if(screeningTime.val() < cinema.openingHour || screeningTime.val() > cinema.closingHour){
            goodTime = false;
        } else {
            goodTime = true;
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


            if(goodTime) {
                $.ajax({
                    type: "POST",
                    url: "/api/screenings/add",
                    dataType: "json",
                    data: JSON.stringify(screening),
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        let newRow = `<tr class="d-flex">
                        <td class="col-2" ${screening.movie.title} />
                        <td class="col-2" ${screening.theater.name}/>
                        <td class="col-2" ${screening.date}/>
                        <td class="col-2" ${screening.time}/>
                        <td class="col-2" ${screening.price}/>
                        <td class="col-1">`

                        //appends the latest movie to the table
                        $('#screeningTable tbody').append(newRow);

                        //scroll to the bottom of the table
                        $('#screeningTable').scrollTop($('#screeningTable')[0].scrollHeight);

                        //scroll to the top of the page
                        window.scrollTo(0,0);

                    }
                })

            } else {
                alert("Please choose a time within the cinemas opening hours");
            }
       })

    })

});