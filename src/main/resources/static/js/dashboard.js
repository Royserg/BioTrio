$(function() {
    console.log("loaded jquery and bootstrap");
    var totalBookings = 0;
    var totalTickets = 0;
    var bookings = [];


    //Get all bookings, store in 'bookings' array
    $.ajax(`/api/bookings/`,
        {
            // success callback function
            success: (data) => {
               console.log(data);
               console.log("-------");

                $.each(data, (index, booking) => {
                    bookings.push(booking);
                    totalBookings++;
                })

            }
        });


    var options = {
        chart: {
            type: 'bar'
        },
        series: [{
            name: 'sales',
            data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
        }],
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        }
    }

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();


});
