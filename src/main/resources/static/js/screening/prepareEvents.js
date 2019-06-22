function createEvents(selectedScreenings) {

    let events = [];

    // / TheMovieDB API setup
    const API_KEY = '02325bf00c28d42c083b25b3be60b75e';
    const API_URL = 'https://api.themoviedb.org/3';

    selectedScreenings.forEach(screening => {

    $.ajax(`${API_URL}/movie/${screening.movieId}?api_key=${API_KEY}`)
        .done(response => {

            let scheduleEvent = {
                // "movieId": screening.movieId,
                "title": response['original_title'],
                "start":screening.time.slice(0,5),
                "end":calculateEndTime(screening.time,response['runtime']),
                noDetails: true
            }

            // let scheduleEvent = {
            //     "start":12,
            //     "end":14,
            //     "title":"test",
            //     // noDetails: true
            // }

            events.push(scheduleEvent);
            // console.log("start time:",screening.time)
            // console.log("runtime:",response['runtime']);

        });
    })

    return events;
}

function calculateEndTime(startTime,runtime) {

    let start = new moment(`${startTime}`, 'HH:mm');
    let endTime = start.add(runtime, 'minutes').format('HH:mm');
    // console.log("endtime:",endTime);

    return endTime;
}


