require("dotenv").config();

var axios = require("axios");

var inputSelector = process.argv[2];
var inputTitle = process.argv[3];
process.argv.forEach(function (val, index) {
    if (index > 3) {
        inputTitle = inputTitle + " " + val;
    }
  });
switch (inputSelector) {
    case "movie" :
        var queryUrl = "http://www.omdbapi.com/?t=" + inputTitle + "&y=&plot=short&apikey=trilogy";
        movieThis(queryUrl);
        break;

    case "spotify" :
        break;
        
    case "concert" :
        break;

    case "do" :
        break;

    default:
        console.log("Sorry Please Check Your Input")

}

function movieThis (){
    axios.get(queryUrl).then(
        function(response) {
          console.log("\nTitle: " + response.data.Title);
          console.log("\nRelease Year: " + response.data.Year);
          console.log("\nMovie Rating: " + response.data.imdbRating);
          response.data.Ratings.forEach(function(rating){
              if(rating.Source == "Rotten Tomatoes") {
                  console.log("\nRotten Tomatoes Rating: " + rating.Value);
              }
          })
          console.log("\nProduction: " + response.data.Production + ", " + response.data.Country);
          console.log("\nMovie Language: " + response.data.Language);
          console.log("\nMovie Actors: " + response.data.Actors);
          console.log("\nMovie Plot: " + response.data.Plot);
        })
        .catch(function(error) {
          if (error.response) {
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
}

