require("dotenv").config();
var fs = require("fs");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var inputSelection = process.argv[2];
var inputTitle = process.argv[3];
process.argv.forEach(function (val, index) {
    if (index > 3) {
        inputTitle = inputTitle + " " + val;
    }
  });

  switch (inputSelection) 
  {
    case "movie-this" :
        var queryUrl = "http://www.omdbapi.com/?t=" + inputTitle + "&y=&plot=short&apikey=trilogy";
        fetchData(queryUrl,inputSelection);
        break;

    case "concert-this" :
        var queryUrl = "https://rest.bandsintown.com/artists/" + inputTitle + "/events?app_id=codingbootcamp";
        fetchData(queryUrl,inputSelection);
        break;
          
    case "spotify-this-song" :
        spotifyThis(inputTitle)
        break;

    case "do-what-it-says" :
        fs.readFile("random.txt", "utf8", function(error, data) {
          if (error) {
            return console.log(error);
          }
          var dataArr = data.split(",");
          var spotifyArr = dataArr[1];
          console.log("\n---------------" + dataArr[0] + "---------------" + dataArr[1] + "---------------");
          spotifyThis(spotifyArr);
        });
        break;

    default:
        console.log("Sorry Invalid Entry! \nPlease Input in the following format." +
        "\nnode liri.js concert-this <artist/band name here>" +
        "\nnode liri.js spotify-this-song <song name here>" + 
        "\nnode liri.js movie-this <movie name here>" + 
        "\nnode liri.js do-what-it-says");
  }



function fetchData (queryUrl,inputSelection){
    axios.get(queryUrl).then(
        function(response) {
          if (inputSelection == "movie-this") {
            movieThis(response.data);
          }
          if (inputSelection == "concert-this") {
            concertThis(response.data);
          }
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

function movieThis(data)
{
  console.log("\nTitle: " + data.Title);
  console.log("\nRelease Year: " + data.Year);
  console.log("\nMovie Rating: " + data.imdbRating);
  data.Ratings.forEach(function(rating){
      if(rating.Source == "Rotten Tomatoes") {
          console.log("\nRotten Tomatoes Rating: " + rating.Value);
      }
  })
  console.log("\nProduction: " + data.Production + ", " + data.Country);
  console.log("\nMovie Language: " + data.Language);
  console.log("\nMovie Actors: " + data.Actors);
  console.log("\nMovie Plot: " + data.Plot);
}

function concertThis(data) 
{
  data.forEach(function(item, index) {
    console.log("\n--------------------Result No: " + (index + 1) + "--------------------");
    console.log("\nName: " + item.venue.name);
    console.log("\nVenue: " + item.venue.city + ", " + item.venue.country);
    console.log("\nDate and Time: " + item.datetime);
  })
}

function spotifyThis (searchQuery)
{
  spotify
  .search({ type: 'track', query: searchQuery, limit:'10'})
  .then(function(response) {
    response.tracks.items.forEach(function(data,index) {
      console.log("\n--------------------Result No: " + (index + 1) + "--------------------");
      console.log("\nArtists: " + data.album.artists[0].name);
      console.log("\nSong Name: " + data.album.name);
      console.log("\nSong Link: " + data. external_urls.spotify);
      console.log("\nAlbum: " + data.name);
    });
  })
  .catch(function(err) {
    console.log(err);
  });
}