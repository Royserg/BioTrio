$(function() {

    const searchBar = $('#searchBar');
    const tableBody = $('tbody');

    // Initialize a timeout variable
    // https://schier.co/blog/2014/12/08/wait-for-user-to-stop-typing-using-javascript.html
    let timeout = null;
    const DELAY = 500;

    // Event triggered eachtime input field of '#searchBar' is updated
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
            if(1 < searchVal.length){
                // Fetch bookings that start with provided phone number
                $.ajax(`/api/bookings/phone/${searchVal}`, {
                    success: (bookings) => {
                        // Generate new html with data from query
                        updateTableBody(bookings)
                        console.log(bookings);
                    }
                });
            }

            // Search field is empty - should fetch most recent bookings
            if(searchVal.length === 0){
                $.ajax('/api/bookings', {
                    success: (bookings) => {
                        // Generate new html with data from query
                        updateTableBody(bookings);
                        //generate new html with data from query
                        console.log(bookings);
                    }
                })
            }
        }, DELAY);

    });


    // Function that loops over the array of Bookings objects,
    // creates row html element with all neccessary information
    // and inserts into table body
    function updateTableBody (bookings) {

        //remove all bookings made with thymeleaf
        tableBody.html("");

        for(let booking of bookings){
            const { customerPhoneNumber, id, screening } = booking;
            const row = `
                    <tr class="row">
                        <td class="col-3">${screening.movie.title}</td>
                        <td class="col-2">${screening.date}</td>
                        <td class="col-1">${screening.time.slice(0, -3)}</td>
                        <td class="col-3">${customerPhoneNumber}</td>
                        <td class="col-1">
                            <button data-bookingid=${id} class="btn btn-info">
                                <span class="fas fa-ticket-alt"></span>
                            </button>
                        </td>
                        <td class="col-1">
                            <a href="#" class="btn btn-warning">
                                <span class="fas fa-edit"></span>
                            </a>
                        </td>
                        <td class="col-1">
                            <button data-bookingid=${id} class="btn btn-danger">
                                <span class="fas fa-trash"></span>
                            </button>
                        </td>    
                    </tr>
                `;
            // append full row to the tbody
            tableBody.append(row);
        }   //for ends
    }

});



