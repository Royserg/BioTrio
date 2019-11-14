// Delete screening with confirmation popup

$(function()
{
    const screeningTable = $('#screeningTable');

    screeningTable.on('click', '.btn-delete', function () {

        const row = $(this).closest('tr');
        const screeningId = row.data('screeningid');

        // Get confirmation for deleting
        const remove = confirm(`Are you sure you want to delete this screening? By deleting it, you will remove all corresponding bookings.`);

        if (remove) {
            $.ajax({
                url: `/api/screenings/${screeningId}`,
                method: 'DELETE',
                success: function (data) {
                    // Remove html table row with fading animation
                    row.css('background', 'tomato');
                    row.fadeOut(800, function () {
                        $(this).remove();
                    })
                }
            })
        }
    });
});