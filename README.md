# Liri Node App

## About the App

LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives back data. The user has the option of using four commands (listed below) in conjuntion with specific parameters associated with the commands. The commands are:
 
  * concert-this
  * spotify-this-song
  * movie-this
  * do-what-it-says

  ## Running the App

**When running a specific command, it should be followed with search terms**

Example: node liri.js movie-this underworld

**When concert-this command is used you will be provided with:**

  * Name of the venue
  * Venue location
  * Date of the Event

  ![alt text](/images/concert-this.png "concert-this")
  
**When spotify-this-song command is used you will be provided with:**
  * Artist(s)
  * The song's name
  * A preview link of the song from Spotify
  * The album that the song is from

If no song is provided then your program will default to "The Sign" by Ace of Base.

![alt text](/images/spotify-this.png "spotify-this-song")

**When movie-this command is used you will be provided with:**

  * Title of the movie.
  * Year the movie came out.
  * IMDB Rating of the movie.
  * Rotten Tomatoes Rating of the movie.
  * Country where the movie was produced.
  * Language of the movie.
  * Plot of the movie.
  * Actors in the movie.

  If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.

![alt text](/images/movie-this.png "movie-this")

**When do-what-it-says command:**

  * A random.txt file with search for spotify-this-song "I want it that way." This will give you the spotify results of "I want it that way."

  ## Technologies Used
  * Javascript
  * Nodejs
  * Node packages:
    * Node-Spotify-API
    * Request
    * Moment
    * DotEnv
  * APIs used:
    * Bands in Town
    * OMDB
    * Spotify
  * Git
