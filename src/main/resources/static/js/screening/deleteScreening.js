// Delete screening with confirmation popup


$(function()
{

    $('table').on('click', '.btn-danger', function () {
        const button = $(this);
        const screeningId = $(this).data('screeningid');
        const screeningMovie = $(this).data('screeningmovie');
        // Get confirmation for deleting
        const remove = confirm(`Are you sure you want to delete this screening? By deleting it, you will remove all corresponding bookings for the screening of: \n \n` + screeningMovie);
        if (remove) {
            $.ajax({
                url: `/screenings/${screeningId}`,
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
});