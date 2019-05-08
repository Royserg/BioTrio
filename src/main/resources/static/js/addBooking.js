


$(function() {

  const movieList = $('#movieList');
  const timeList = $('#screeningTimes');
  const screeningList = $('#screeningList');
  const seatsContainer = $('#seats');
  const phoneNum = $('#phoneNum');
  const bookButton = $('#bookButton');
  let screeningId;
  let seatsArrangement;

  let selectedSeats = [];
  let screeningsData = [];

  // onClick event for each movie in the list
  movieList.on('click', 'a', function() {

    const movieId = $(this).data('id');
    // once movie clicked - clear screenings and times and seats
    screeningList.html('');
    timeList.html('');
    seatsContainer.html('');

    $.ajax(`/api/screenings/${movieId}`,   // request url
      {
        success: function (data) {// success callback function
          // save Screening data for the movie in the array
          screeningsData = data;
          // filtrate the data array and remove duplicates
          const datesList = data.map(screening => screening.date);
          // convert datesList into Set and back to array
          const uniqueDates = [...new Set(datesList)];

          $.each(uniqueDates, function (index, screening) {
            screeningList.append(`<a href="#" class="list-group-item list-group-item-action">${screening}</a>`)
          })
        }
      });

    }
  )

  // OnClick event for each date
  screeningList.on('click', 'a', function() {

    const clickedDate = $(this).text();
    // clear time list and seats
    timeList.html('');
    seatsContainer.html('');

    screeningsData.forEach((screening) => {
      if(screening.date === clickedDate){
        timeList.append(`<a href="#" data-screening-id="${screening.id}" data-theater-id="${screening.theaterId}" class="list-group-item list-group-item-action">${screening.time}</a>`)
      }
    })

  })

  // OnClick event for a screening Time
  timeList.on('click', 'a', function() {
    screeningId = $(this).data('screening-id');
    const theaterId = $(this).data('theater-id');

    let theaterData;
    let ticketData;

    // clear seats container
    seatsContainer.html('');

  //  Get data about the theater(column and rows) and all tickets for the screening(calculate reserved seats)
    $.when(
      $.ajax(`/api/theaters/${theaterId}`, {
        success: function(data){
          theaterData = data;
        }
      }),
      $.ajax(`/api/tickets/reservedSeats/${screeningId}`, {
          success: function(data){
            ticketData = data;
          }
      })
    ).then(function() {
      const rows = theaterData.rowsNumber;
      const columns = theaterData.columnsNumber;

      seatsArrangement = new Array(rows);
      for (let i = 0; i < rows; i++) {
        seatsArrangement[i] = new Array(columns);
      }

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          // set all seats to be available a.k.a true
          seatsArrangement[i][j] = true;
        }
      }

      // set taken seats -> seats start from 1 that's why need to minus them
      ticketData.forEach(function(ticket) {
        seatsArrangement[ticket.rowNo - 1][ticket.columnNo - 1] = false;
      });


      $.each(seatsArrangement, function(rowIndex, row) {
        seatsContainer.append(`<div id=row-${rowIndex} class="d-flex justify-content-center align-items-center"></div>`);

        $.each(row, function(columnIndex, column) {
          $(`#row-${rowIndex}`)
            .append(`<span data-row="${rowIndex}" data-column="${columnIndex}" style="font-size: 1.4em" class="seat ${column ? 'far fa-square' : 'fas fa-square'} mx-2 my-2 ${column ? '' : 'text-danger'}"></span>`)
        })
      })

    })


  })


  // Select and unselect seats.
  seatsContainer.on('click', 'span', function(){

      let row = this.getAttribute('data-row');
      let column = this.getAttribute('data-column');


        if (!this.classList.contains('selectedSeat')){

          if(selectedSeats.length < 4) {

              $(this).addClass("text-success fas fa-square selectedSeat");

              selectedSeats.push({'row': row, 'column': column});
              seatsArrangement[row][column] = false;

          } else {

              alert("You can't select more than 4 seats!");

          }

        } else {

            $(this).removeClass("text-success fas fa-square selectedSeat");
            $(this).addClass("far fa-square");

            let index = selectedSeats.findIndex(x => (x.row === row) && (x.column === column));

            selectedSeats.splice(index, 1);

        }

      console.log(selectedSeats);

    })

    bookButton.on('click', () => {

      booking = {
        "screeningId": screeningId,
        "phoneNumber": phoneNum.val(),
          "tickets": selectedSeats
      }

      //$.post()
        //TODO

    })


    //TODO: count selected seats, calculate the ticket price -> controller or... sth

})








