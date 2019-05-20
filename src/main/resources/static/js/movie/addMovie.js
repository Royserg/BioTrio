$(function () {

    console.log('add jquery loaded');

    // Add movie

    $('#addNewMovie').unbind().on('click', function (e) {

        e.preventDefault();

        let newMovie = {
            'title': $('#addTitle').val(),
            'durationInMinutes': $('#addDurationInMinutes').val(),
            'is3D': $('#addIs3D').is(":checked"),
            'dolby': $('#addIsDolby').is(":checked")
        };

        if (newMovie.durationInMinutes < 10) {

            alert("Invalid input. Please check the duration again.");

        } else {
            $.ajax({

                type: 'POST',
                url: `/movies`,
                dataType: 'json',
                data: JSON.stringify(newMovie),
                contentType: 'application/json',
                success: function (newMovieAdded) {

                    // add new row to the table with the newly added movie

                    let newRow = `<tr class="d-flex">
                                    <td class="col-5 title">${newMovieAdded.title}</td>
                                    <td class="col-3 duration">${newMovieAdded.durationInMinutes}</td>
                                    <td class="col-1 3D">${newMovieAdded.is3D}</td>
                                    <td class="col-1 Dolby">${newMovieAdded.dolby}</td>
                                    <td class="col-1"><a href="#"
                                                 id = "editButton"
                                                 class="btn btn-warning"
                                                 data-toggle="modal"
                                                 data-target="#editMovie"
                                                 data-movieID="${newMovieAdded.id}"><span class="fas fa-edit"></span></a></td>
                                    <td class="col-1"><a class="btn btn-danger" data-movieID="${newMovieAdded.id}"><span class = "fas fa-trash text-white"></span></a></td>
                                  </tr>`

                    $('#movieTable tbody').append(newRow);
                    setTimeout(function () {
                        $('#addMovie').modal('hide');
                    }, 100);

                    $('#table-container').scrollTop($('#table-container')[0].scrollHeight);


                }

            });

        }
    });

});