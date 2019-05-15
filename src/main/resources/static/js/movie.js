
$(function() {

    console.log('jquery loaded');


        // sort table

        let thIndex = 0,
            curThIndex = null;
        let sorting, tbodyHtml, rowId, sortingIndex;

        $(function(){
            $('.sortable').click(function(){
                thIndex = $(this).index();
                if(thIndex != curThIndex){
                    curThIndex = thIndex;
                    sorting = [];
                    tbodyHtml = null;
                    $('table tbody tr').each(function(){
                        sorting.push($(this).children('td').eq(curThIndex).html() + ', ' + $(this).index());
                    });

                    sorting = sorting.sort();
                    sortIt();
                }
            });
        })

        function sortIt(){
            for(sortingIndex = 0; sortingIndex < sorting.length; sortingIndex++){
                rowId = parseInt(sorting[sortingIndex].split(', ')[1]);
                tbodyHtml = tbodyHtml + $('table tbody tr').eq(rowId)[0].outerHTML;
            }
            $('table tbody').html(tbodyHtml);
        }



        // Edit movie

        $('td a').click(function() {

            const id = $(this).attr('data-movieID');
            const editButton = $(this);

            const movieTitle = editButton.parent().siblings('td')[0].innerHTML;
            const movieDuration = editButton.parent().siblings('td')[1].innerHTML;
            const movie3D = editButton.parent().siblings('td')[2].innerHTML;
            const movieDolby = editButton.parent().siblings('td')[3].innerHTML;

            // Show the previous data so that the user can edit onto it
            $("#editTitle").val(movieTitle);
            $("#editDurationInMinutes").val(movieDuration);
            // $("#editIs3D").val(movie3D);
            // $("#editIsDolby").val(movieDolby);


            // Unbind so that it doesn't have anything working on the back
            $('#submitChanges').unbind().on('click', function () {

                let movieToEdit = {
                    'title': $('#editTitle').val(),
                    'durationInMinutes': $('#editDurationInMinutes').val(),
                    'is3D': $('#editIs3D').is(':checked'),
                    'dolby': $('#editIsDolby').is(':checked')
                };

                //check if the screening time is less than 10 minutes
                if (movieToEdit.durationInMinutes < 10) {
                    alert("Invalid input. Please check the duration again.");

                //unable to have 3D and dolby movie as of now since Bio Trio doesn't support 3D and dolby screenings
                } else if (movieToEdit.is3D === true || movieToEdit.dolby === true) {
                    alert("Bio Trio doesn't have any theater that supports 3D or dolby screening yet. Please check again.");

                } else {

                    $.ajax({

                        type: 'POST',
                        url: `/movies/edit/${id}`,
                        dataType: 'json',
                        data: JSON.stringify(movieToEdit),
                        contentType: 'application/json; charset=utf-8',
                        success: function (data) {

                            // Reload the data
                            editButton.parent().siblings('td')[0].innerHTML = movieToEdit.title;
                            editButton.parent().siblings('td')[1].innerHTML = movieToEdit.durationInMinutes;
                            editButton.parent().siblings('td')[2].innerHTML = movieToEdit.is3D;
                            editButton.parent().siblings('td')[3].innerHTML = movieToEdit.dolby;


                            // Fancy css and close the modal
                            editButton.closest('tr').css('background', 'gold');
                            editButton.closest('tr').fadeOut(300, function () {
                                $(this).fadeIn(300);
                                $(this).css('background', 'white');
                                setTimeout(function () {
                                    $('#editMovie').modal('hide');
                                }, 100);

                            })

                        }

                    });
                }

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