$(function() {
    console.log("loaded jquery and bootstrap");
    var bookings = [];
    var screenings = [];
    var currentDate = new Date();
    console.log(currentDate);
    var currentDay = currentDate.getDay();
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    //shift days array so current day is first element
    for(let i = 0; i < currentDay; i++) {

        //remove first element in days array, store in variable
        let firstDayInArray = days.shift();
        //push firstDayInArray back in as last element in array
        days.push(firstDayInArray);

    }

    //Get all bookings, store in 'bookings' array

    $.ajax(`/api/screenings/`,
        {
            // success callback function
            success: (data) => {
                console.log("-------");

                $.each(data, (index, screening) => {
                    screenings.push(screening);

                })

            }
        });
    $.ajax(`/api/bookings/`,
        {
            // success callback function
            success: (data) => {
                console.log(data);
                console.log("-------");

                $.each(data, (index, booking) => {
                    bookings.push(booking);
                })

            }
        });






    
    var options = {
        chart: {
            type: 'bar'
        },
        series: [{
            name: 'tickets',
            data: [30, 65, 70, 55, 95, 102, 67]
        }],
        xaxis: {
            categories: [...days]
        }
    }


    chart = new ApexCharts(document.querySelector("#chart-3"), options);
    chart.render();


});
