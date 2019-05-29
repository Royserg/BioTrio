$(function() {

    console.log('movie jquery loaded');

    let id;
    let editButton;
    let isEdit = false;
    let movieTitle, movieDuration, movie3D, movieDolby;
    const addButton = $('#addButton');

    addButton.addClass("add-movie");

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
            });

            function sortIt(){
                for(sortingIndex = 0; sortingIndex < sorting.length; sortingIndex++){
                    rowId = parseInt(sorting[sortingIndex].split(', ')[1]);
                    tbodyHtml = tbodyHtml + $('table tbody tr').eq(rowId)[0].outerHTML;
                }
                $('table tbody').html(tbodyHtml);
            }





        // Click edit movie and it'll bring the movie info and show it on modal

        $('#movieTable').on("click", ".btn-warning", function() {

            id = $(this).attr('data-movieID');
            editButton = $(this);

            // Bring the movie data from the table
            movieTitle = editButton.parent().siblings('td')[0].innerHTML;
            movieDuration = editButton.parent().siblings('td')[1].innerHTML;
            movie3D = editButton.parent().siblings('td')[2].innerHTML;
            movieDolby = editButton.parent().siblings('td')[3].innerHTML;

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
                        let newRow = `<tr class="d-flex">
                                    <td class="col-5 title">${newMovie.title}</td>
                                    <td class="col-3 duration">${newMovie.durationInMinutes}</td>
                                    <td class="col-1 is3D">${newMovie.is3D}</td>
                                    <td class="col-1 dolby">${newMovie.dolby}</td>
                                    <td class="col-1"><a href="#"
                                                 id = "editButton"
                                                 class="btn btn-warning"
                                                 data-toggle="modal"
                                                 data-target="#movieModal"
                                                 data-movieID="${id}"><span class="fas fa-edit"></span></a></td>
                                    <td class="col-1"><a class="btn btn-danger" data-movieID="${id}"><span class = "fas fa-trash text-white"></span></a></td>
                                  </tr>`;

                        // Add new row to the table and hide the modal
                        $('#movieTable tbody').append(newRow);
                        setTimeout(function () {
                            $('#movieModal').modal('hide');
                        }, 100);

                        // Scroll down the table so that you can see the newly added movie
                        $('#table-container').scrollTop($('#table-container')[0].scrollHeight);


                    });

            }

        }


});
