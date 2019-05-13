
$(function() {

    console.log('jquery loaded');

        $('td a').click(function() {

            const id = $(this).attr('data-movieID');
            const movie = $(this);
            const movieTitle = movie.parent().siblings('td')[0].innerHTML;
            const movieDuration = movie.parent().siblings('td')[1].innerHTML;

            $("#editTitle").val(movieTitle);
            $("#editDurationInMinutes").val(movieDuration);

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

                        movie.parent().siblings('td')[0].innerHTML = movieToEdit.title;
                        movie.parent().siblings('td')[1].innerHTML = movieToEdit.durationInMinutes;

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


    }
);