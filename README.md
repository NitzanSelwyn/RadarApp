# Running The Project

To run this project you will need [`Node.js`](https://nodejs.org/en/) on your machine

### Running The Server -
Navigate to the RadarAppServer folder and run the command `npm install` after that run the command `node server.js` to start the server

### Running The Client - 
Navigate to the RadarAppClient folder and run the command `npm install` after that run the command `ng serve` to start the client



# Main Technologies In The Project

## Angular - 
For the client - I used angular mainly to learn and extand my knowledge.  

### Styling My Front-End - 
- For the front-end I used [`Angular Material`](https://material.angular.io/guide/getting-started).
- For The Google Map I used [`AGM(Angular Google Maps)`](https://angular-maps.com/).

## Node.js - 
For the server - Connect the client to the DB , and to extand my knowledge in web development.

### NPM Used -
- [`Mongoose`](https://www.npmjs.com/package/mongoose).
- [`Express`](https://www.npmjs.com/package/express).
- [`Body-Parser`](https://www.npmjs.com/package/body-parser).
- [`Cors`](https://www.npmjs.com/package/cors).
- [`JWT-Simple`](https://www.npmjs.com/package/jwt-simple).
- [`Bcrypt-NodeJS`](https://www.npmjs.com/package/bcrypt-nodejs).

### MongoDB -
For the database - Becuse I'll host this app on a server like Firebase or AWS S3 for the client and HEROKU for the server I'm using [`MongoDB Atlas`](https://cloud.mongodb.com) so my Database is on the cloud

### Google Maps API - 
In this project I'm using Google Maps API to: 
 - Find current location of a user I'm using google maps [`Geolocation API`](https://developers.google.com/maps/documentation/geolocation/intro).
 - Styling the map using google maps [`Javascript API`](https://developers.google.com/maps/documentation/javascript/styling).
 - Find address by getting latitude & longitude I'm using [`Geocoding`](https://developers.google.com/maps/documentation/geocoding/intro).
 - Calculating distance between two locations so I can show only the point that are within the sphere im using [`Geometry Library`](https://developers.google.com/maps/documentation/javascript/geometry).
 - Search for a specific location I'm using [`Places Library`](https://developers.google.com/maps/documentation/javascript/places), and so it will autocomplete for the user I'm using [`Place Autocomplete`](https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete).
 







