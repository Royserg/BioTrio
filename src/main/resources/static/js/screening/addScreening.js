
$(function() {

    const movieList = $('#modalMovie');
    const theaterList = $('#modalTheater');
    const addScreening = $('#addScreeningClick');
    const price = $('#modalPrice');
    const screeningDate = $('#modalDate');
    const screeningTime = $('#modalTime');
    const submitButton = $('#submitButton');


    let goodTime = false;

    let movieId;
    let theaterId;

    let cinema;
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

        $.ajax(`/api/theaters/${theaterId}`,   // request url
            {
                success: function (data) {// success callback function

                    theater = data;
                    console.log(theater);


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


    $('.btn-success').click(function() {
        if(isAdd){

            /*
    //when u select a time for screening
    screeningTime.change(() => {

        //TODO: give feedback to user based on time selected
        if(screeningTime.val() < cinema.openingHour || screeningTime.val() > cinema.closingHour){
            goodTime = false;
        } else {
            goodTime = true;
        }
    });


    addScreening.click(function() {
      let screening = {
          "movie": movie,
          "theater": theater,
          "price": price.val(),
          "date":screeningDate.val(),
          "time":screeningTime.val()
      };

      $.ajax({
          type: "POST",
          url:"/api/screenings",
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

                    }
                })

            }) /*else {
                alert("Please choose a time within the cinemas opening hours");
            }
       })*/


            setTimeout(function(){ $('#modal').modal('hide');},100);
            console.log(isAdd);
            isAdd=false;

            $('#modal').on('hidden.bs.modal', function() {
                $(this)
                    .find("input,textarea,select")
                    .val('')
                    .end();
            })
        }
    })
        console.log('request sent');

    })});


