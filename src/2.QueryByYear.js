var AWS = require("aws-sdk");

AWS.config.update({
  region: "eu-west-3",
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Querying for movies between 2000 and 2010.");

var params = {
    TableName : "Movies",
    IndexName: "ReleaseDate-index",
    KeyConditionExpression: "movies = :pk and #year between :start and :end",
    ExpressionAttributeNames:{
      "#year": "year",
  },
  ExpressionAttributeValues: {
      ":pk": "movies",
      ":start": 2000,
      ":end": 2010,
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
        });
    }
});
