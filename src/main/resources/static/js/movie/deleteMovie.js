$(function () {

    console.log('delete jquery loaded');

    // Delete movie

    $('#movieTable').on("click", ".btn-danger", function () {

        const row = $(this).closest('tr');
        const id = row.data('movieid');

        // Get confirmation for deleting
        const remove = confirm(`Are you sure you want to delete this movie?`);
        if (remove) {

            $.ajax({

                url: `/api/movies/${id}`,
                type: 'DELETE'
            })
            .done(function () {

                console.log('movie ', id, ' deleted');

                // Remove table row with fading animation
                row.css('background', 'tomato');
                row.fadeOut(800, function () {
                    $(this).remove();
                })
            })

        }
    });

});