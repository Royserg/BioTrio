$(function() {
    console.log("loaded jquery");
    let bookings = [];
    let screenings = [];
    let tickets = [];
    let movies = [];

    // get today
    let date = new Date();
    let month = date.getMonth()+1;
    let day = date.getDate();
    let today = date.getFullYear() + '-' +
        (month<10 ? '0' : '') + month + '-' +
        (day<10 ? '0' : '') + day;

    console.log(today);
    let currentDay = date.getDay();
    console.log("today ", currentDay);


    let screeningCount = 0;
    let screeningDate;
    let futureScreening = 0;

    // Get all screenings, store in 'screenings' array
    $.ajax(`/api/screenings/`,
        {
            // success callback function
            success: (data) => {

                $.each(data, (index, screening) => {
                    screenings.push(screening);

                    // calculate the total number of screenings
                    screeningCount += 1;

                    // calculate the total number of future screenings
                    screeningDate = screening.date;
                    if(new Date(screeningDate >= today)) {
                        futureScreening += 1;
                    }
                });

                // display the outcome
                $('.total-screenings').text(screeningCount);
                $('.future-screenings').text(futureScreening);

            }
        });

    let ticketCount = 0, bookingCount = 0, ticketPrice = 0, totalSales = 0;
    //Get all bookings, store in 'bookings' array
    $.ajax(`/api/bookings/`,
        {
            // success callback function
            success: (data) => {

                $.each(data, (index, booking) => {
                    bookings.push(booking);

                    // calculate the total number of bookings
                    bookingCount += 1;

                    // put movieID into movie array
                    movies.push(booking.movie);
                    console.log('movie ', booking.movie);
                    console.log('movies ', movies);

                    // get the ticket price for each booking
                    ticketPrice = booking.screening.price;

                    // loop through each booking, get the amount of tickets
                    $.each(booking.tickets, (index, ticket) => {

                        tickets.push(ticket);
                        ticketCount += 1;

                    });

                    // calculate the total ticket sales
                    totalSales += ticketPrice * ticketCount;

                });

                // display the outcome
                $('.total-bookings').text(bookingCount);
                $('.total-tickets').text(ticketCount);
                $('.total-sales').text(totalSales);

                // get the most booked movie
                // mode(movies);
                // console.log('mode movie ', mode(movies));

            }
        });

    // function mode(movies) {
        // as result can be bimodal or multi-modal,
        // the returned result is provided as an array
        // let modes = [], count = [], i, m, maxIndex = 0;
        //
        // for (i = 0; i < movies.length; i += 1) {
        //     m = movies[i];
        //     count[m] = (count[m] || 0) + 1;
        //     if (count[m] > maxIndex) {
        //         maxIndex = count[m];
        //     }
        // }
        //
        // for (i in count)
        //     if (count.hasOwnProperty(i)) {
        //         if (count[i] === maxIndex) {
        //             modes.push(Number(i));
        //         }
        //     }
    //
    //     let count = 1, i, movieTitle, movieTitle1;
    //
    //     for(i = 0; i < movies.length; i+=1) {
    //         movieTitle = movies[i].title;
    //         console.log('movieTitle ', movieTitle);
    //         movieTitle1 = movies[i+1].title;
    //
    //         if(movieTitle === movieTitle1) {
    //             count += 1;
    //         } else {
    //
    //         }
    //     }
    //
    //     return count;
    // }


});
