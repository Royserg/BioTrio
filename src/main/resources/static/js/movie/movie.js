
$(function() {

    console.log('jquery loaded');


        // sort table
        // source: https://codepen.io/JTParrett/pen/rfeao

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

        $('#movieTable').on("click", ".btn-warning", function() {

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
                    'id': id,
                    'title': $('#editTitle').val(),
                    'durationInMinutes': $('#editDurationInMinutes').val(),
                    'is3D': $('#editIs3D').is(":checked"),
                    'dolby': $('#editIsDolby').is(":checked")
                };

                //check if the screening time is less than 10 minutes
                if (movieToEdit.durationInMinutes < 10) {
                    alert("Invalid input. Please check the duration again.");

                //unable to have 3D and dolby movie as of now since Bio Trio doesn't support 3D and dolby screenings
                // } else if (movieToEdit.is3D === true || movieToEdit.dolby === true) {
                //     alert("Bio Trio doesn't have any theater that supports 3D or dolby screening yet. Please check again.");

                } else {

                    $.ajax({

                        type: 'PUT',
                        url: `/movies`,
                        dataType: 'json',
                        data: JSON.stringify(movieToEdit),
                        contentType: 'application/json',

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

        $('#movieTable').on("click", ".btn-danger", function () {

            const button = $(this);
            const id = $(this).attr('movieid');

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



         // Add movie

        $('#addNewMovie').click(function (e) {

            e.preventDefault();

            let newMovie = {
                'title': $('#addTitle').val(),
                'durationInMinutes': $('#addDurationInMinutes').val(),
                'is3D': $('#addIs3D').is(":checked"),
                'dolby': $('#addIsDolby').is(":checked")
            };

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

                    //TODO: scroll to the bottom of the table when added.

                }

            });

        });

    }
);
