# Movie Watchlist
Webapp to add watched movies
This app is intended to be used as a personal movie list app. Where users can add movies they have watched, planing to watch and/or dropped movies.
Insperation for this app is based on MAL ( My Anime List ) and IMDB. Where as i dont have the time to add a full database with every movie, so the user them selves will add titles, rating, posters and reviews/comments.
My vision is that people can go to other peoples pages and see what they think of movies. With free use of the app the user can choose posters they see fit the movies the best. This will make the app more personalized to each user.


FEATURE MAP can be found at https://github.com/users/JonathanFoss/projects/1

I have put express moduels in gitIgnore so its abit cleaner, if you wish to download just run NMP i express in the Movie-Watchlist folder.

# Movie Watchlist API

Basic scaffold api added for my movie app.

## Endpoints

### GET /movies
List out all movies added by user.

### POST /movies
Lets the user add new movie entries.

### PATCH /movies/:id
Updates existing movie entry.

### DELETE /movies/:id
Removes movie from list.

# Middleware

I chose to create a middleware to check for existing titles in the movie list. This is so that the user doesn't add the same movie allready.
This has been tested in Bruno and is currently working as intended.
