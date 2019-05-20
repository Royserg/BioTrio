$(function()
    {
        const addTheater= $('#addTheater');

        const cinemaList= $('#cinemaSelect');
        const name= $('#addNameField');
        const rows= $('#addRowsField');
        const columns= $('#addColumnsField');
        const is3d= $('#change3D');
        const isDolby= $('#changeDolby');


        let cinemaId;

        let cinema;

        cinemaList.change(function() {

            cinemaId= $(this).children(":selected").data('cinema_id');

            // gets the selected cinema
            $.ajax(`/api/cinema/${cinemaId}`,   // request url
                {
                    success: function (data) {// success callback function

                        cinema = data;
                    }
                });
        })


        addTheater.click(function() {
            let theater= {

                "cinemaId": 1,

                "name": name.val(),
                "rowsNumber": rows.val(),
                "columnsNumber": columns.val(),
                "can3d":is3d.is(':checked'),
                "dolby":isDolby.is(':checked')
            }

console.log(theater);
           $.ajax({
                type: "POST",
                url:"/theaters",
                dataType: "json",
                data: JSON.stringify(theater),
                contentType: "application/json; charset=utf-8",
                success: function(data){

                    let newRow = `<tr class="d-flex">
                        <td class="col-2">${theater.name}</td>
                        <td class="col-2">${theater.rowsNumber}</td> 
                        <td class="col-2"> ${theater.columnsNumber}</td>
                        <td class="col-2">${theater.can3d}</td>
                        <td class="col-2">${theater.dolby}</td>
                        <td class="col-1"><a href="#"
                                                     id = "editButton"
                                                     class="btn btn-warning"
                                                     data-toggle="modal"
                                                     data-target="#editTheater"
                                                     th:attr="data-theaterid=${data.id}"><span class="fas fa-edit"></span></a></td>
                                                     <td class="col-1">
                                    <button th:attr="data-theaterid=${data.id}, data-theatername=${data.name}" class="btn btn-danger"  >
                                        <span class="fas fa-trash"></span>
                                    </button>
                                </td>
                        </tr>`

                    //appends the latest movie to the table
                    $('#theaterTable tbody').append(newRow);

                    //scroll to the bottom of the table
                    $('#theaterTable').scrollTop($('#theaterTable')[0].scrollHeight);

                    //scroll to the top of the page
                    window.scrollTo(0,0);

                }
            })
        })

    }
)