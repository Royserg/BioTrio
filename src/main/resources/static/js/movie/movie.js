$(function() {

    const addButton = $('#addButton');

    let id;
    let isEdit = false;
    let movieTitle, movieDuration, movie3D, movieDolby;
    let row;

    //add class to the add button
    addButton.addClass("add-movie");

    // Click edit movie and it'll bring the movie info and show it on modal

    $('#movieTable').on("click", ".btn-warning", function() {

        row = $(this).closest('tr');
        id= row.data('movieid');
        console.log(id);

        // Bring the movie data from the table
        movieTitle = row.children('td')[0].innerHTML;
        movieDuration = row.children('td')[1].innerHTML;
        movie3D = row.children('td')[2].innerHTML;
        movieDolby = row.children('td')[3].innerHTML;

        // Show the previous data so that the user can edit onto it
        $("#modalTitle").val(movieTitle);
        $("#modalDurationInMinutes").val(movieDuration);
        $("#modalIs3D").val(movie3D);
        $("#modalDolby").val(movieDolby);

        // Change isEdit into true
        isEdit = true;

        // Show the modal with yellow button and header
        showModal(`<h5>Edit Movie</h5>`, 'btn btn-warning');

    });

    // Click add movie and it'll clear the modal, getting ready for new info
    //https://stackoverflow.com/a/28108858
    $(document).on("click", '#addButton.add-movie', function() {

            // Change isEdit into false
            isEdit = false;

            // Clear the modal
            $('#modalTitle').val("");
            $('#modalDurationInMinutes').val("");
            $('#modalIs3D').prop("checked", false);
            $('#modalDolby').prop("checked", false);

            // Show the modal with green button and header
            showModal(`<h5>Add Movie</h5>`, 'btn btn-success');

        });

        // Show modal with different header and button color
        function showModal(header, className) {

            $('#movieModalTitle').html(header);
            $('#submitModal').removeAttr('class');
            $('#submitModal').addClass(className);
            $('#movieModal').modal('show');

        }

        // Click save button and edit or add accordingly
        $('html body').off('click').on('click', '#submitModal', function (e) {

            if(isEdit) {
                edit();
            } else {
                add(e);
            }

        });

        // Edit a movie
        function edit() {

            let movieToEdit = {
                'id': id,
                'title': $('#modalTitle').val(),
                'durationInMinutes': $('#modalDurationInMinutes').val(),
                'is3D': $('#modalIs3D').is(":checked"),
                'dolby': $('#modalDolby').is(":checked")
            };

            // Check if the screening time is less than 10 minutes
            if (movieToEdit.durationInMinutes < 10) {
                alert("Invalid input. Please check the duration again.");

                //unable to have 3D and dolby movie as of now since Bio Trio doesn't support 3D and dolby screenings
                // } else if (movieToEdit.is3D === true || movieToEdit.dolby === true) {
                //     alert("Bio Trio doesn't have any theater that supports 3D or dolby screening yet. Please check again.");

            } else {

                $.ajax( {

                    type: 'PUT',
                    url: `/api/movies/${id}`,
                    dataType: 'html',
                    data: JSON.stringify(movieToEdit),
                    contentType: 'application/json'
                } )
                    .done(function() {

                        // Reload the data
                        row.children('td')[0].innerHTML = movieToEdit.title;
                        row.children('td')[1].innerHTML = movieToEdit.durationInMinutes;
                        row.children('td')[2].innerHTML = movieToEdit.is3D;
                        row.children('td')[3].innerHTML = movieToEdit.dolby;

                        // Fancy css and close the modal
                        row.css('background', 'gold');
                        row.fadeOut(300, function () {
                            $(this).fadeIn(300);
                            $(this).css('background', 'white');
                            setTimeout(function () {
                                $('#movieModal').modal('hide');
                            }, 100);

                        })
                    })
            }
        }

        // Add a movie
        function add(e) {

            // Prevent default event such as refreshing the whole page after the movie is added
            e.preventDefault();

            let newMovie = {
                'title': $('#modalTitle').val(),
                'durationInMinutes': $('#modalDurationInMinutes').val(),
                'is3D': $('#modalIs3D').is(":checked"),
                'dolby': $('#modalDolby').is(":checked")
            };

            if (newMovie.durationInMinutes < 10) {

                alert("Invalid input. Please check the duration again.");

            } else {

                $.ajax({
                    type: 'POST',
                    url: `/api/movies`,
                    dataType: 'json',
                    data: JSON.stringify(newMovie),
                    contentType: 'application/json'
                })
                .done(function (id) {

                        // Add new row to the table with the newly added movie
                        let newRow = `<tr class="d-flex" data-movieid="${id}", data-movietitle="${newMovie.title}">
                                    <td class="col-3 title cool-pointer">${newMovie.title}</td>
                                    <td class="col-5 duration">${newMovie.durationInMinutes}</td>
                                    <td class="col-1 is3D">${newMovie.is3D}</td>
                                    <td class="col-1 dolby">${newMovie.dolby}</td>
                                    <td class="col-1"><button
                                                             id = "editButton"
                                                             class="btn btn-warning"
                                                             data-toggle="modal"
                                                             data-target="#movieModal"><span class="fas fa-edit"></span></button></td>
                                        <td class="col-1"><a class="btn btn-danger" ><span class="fas fa-trash text-white"></span></a></td>
                                  </tr>`;

                        // Add new row to the table and hide the modal
                        $('#movieTable tbody').append(newRow);
                        setTimeout(function () {
                            $('#movieModal').modal('hide');
                        }, 100);

                        // Scroll down the table so that you can see the newly added movie
                         $('#movieTable tbody').scrollTop($('#movieTable tbody')[0].scrollHeight);
                    });
            }
        }
});
