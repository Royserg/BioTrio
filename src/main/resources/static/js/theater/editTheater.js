$(function() {

        let editButton;
        let id;

        $('td a').on('click', function() {

            id = $(this).attr('data-theaterid');
            editButton = $(this);



            const name = editButton.parent().siblings('td')[0].innerHTML;
            const rowsNumber= editButton.parent().siblings('td')[1].innerHTML;
            const columnsNumber= editButton.parent().siblings('td')[2].innerHTML;
            const can3D = editButton.parent().siblings('td')[3].innerHTML;
            const dolby = editButton.parent().siblings('td')[4].innerHTML;

            $("#editname").val(name);
            $("#editrowsNumber").val(rowsNumber);
            $("#editcolumnsNumber").val(columnsNumber);
            $("#editcan3D").val(can3D);
            $("#editcanDolby").val(dolby);
        });


    $('#submitChangesBtn').on('click', function () {
        let theaterToEdit = {
            'id':id,
            'name': $('#editname').val(),
            'rowsNumber': $('#editrowsNumber').val(),
            'columnsNumber': $('#editcolumnsNumber').val(),
            'can3d': $('#editcan3D').is(':checked'),
            'dolby': $('#editcanDolby').is(':checked')

        };
        console.log(theaterToEdit);

        $.ajax({

            type: 'POST',
            url: `/theaters/edit/${id}`,
            dataType: 'json',
            data: JSON.stringify(theaterToEdit),
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                /*editButton.parent().siblings('td')[0].innerHTML = theaterToEdit.name;
                editButton.parent().siblings('td')[1].innerHTML = theaterToEdit.rowsNumber;
                editButton.parent().siblings('td')[2].innerHTML = theaterToEdit.columnsNumber;
                editButton.parent().siblings('td')[3].innerHTML= theaterToEdit.can3d;
                editButton.parent().siblings('td')[4].innerHTML= theaterToEdit.canDolby;
                */
                $(location).attr('href','/theaters');
                console.log(theaterToEdit);

            }

        });
    });




    }
);