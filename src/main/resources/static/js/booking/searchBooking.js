$(function() {

    const searchBar = $('#searchBar');
    //let searchVal = "";
    const tableBody = $('tbody');

    //event triggered eachtime input field of '#searchBar' is updated
    searchBar.bind('input', function() {

        const searchVal = searchBar.val();
        //console.log("inputs: " + searchVal)

        // if (searchVal.length > 1)
        if(1 < searchVal.length){

            $.ajax(`/api/bookings/phone/${searchVal}`, {
                success: (data) => {

                    updateTableBody(data)
                    //generate new html with data from query
                    console.log(data);
                }
            })

        }

        if(searchVal.length === 0){

            $.ajax('/api/bookings', {
                success: (data) => {

                    updateTableBody(data)

                    //generate new html with data from query
                    console.log(data);

                }
            })
        }

    })

    function updateTableBody (data) {

        //remove all bookings made with thymeleaf
        tableBody.html("");

        for(let booking of data){
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



})



