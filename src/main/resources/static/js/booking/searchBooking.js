$(function() {

    const searchBar = $('#searchBar');
    const tableBody = $('tbody');

    // Initialize a timeout variable
    // https://schier.co/blog/2014/12/08/wait-for-user-to-stop-typing-using-javascript.html
    let timeout = null;
    const DELAY = 500;

    // Event triggered each time input field of '#searchBar' is updated
    searchBar.bind('input', function() {
        // Save typed value into input field
        const searchVal = searchBar.val();

        // Clear timeout if it has already been set.
        // prevents previous task from executing if
        // time passed is less than DELAY;
        clearTimeout(timeout);

        // Set action to be fired after value in input changed and delay passed
        timeout = setTimeout(function() {

            // Johan's if statement below translated into normal => if (searchVal.length > 1)
            if(0 < searchVal.length){
                // Fetch bookings that start with provided phone number
                $.ajax(`/api/bookings/phone/${searchVal}`)
                  .done(bookings => {
                      // Generate new html with data from query
                      updateTableBody(bookings)
                  })
            };

            // Search field is empty - should fetch most recent bookings
            if(searchVal.length === 0){
                $.ajax('/api/bookings')
                  .done(bookings => {
                      // Generate new html with data from query
                      updateTableBody(bookings);
                  });
            };
        }, DELAY);

    });


    // Function that loops over the array of Bookings objects,
    // creates row html element with all necessary information
    // and inserts into table body
    function updateTableBody (bookings) {
        //remove all bookings made with thymeleaf
        tableBody.html("");

        for(let booking of bookings){
            const $row = createBookingRow(booking.id, booking)
            // append full row to the tbody
            tableBody.append($row);
        }
    }

});



