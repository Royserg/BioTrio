$(function() {

        console.log('jquery loaded');

        $('td a').on('click', function() {

            console.log("clicked on an a tag");
            const id = $(this).attr('data-cinemaID');
            const cinema = $(this);
            const cinemaTitle = cinema.parent().siblings('td')[1].innerHTML;

            $("#editName").val(cinemaTitle);

            $('#submitChanges').on('click', function () {
                console.log("we pressed submit");

                let cinemaToEdit = {
                    'name': $('#editName').val(),
                };

                $.ajax({

                    type: 'POST',
                    url: `/cinemas/edit/${id}`,
                    dataType: 'json',
                    data: JSON.stringify(cinemaToEdit),
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {

                        $(location).attr('href', '/cinemas');

                    }

                });

            });

        });


    }
);