var AWS = require("aws-sdk");

AWS.config.update({
  region: "eu-west-3",
});

var docClient = new AWS.DynamoDB.DocumentClient();
var dynamodb = new AWS.DynamoDB;

// Update the item, unconditionally,

var params = {
  TableName : "Movies",
  IndexName: "ReleaseDate-index",
  KeyConditionExpression: "movies = :pk and #year = :year",
  ExpressionAttributeNames:{
    "#year": "year",
},
ExpressionAttributeValues: {
    ":pk": "movies",
    ":year": 1940,
},
ScanIndexForward: false
};

docClient.query(params, function(err, data) {
  if (err) {
    console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
  } else {
      console.log("Query succeeded.");

      data.Items.forEach(function(item) {
        console.log(" -", item.year + ": " + item.title);

        var updateParams = {
          TableName: "Movies",
          Key:{
            movies: { S: "movies" },
            title: { S: item.title },
          },
          UpdateExpression: "SET info.rating=:r",
          ExpressionAttributeValues:{
              ":r": { N: "12" },
          },
          ReturnValues:"UPDATED_NEW"
        };
      
        console.log("Updating the item...");
        dynamodb.updateItem(updateParams, function(err, data) {
            if (err) {
                console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
            }
        });
      });
  }
});


