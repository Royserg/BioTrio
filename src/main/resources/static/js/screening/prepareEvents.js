function createEvents(selectedScreenings,openHour,closeHour) {

    console.log(selectedScreenings);
    // console.log(typeof selectedScreenings);
    let timetable = new Timetable();
    timetable.addLocations([ 'loc']);
    timetable.setScope(openHour, closeHour === 23 ? 0 : closeHour + 1);

    // / TheMovieDB API setup
    const API_KEY = '02325bf00c28d42c083b25b3be60b75e';
    const API_URL = 'https://api.themoviedb.org/3';

    if(selectedScreenings.length > 0) {

    selectedScreenings.forEach(screening => {

        $.ajax(`${API_URL}/movie/${screening.movieId}?api_key=${API_KEY}`)
            .done(response => {

                let scheduleEvent = {
                    // "movieId": screening.movieId,
                    "title": response['original_title'],
                    "start":screening.time,
                    "end":calculateEndTime(screening.time,response['runtime']),
                }

                let startHour = parseInt(scheduleEvent.start.slice(0,2));
                let startMin = parseInt(scheduleEvent.start.slice(3,5));

                let endHour = parseInt(scheduleEvent.end.slice(0,2));
                let endMin = parseInt(scheduleEvent.end.slice(3,5));

                timetable.addEvent(scheduleEvent.title,'loc' , new Date(2000,1,1,startHour,startMin),
                                                                  new Date(2000,1,1,endHour,endMin));
                renderTable(timetable);

            });
        })
    }
    else {
        renderTable(timetable);
    }
    return timetable;
}

function calculateEndTime(startTime,runtime) {

    let start = new moment(`${startTime}`, 'HH:mm');
    let endTime = start.add(runtime, 'minutes').format('HH:mm');

    return endTime;
}

function renderTable(timetable) {
    clearSchedule();
    let renderer = new Timetable.Renderer(timetable);
    renderer.draw('.timetable');
}

