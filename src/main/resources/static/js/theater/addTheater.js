

$(function() {
    let isEdit = false;

    const name = $('#NameField');
    const rows = $('#RowsField');
    const columns = $('#ColumnsField');
    const is3d = $('#is3D');
    const isDolby = $('#isDolby');




    $('html body').off('click').on('click', '#submitTheater', function (e) {

        if (isEdit) {

            edit();

            isEdit = false;

        } else {

            add(e);

            isEdit = false;

        }

        function add(e) {

            e.preventDefault();

            let theater = {
                "cinemaId": 1,
                "name": name.val(),
                "rowsNumber": rows.val(),
                "columnsNumber": columns.val(),
                "can3d": is3d.is(':checked'),
                "dolby": isDolby.is(':checked')
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
                .done(function (theaterId) {

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
                                                     data-target="#TheaterModel"
                                                     data-theaterid=${theaterId}><span class="fas fa-edit"></span></a></td>
                                                     <td class="col-1">
                                    <button data-theaterid=${theaterId} data-theatername=${theater.name}" class="btn btn-danger">
                                        <span class="fas fa-trash"></span>
                                    </button>
                                </td>
                        </tr>`

                    //appends the latest movie to the table
                    $('#theaterTable tbody').append(newRow);

                    setTimeout(function () {
                        $('#TheaterModal').modal('hide');
                    }, 100);

                    //Scroll to bottom of container
                    $('#table-container').scrollTop($('#table-container')[0].scrollHeight);


                });
        }
    });
});