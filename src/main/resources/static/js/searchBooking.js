$(function() {

    const searchBar = $('#searchBar');
    let searchVal = "";
    tableBody = $('#tableBody');
    rows = tableBody.children();

    //event triggered eachtime input field of '#searchBar' is updated
    searchBar.bind('input', function() {
        searchVal = searchBar.val().toLowerCase();

        // if (searchVal.length > 1)
        if(1 < searchVal.length){

            $.ajax(`/api/bookings/phone/${searchVal}`, {
                success: (data) => {

                    //remove all bookings made with thymeleaf
                    tableBody.html("");

                    //generate new html with data from query
                    console.log(data);

                }
            })

        }
























        /*

        //iterates over each row entry (1 for each booking)
        for(let i = 0; i < rows.length; i++) {

            //stores the phoneNumber associated with the booking in variable
            var phoneNum = rows[i].getAttribute("data:phone");
            var movie    = rows[i].getAttribute("data:movie").toLowerCase();


            //compares the phoneNum with the value of input field (startsWith is native js, to compare strings)
            if(phoneNum.startsWith(searchVal) || movie.startsWith(searchVal)){

                //if rows associated phonenumber matches the value being searched for,
                //remove class 'd-none' (this class is bootstrap to hide an element)
                $(rows[i]).removeClass("d-none");
            }

            //if the phoneNum does not match the searched value
            else {

                //add 'd-none' class to row element to hide it
                $(rows[i]).addClass("d-none");
            }
        }

        //if search value is empty, remove 'd-none' class from all rows
        if(searchBar.val() === ""){
            tableBody.children().removeClass("d-none");
        }

        */

    })


})



