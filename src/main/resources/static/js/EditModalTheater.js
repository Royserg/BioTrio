$(function() {

        let editButton;
        let id;

        $('td a').on('click', function() {

            id = $(this).attr('data-theaterid');
            editButton = $(this);
            //$('.').html('');

            const name = editButton.parent().siblings('td')[0].innerHTML;
            const rowsNumber= editButton.parent().siblings('td')[1].innerHTML;
            const columnsNumber= editButton.parent().siblings('td')[2].innerHTML;
            const can3D = editButton.parent().siblings('td')[3].innerHTML;

            $("#editName").val(name);
            $("#editrowsNumber").val(rowsNumber);
            $("#editcolumnsNumber").val(columnsNumber);
            $("#editcan3D").val(can3D);
        });


    $('#submitChangesBtn').on('click', function () {
        let theaterToEdit = {
            'name': $('#editname').val(),
            'rowsNumber': $('#editrowsNumber').val(),
            'columnsNumber': $('#editcolumnsNumber').val(),
            'can3d': $('#editcan3D').is(':checked')

        };
        console.log(theaterToEdit);

        $.ajax({

            type: 'POST',
            url: `/theaters/edit/${id}`,
            dataType: 'json',
            data: JSON.stringify(theaterToEdit),
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                editButton.parent().siblings('td')[0].innerHTML = theaterToEdit.name;
                editButton.parent().siblings('td')[1].innerHTML = theaterToEdit.rowsNumber;
                editButton.parent().siblings('td')[2].innerHTML = theaterToEdit.columnsNumber;
                editButton.parent().siblings('td')[3].innerHTML= theaterToEdit.can3d;
            }

        });
    });




    }
);