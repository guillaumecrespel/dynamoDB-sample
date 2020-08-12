var AWS = require("aws-sdk");

AWS.config.update({
    region: "eu-west-3",
});

var dynamodb = new AWS.DynamoDB();

var params = {
  TableName : "Movies",
  //BillingMode: "PAY_PER_REQUEST",
  AttributeDefinitions: [       
    { AttributeName: "movies", AttributeType: "S" },
    { AttributeName: "title", AttributeType: "S" },
    { AttributeName: "year", AttributeType: "N" }
  ],
  KeySchema: [       
      { AttributeName: "movies", KeyType: "HASH"},  //Partition key
      { AttributeName: "title", KeyType: "RANGE" }  //Sort key
  ],
  /* add secondary index */
  GlobalSecondaryIndexes: [
    {
      IndexName: 'ReleaseDate-index',
      KeySchema: [
        {
          AttributeName: 'movies',
          KeyType: "HASH"
        },
        {
          AttributeName: 'year',
          KeyType: "RANGE"
        },
      ],
      Projection: {
        ProjectionType: "ALL"
      },
      ProvisionedThroughput: {
        "WriteCapacityUnits": 5,
        "ReadCapacityUnits": 10
      }
    },
  ],
  ProvisionedThroughput: {       
      ReadCapacityUnits: 10, 
      WriteCapacityUnits: 10
  }
};

dynamodb.createTable(params, function(err, data) {
  if (err) {
      console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
  } else {
      console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
  }
});
