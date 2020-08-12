var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "eu-west-3",
});

var docClient  = new AWS.DynamoDB.DocumentClient()

console.log("Importing movies into DynamoDB. Please wait.");

var allMovies = JSON.parse(fs.readFileSync('movies.json', 'utf8'));
allMovies.forEach(function(movie) {
    var params = {
        TableName: "Movies",
        Item: {
            "movies": "movies",
            "title":  movie.title,
            "info":  movie.info,
            "year": movie.year
        }
    };

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add movie", movie.title, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", movie.title);
       }
    });
});
