
$(function() {

    console.log('jquery loaded');

    // Edit movie

        $('td a').click(function() {

            const id = $(this).attr('data-movieID');
            const movie = $(this);

            const movieTitle = movie.parent().siblings('td')[0].innerHTML;
            const movieDuration = movie.parent().siblings('td')[1].innerHTML;

            // Show the previous data so that the user can edit onto it
            $("#editTitle").val(movieTitle);
            $("#editDurationInMinutes").val(movieDuration);

            // Unbind so that it doesn't have anything working on the back
            $('#submitChanges').unbind().on('click', function () {

                let movieToEdit = {
                    'title': $('#editTitle').val(),
                    'durationInMinutes': $('#editDurationInMinutes').val()
                };

                $.ajax({

                    type: 'POST',
                    url: `/movies/edit/${id}`,
                    dataType: 'json',
                    data: JSON.stringify(movieToEdit),
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {

                        // Reload the data
                        movie.parent().siblings('td')[0].innerHTML = movieToEdit.title;
                        movie.parent().siblings('td')[1].innerHTML = movieToEdit.durationInMinutes;

                        // Fancy css and close the modal
                        movie.closest('tr').css('background', 'gold');
                        movie.closest('tr').fadeOut(300, function() {
                            $(this).fadeIn(300);
                            $(this).css('background', 'white');
                            setTimeout(function(){ $('#editMovie').modal('hide');},100);
                        })

                    }

                });

            });

        });


        // Delete movie

        console.log("connected");

            $('.btn-danger').click(function () {

                const button = $(this);
                const id = $(this).attr('movieID');

                // Get confirmation for deleting
                const remove = confirm(`Are you sure you want to delete this movie?`);
                if (remove) {

                    $.ajax({

                        url: `/movies/delete/${id}`,
                        method: 'DELETE',
                        success: function (data) {

                            // Remove html table row with fading animation
                            button.closest('tr').css('background', 'tomato');
                            button.closest('tr').fadeOut(800, function () {
                                $(this).remove();
                            })
                        }
                    })
                }
            });

    }
);