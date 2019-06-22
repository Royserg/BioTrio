function getMovie(selectedScreenings) {

    let newScreenings = [];

    // / TheMovieDB API setup
    const API_KEY = '02325bf00c28d42c083b25b3be60b75e';
    const API_URL = 'https://api.themoviedb.org/3';

    selectedScreenings.forEach(screening => {

    $.ajax(`${API_URL}/movie/${screening.movieId}?api_key=${API_KEY}`)
        .done(response => {

            let event = {
                "movieId": screening.movieId,
                "movieTitle": response['original_title'],
                "startTime":screening.time,
                "runtime":response['runtime']
            }

            calculateEndTime(screening.time,response['runtime']);

            newScreenings.push(event);

            // console.log(response['runtime']);

        });
    })
    console.log(newScreenings)
}

function calculateEndTime(startTime,runtime) {

    const end = new moment(${startTime}).add(runtime,'minutes'));
    console.log(end);
}

//trqbva da vzemesh start time na screening i da dobavish runtime ot funciqta otgore
//i posle da suzdadesh nov obekt koito sudurja start time end time and movie title thats it