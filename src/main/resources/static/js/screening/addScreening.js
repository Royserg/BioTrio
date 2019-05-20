
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
        console.log('request sent');
    })

}
)