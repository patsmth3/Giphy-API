$( document ).ready(function() {

// An array of actions, new actions will be pushed into this array;

var search = ["Beach", "Ocean", "Waves", "Tropical", "Sunset", "Sunrise", "Surfing", "Water sports", "Boat", "Dinner Cruise", "Hawaii"];

// Creating Functions & Methods
// Function that displays all gif buttons

function displayGifButtons(){

    // erasing anything in this div id so that it doesnt duplicate the results
    $("#gifButtonsView").empty(); 
    
    for (var i = 0; i < search.length; i++){
        var gifButton = $("<button>");
        gifButton.addClass("action");
        gifButton.addClass("btn btn-primary")
        gifButton.attr("data-name", search[i]);
        gifButton.text(search[i]);
        $("#gifButtonsView").append(gifButton);
    }
}

// Function to add a new action button

function addNewButton(){
    $("#addGif").on("click", function(event){
    event.preventDefault();

    var action = $("#action-input").val().trim();
    if (action == ""){
      return false; // added so user cannot add a blank button
    }
    search.push(action);
    console.log("addNewButtom");
    displayGifButtons();
    return false;
    });
}

// Function to remove last action button
// Doesnt work properly yet removes all of the added buttons
// rather than just the last

function removeLastButton(){
    $("removeGif").on("click", function(){
    search.pop(action);
    displayGifButtons();
    return false;
    });
}

// Function that displays all of the gifs

function displayGifs(){
    $(".mainDiv").height("600px");
    var action = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=XZhFy19bjIhvWzZqPK8nTrHOrwiSBNSi";

    $.ajax({
        url: queryURL,
        method: 'GET'
    })

    .done(function(response) {

        // erasing anything in this div id so that it doesnt keep any from the previous click

        $("#gifsView").empty(); 

        //shows results of gifs

        var results = response.data; 
        if (results == ""){
          alert("There isn't a gif for this selected button");
        }

        for (var i=0; i<results.length; i++){

            //div for the gifs to go inside

            var gifDiv = $("<div>"); 
            gifDiv.addClass("gifDiv");

            // pulling rating of gif

            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);

            // pulling gif

            var gifImage = $("<img>");

            // still image stored into src of image

            gifImage.attr("src", results[i].images.fixed_height_small_still.url); 

            // still image

            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); 

            // animated image

            gifImage.attr("data-animate",results[i].images.fixed_height_small.url);

            // set the image state

            gifImage.attr("data-state", "still"); 
            gifImage.addClass("image");
            gifDiv.append(gifImage);

            // pulling still image of gif
            // adding div of gifs to gifsView div

            $("#gifsView").prepend(gifDiv);
        }
    });
}

// Calling Functions & Methods
// displays list of actions already created

displayGifButtons(); 
addNewButton();
removeLastButton();

// Document Event Listeners

$(document).on("click", ".action", displayGifs);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
});