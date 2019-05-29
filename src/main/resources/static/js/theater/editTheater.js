$(function() {

    let editButton;
    let id;

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

        $("#nameField").val(name);
        $("#rowsNumberField").val(rowsNumber);
        $("#columnsNumberField").val(columnsNumber);
        $("#is3D").prop("checked", can3D === "true" ? true : false);
        $("#isDolby").prop("checked", dolby === "true" ? true : false);
    });

//Create a function for savebutton
    $('#submitChangesBtn').on('click', function () {
        let theaterToEdit = {
            'id': id,
            'cinemaId': 1,
            'name': $('#nameField').val(),
            'rowsNumber': $('#rowsNumberField').val(),
            'columnsNumber': $('#columnsNumberField').val(),
            'can3d': $('#is3D').is(':checked'),
            'dolby': $('#isDolby').is(':checked')

        };
        console.log(theaterToEdit);
        //Send the newly entered info
        $.ajax({

            type: 'PUT',
            url: `/api/theaters/${id}`,
            data: JSON.stringify(theaterToEdit),
            contentType: 'application/json; charset=utf-8',
        })
            .done(function () {

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
                        $('#movieModal').modal('hide');
                    }, 100);

                })

            });
    });
});