require("dotenv").config();

//VARS
var moment = require('moment');
var keys = require("./keys.js");
var axios = require("axios");
var request = require("request");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// Capture user input
var command = process.argv[2];
var nodeArgs = process.argv;
var searchTerm = "";
for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
        searchTerm = searchTerm + "+" + nodeArgs[i];
    } else {
        searchTerm += nodeArgs[i];
    }
}

console.log(searchTerm);

UserInput(command, searchTerm);

// COMMANDS
function UserInput(command, searchTerm) {
    switch (command) {
        case 'concert-this':
            concertInfo(searchTerm);
            break;
        case 'spotify-this-song':
            songInfo(searchTerm);
            break;
        case 'movie-this':
            movieInfo(searchTerm);
            break;
        case 'do-what-it-says':
            doWhatItSays();
            break;
        default:
            console.log("Please type one of the following options: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says")
    }
}

// BANDS IN TOWN API FUNCTION
function concertInfo(searchTerm) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp";
    console.log(queryUrl);
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var concerts = JSON.parse(body);

            console.log("Events for " + searchTerm + ":");
            fs.appendFileSync("log.txt", "Events for " + searchTerm + ":\n");

            for (var i = 0; i < concerts.length; i++) {
                console.log("\n-----------EVENT INFO-----------");
                //console.log(i);
                console.log("Name of the Venue: " + concerts[i].venue.name);
                console.log("Venue Location: " + concerts[i].venue.city);
                console.log("Date of the Event: " + moment(concerts[i].datetime).format("MM-DD-YYYY"));


                fs.appendFileSync("log.txt", "\n-----------EVENT INFO-----------\n");//Append in log.txt file
                fs.appendFileSync("log.txt", "Name of the Venue: " + concerts[i].venue.name+"\n");
                fs.appendFileSync("log.txt", "Venue Location: " +  concerts[i].venue.city+"\n");
                fs.appendFileSync("log.txt", "Date of the Event: " +  moment(concerts[i].datetime).format("MM-DD-YYYY") +"\n");
            }
        } else {
            console.log('Error occurred.');
        }
    });
}

// SPOTIFY API FUNCTION
function songInfo(searchTerm) {
    if (searchTerm === "") {
        searchTerm = "The Sign"; 
    }
    spotify.search(
        {
            type: "track",
            query: searchTerm
        },
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }
            var songs = data.tracks.items;

            console.log("Song Results for " + searchTerm + ":");
            fs.appendFileSync("log.txt", "Song Results for " + searchTerm + ":\n");

            for (var i = 0; i < songs.length; i++) {
                console.log("\n-----------SONG INFO-----------");
                console.log("Artist(s): " + songs[i].artists[0].name);
                console.log("Song name: " + songs[i].name);
                console.log("Preview song: " + songs[i].preview_url);
                console.log("Album: " + songs[i].album.name);

                fs.appendFileSync("log.txt", "\n-----------SONG INFO-----------\n");
                fs.appendFileSync("log.txt", "Artist(s): " + songs[i].artists[0].name+"\n");
                fs.appendFileSync("log.txt", "Song name: " + songs[i].name+"\n");
                fs.appendFileSync("log.txt", "Preview song: " + songs[i].preview_url+"\n");
                fs.appendFileSync("log.txt","Album: " + songs[i].album.name+"\n");
            }
        }
    );
};

// OMDB API FUNCTION
function movieInfo(searchTerm) {
    if (searchTerm === "") {
        searchTerm = "Mr.+Nobody";
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");
    };

    var queryUrl = "http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy";

    console.log(queryUrl);

    axios.get(queryUrl).then(
        function (response) {
            console.log("\n-----------MOVIE INFO-----------");
            console.log("Movie Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);

            fs.appendFileSync("log.txt","-----------MOVIE INFO-----------\n");
            fs.appendFileSync("log.txt", "Movie Title: " + response.data.Title+"\n");
            fs.appendFileSync("log.txt", "Release Year: " + response.data.Year+"\n");
            fs.appendFileSync("log.txt", "IMDB Rating: " + response.data.imdbRating+"\n");
            fs.appendFileSync("log.txt", "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value+"\n");
            fs.appendFileSync("log.txt", "Country: " + response.data.Country+"\n");
            fs.appendFileSync("log.txt", "Language: " + response.data.Language+"\n");
            fs.appendFileSync("log.txt", "Plot: " + response.data.Plot+"\n");
            fs.appendFileSync("log.txt", "Actors: " + response.data.Actors+"\n\n");
        })
        .catch(function (error) {
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

function doWhatItSays() {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        var arr = data.split(',');
        UserInput(arr[0], arr[1]);
    });
}