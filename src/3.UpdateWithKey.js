var AWS = require("aws-sdk");

AWS.config.update({
  region: "eu-west-3",
});

var dynamodb = new AWS.DynamoDB

// Update the item, unconditionally,

var params = {
    TableName: "Movies",
    Key:{
      movies: { S: "movies" },
      title: { S: "Sabotage" },
    },
    UpdateExpression: "SET info.rating=:r",
    ExpressionAttributeValues:{
        ":r": { N: "12" },
    },
    ReturnValues:"UPDATED_NEW"
};

console.log("Updating the item...");
dynamodb.updateItem(params, function(err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    }
});
