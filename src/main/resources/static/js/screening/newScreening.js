
$(function () {

    //stops carousel from auto sliding
    $('.carousel').carousel({
        interval: false
    });

    const movieTable = $('#movieTable');
    const screeningTableBody = $('#screeningTable').children('tbody');
    const modal = $('#screeningModal');
    const modalMovie = $('#modalScreeningMovie');
    const modalTheater = $('#modalTheater');
    const modalPrice = $('#modalPrice');
    const modalDate = $('#modalDate');
    const modalTime = $('#modalTime');
    const addButton = $('#addButton');
    const submitButton = $('#submitButton');
    const prevButton = $('#prev');

    let movieId;
    let movieTitle;
    let theater;
    let screeningsList;
    let tr;
    let isAdd;
    let screeningId;
    let newRow;

    movieTable.on('click','.title', function () {

        let row = $(this).closest('tr');
        movieId = row.attr('data-movieid');
        movieTitle = row.attr('data-movieTitle');

        $('.carousel').carousel('next');

        $('h4').text('Screenings');
        addButton.text("Add Screening");
        addButton.removeClass("add-movie");
        addButton.addClass("add-scr");
        prevButton.removeClass("invisible");

        populateScreeningTable(movieId);

    })

    //https://stackoverflow.com/a/28108858
    $(document).on('click','#addButton.add-scr', function() {
        clearModal(modal);
        isAdd = true;
        modalMovie.val(movieTitle);
        $('.modal-title').text('Add Screening');
        modal.modal("show");

    });

    screeningTableBody.on('click','.btn-warning', function () {

        clearModal(modal);
        isAdd = false;

        tr = $(this).closest('tr');
        screeningId = tr.data('screeningid');

        $('.modal-title').text('Edit Screening');
        populateEditModal(screeningId);
        modal.modal("show");

    });

    function populateScreeningTable(movieId){

        $.getJSON(`/api/movies/${movieId}/screenings`)
            .done(function(response) {

                //edits the date attribute of the response
                //so that it shows only the hour and minutes without seconds
                //in order to be displayed in the screenings table
                screeningsList = response.map(screening => { return { ...screening, time: screening.time.slice(0,-3) } });

                    screeningsList.forEach(function (s) {
                        buildTableRow(s);
                        screeningTableBody.append(newRow);
                    })
            })
    }
    function populateEditModal(screeningId){

        $.getJSON(`/api/screenings/${screeningId}`)
            .done(function(response) {

                     // s = response.map(screening => { return { ...screening, time: screening.time.slice(0,-3) } });
                    let s = response;
                    modalMovie.val(movieTitle);
                    modalTheater.val(s.theater.name);
                    modalDate.val(s.date);
                    modalTime.val(s.time).slice(0,-3);
                    modalPrice.val(s.price);

                    theater = s.theater;
                }
            )
    }
    modalTheater.change(function () {

        // https://stackoverflow.com/a/2888447
        const theaterId = $(this).children(":selected").data('theater_id');

        theaterList.forEach(function (t) {
          if(t.id==theaterId){
              theater=t;
          }
        })
    })

    function buildTableRow(screening) {
         newRow = `<tr class="d-flex" data-screeningid=${screening.id}>
                                <td class="col-2 title"> ${movieTitle} </td>
                                <td class="col-2"> ${screening.theater.name} </td>
                                <td class="col-2"> ${screening.date} </td>
                                <td class="col-2"> ${screening.time} </td>
                                <td class="col-2"> ${screening.price} DKK</td>
                                <td class="col-1">
                                <button id = "editButton" 
                                 class="btn btn-warning">
                                  <span class="fas fa-edit"></span>
                              </button>
                          </td>
                          <td class="col-1">
                              <button class="btn btn-danger">
                                  <span class="fas fa-trash"></span>
                              </button>
                          </td>
                            </tr> `;
    }

     function clearModal (modal) {

        modal.on('hidden.bs.modal', function() {
            $(this)
                .find("input,textarea,select")
                .val('')
                .end();
        })
    }
//---------------
    submitButton.click(function() {
        let screening = {
            "movieId": movieId,
            "theater": theater,
            "price": modalPrice.val(),
            "date": modalDate.val(),
            "time": modalTime.val()
        }

        if(isAdd) {
            $.ajax({
                type: "POST",
                url: "/api/screenings",
                dataType: "json",
                data: JSON.stringify(screening),
                contentType: "application/json; charset=utf-8",
                success: function (id) {
                    screening["id"]=id;
                    buildTableRow(screening);
                    screeningTableBody.append(newRow);
                    screeningTableBody.scrollTop($('#screeningTable tbody')[0].scrollHeight);
                }
            })
        }
        else {

            screening["id"]=screeningId;

            $.ajax({
                type: 'PUT',
                url: `api/screenings/${screening.id}`,
                dataType: 'html',
                data: JSON.stringify(screening),
                contentType: 'application/json; charset=utf-8',
            })
                .done(function () {
                    buildTableRow(screening);
                    tr.replaceWith(newRow);
                })
        }

         setTimeout(function(){ modal.modal('hide');},100);
    })



    prevButton.click(function () {
        $('.carousel').carousel('prev');
        prevButton.addClass("invisible");
        $('h4').text('Movies');
        addButton.text("Add Movie");
        addButton.removeClass("add-scr");
        addButton.addClass("add-movie");
        screeningTableBody.html("");
    })

    screeningTableBody.on('click','.title', function () {

        $('.carousel').carousel('prev');
        prevButton.addClass("invisible");
        $('h4').text('Movies');
        addButton.text("Add Movie");
        addButton.removeClass("add-scr");
        addButton.addClass("add-movie");
        screeningTableBody.html("");

    })

});