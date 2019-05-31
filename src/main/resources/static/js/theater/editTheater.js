$(function() {


    let editButton;
    let id;
    let isEdit;



    $('#theaterTable').on('click', 'td .btn-warning', function () {
        console.log("Pressing Edit")
        id = $(this).attr('data-theaterid');
        editButton = $(this);

        const name = editButton.parent().siblings('td')[0].innerHTML;
        const rowsNumber = editButton.parent().siblings('td')[1].innerHTML;
        const columnsNumber = editButton.parent().siblings('td')[2].innerHTML;
        const can3D = editButton.parent().siblings('td')[3].innerHTML;
        const dolby = editButton.parent().siblings('td')[4].innerHTML;

        //Populate the modal fields with current info

        $("#NameField").val(name);
        $("#RowsField").val(rowsNumber);
        $("#ColumnsField").val(columnsNumber);
        $("#is3D").prop("checked", can3D === "true" ? true : false);
        $("#isDolby").prop("checked", dolby === "true" ? true : false);

        isEdit = true;


    });

    //This determines wether the button pressed is add or edit
    $('html body').off('click').on('click', '#submitTheater', function (e) {

        if (isEdit) {

            edit();

            //isEdit = false;

        } else {

            add(e);

            isEdit = false;

        }

        function edit() {
            let theaterToEdit = {
                'id': id,
                'cinemaId': 1,
                'name': $('#NameField').val(),
                'rowsNumber': $('#RowsField').val(),
                'columnsNumber': $('#ColumnsField').val(),
                'can3d': $('#is3D').is(':checked'),
                'dolby': $('#isDolby').is(':checked')

            };
            //Send the newly entered info
            $.ajax({

                type: 'PUT',
                url: `/api/theaters/${id}`,
                dataType: 'json',
                data: JSON.stringify(theaterToEdit),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {

                    editButton.parent().siblings('td')[0].innerHTML = theaterToEdit.name;
                    editButton.parent().siblings('td')[1].innerHTML = theaterToEdit.rowsNumber;
                    editButton.parent().siblings('td')[2].innerHTML = theaterToEdit.columnsNumber;
                    editButton.parent().siblings('td')[3].innerHTML = theaterToEdit.can3d;
                    editButton.parent().siblings('td')[4].innerHTML = theaterToEdit.dolby;

                    editButton.closest('tr').css('background', 'gold');
                    editButton.closest('tr').fadeOut(300, function () {
                        $(this).fadeIn(300);
                        $(this).css('background', 'white');
                        setTimeout(function () {
                            $('#TheaterModal').modal('hide');
                        }, 100);

                    });
                }
        });
        }
    });
});