$(function() {

        let editButton;
        let id;

        $('#theaterTable').on('click','td a', function() {

            console.log("klikkede")

            id = $(this).attr('data-theaterid');
            editButton = $(this);



            const name = editButton.parent().siblings('td')[0].innerHTML;
            const rowsNumber= editButton.parent().siblings('td')[1].innerHTML;
            const columnsNumber= editButton.parent().siblings('td')[2].innerHTML;
            const can3D = editButton.parent().siblings('td')[3].innerHTML;
            const dolby = editButton.parent().siblings('td')[4].innerHTML;

            $("#nameField").val(name);
            $("#rowsNumberField").val(rowsNumber);
            $("#columnsNumberField").val(columnsNumber);
            $("#is3D").val(can3D);
            $("#isDolby").val(dolby);
        });


    $('#submitChangesBtn').on('click', function () {
        let theaterToEdit = {
            'id':id,
            'name': $('#nameField').val(),
            'rowsNumber': $('#rowsNumberField').val(),
            'columnsNumber': $('#columnsNumberField').val(),
            'can3d': $('#is3D').is(':checked'),
            'dolby': $('#isDolby').is(':checked')

        };
        console.log(theaterToEdit);

        $.ajax({

            type: 'PUT',
            url: `/theaters/edit/${id}`,
            dataType: 'json',
            data: JSON.stringify(theaterToEdit),
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
               // $(location).attr('href','/theaters');
                editButton.parent().siblings('td')[0].innerHTML = theaterToEdit.name;
                editButton.parent().siblings('td')[1].innerHTML = theaterToEdit.rowsNumber;
                editButton.parent().siblings('td')[2].innerHTML = theaterToEdit.columnsNumber;
                editButton.parent().siblings('td')[3].innerHTML = theaterToEdit.can3d;
                editButton.parent().siblings('td')[4].innerHTML = theaterToEdit.dolby;
            }

        });
    });




    }
);