// Delete booking with confirmation popup
$(function()
{
    $('table').on('click', '.btn-danger', function () {
        const button = $(this);
        const theaterId = $(this).data('theaterid');
        const theaterName = $(this).data('theatername');
        // Get confirmation for deleting
        const remove = confirm(`Are you sure you want to delete this theater? By deleting it, you will delete all corresponding data for theater: ` + theaterName);
        if (remove) {
            $.ajax({
                url: `/theaters/delete/${theaterId}`,
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