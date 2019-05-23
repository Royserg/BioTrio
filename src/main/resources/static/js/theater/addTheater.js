$(function()
    {

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
            $.ajax(`/api/cinemas/${cinemaId}`,   // request url
                {
                    success: function (data) {// success callback function

                        cinema = data;
                    }
                });
        })


        $('#submitNewTheater').unbind().on('click', function (e) {

            e.preventDefault();

            let theater= {



                "cinemaId": 1,

                "name": name.val(),
                "rowsNumber": rows.val(),
                "columnsNumber": columns.val(),
                "can3d":is3d.is(':checked'),
                "dolby":isDolby.is(':checked')
            }
            name.val('');
            rows.val('');
            columns.val('');
            $("#change3D").prop("checked", false);
            $("#changeDolby").prop("checked", false);

           $.ajax({
               type: "POST",
               url: "/api/theaters",
               dataType: "json",
               data: JSON.stringify(theater),
               contentType: "application/json; charset=utf-8"
           })
               .done(function(theaterId){

                   console.log(theaterId);
                   let newRow = `<tr class="d-flex">
                        <td class="col-2">${theater.name}</td>
                        <td class="col-2">${theater.rowsNumber}</td> 
                        <td class="col-2">${theater.columnsNumber}</td>
                        <td class="col-2">${theater.can3d}</td>
                        <td class="col-2">${theater.dolby}</td>
                        <td class="col-1"><a href="#"
                                                     id = "editButton"
                                                     class="btn btn-warning"
                                                     data-toggle="modal"
                                                     data-target="#editTheater"
                                                     data-theaterid=${theaterId}><span class="fas fa-edit"></span></a></td>
                                                     <td class="col-1">
                                    <button data-theaterid=${theaterId} data-theatername=${theater.name}" class="btn btn-danger">
                                        <span class="fas fa-trash"></span>
                                    </button>
                                </td>
                        </tr>`

                   //appends the latest movie to the table
                   $('#theaterTable tbody').append(newRow);

                   //Scroll to bottom of container
                   $('#table-container').scrollTop($('#table-container')[0].scrollHeight);


               });

        });

})