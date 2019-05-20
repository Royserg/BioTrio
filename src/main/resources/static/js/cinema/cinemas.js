$(function() {

        console.log('jquery loaded');

        $('td a').on('click', function() {

            console.log("clicked on an a tag");
            const id = $(this).attr('data-cinemaID');
            const cinema = $(this);
            const cinemaTitle = cinema.parent().siblings('td')[1].innerHTML;

            //target input field and set its value equal to the value it displayed in parent list
            $("#editName").val(cinemaTitle);
            $('#submitChanges').on('click', function () {


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

                        //change name on parent list without having to update website 
                        cinema.parent().siblings('td')[1].innerHTML = $("#editName").val();

                        // $(location).attr('href', '/cinemas');

                    }

                });


            });

        });


    }
);