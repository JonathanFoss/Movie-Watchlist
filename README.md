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

## Problem - clean movie lists

Without middleware the user would be able to add the same movie (title) again even if it already exists in the movie list.
Therefor i wanted to create a middleware that checks to see if the title already is in the list.
This is so that the user keeps a clean and organized list.

Currently the middleware checks an array, Movies = [], to see if any titles matches the new request. If it does an messages appears and tells the client that it does.
And does not add the movie to the list. If not the movie gets added as intended for the user.

## Data Privacy Policy:

The app only collect the information necessary _(username, password, consent)_ to provide the user with access. 
Passwords are encrypted and any personal information is not shared with third parties. _(This is a school project, so .env file is shared!)_
The user can delete their account at any time and all personal information will be removed.

## Terms of Service:

The user owns their own data. 
But i might remove or modify their data over the course of this project. _(This is still a university project after all..)_
