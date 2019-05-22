$(function () {

    console.log('delete jquery loaded');

    // Delete movie

    $('#movieTable').on("click", ".btn-danger", function () {

        const button = $(this);
        const id = $(this).attr('data-movieID');

        // Get confirmation for deleting
        const remove = confirm(`Are you sure you want to delete this movie?`);
        if (remove) {

            console.log('before ajax');

            $.ajax({

                url: `/api/movies/${id}`,
                method: 'DELETE',
            })
            .done(function () {
                console.log('movie ', id, ' deleted');

                // Remove html table row with fading animation
                button.closest('tr').css('background', 'tomato');
                button.closest('tr').fadeOut(800, function () {
                    $(this).remove();
                })
            })
                .fail(function(error){
                    console.log(error);
            })

        }
    });

});