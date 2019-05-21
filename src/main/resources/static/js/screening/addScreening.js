
$(function()
{
    const movieList = $('#modalMovie');
    const theaterList = $('#modalTheater');
    const addScreening = $('#addScreeningClick');
    const price = $('#modalPrice');
    const screeningDate = $('#modalDate');
    const screeningTime = $('#modalTime');
    const submitButton = $('#submitButton');

    let movieId;
    let theaterId;

    let movie;
    let theater;

    let isAdd=false;

    addScreening.click(function () {

        $('.modal-title').text('Add Screening');
        submitButton.removeClass('btn-warning');
        submitButton.addClass('btn-success')
        $("#modal").modal("show");
        isAdd = true;
        console.log(isAdd);


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

    $('.btn-success').click(function() {
        if(isAdd){
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
        success: function(id){

            let newRow = `<tr class="d-flex">
                        <td class="col-2">${screening.movie.title} </td>
                        <td class="col-2">${screening.theater.name}</td>
                        <td class="col-2">${screening.date}</td>
                        <td class="col-2">${screening.time}</td>
                        <td class="col-2">${screening.price}</td> <td class="col-1">
                            <button id = "editButton" 
                               class="btn btn-warning"
                               data-toggle="modal"
                               data-target="#modal"
                               data-screeningid="${id}">
                                <span class="fas fa-edit"></span>
                            </button>
                        </td>
                        <td class="col-1">
                            <button data-screeningid="${id}",
                                    data-screeningmovie="${screening.movie.title}"
                                    class="btn btn-danger">
                                <span class="fas fa-trash"></span>
                            </button>
                        </td>
                    </tr>`
                console.log("triggered")
            //appends the latest movie to the table
            $('#screeningTable tbody').append(newRow);

            //scroll to the bottom of the table
            $('#screeningTable').scrollTop($('#screeningTable')[0].scrollHeight);

            //scroll to the top of the page
            window.scrollTo(0,0);

            setTimeout(function(){ $('#modal').modal('hide');},100);
            console.log(isAdd);
            isAdd=false;
        }
    })}
        console.log('request sent');

    })
    });
}
)