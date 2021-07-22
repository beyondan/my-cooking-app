"use strict";

const AWS = require('aws-sdk');
const uuid = require("uuid/v4");
const docClient = new AWS.DynamoDB.DocumentClient({region: "us-west-1"});

module.exports.handler = async (event, context, callback) => {
  docClient.put({
    TableName: 'recipes',
    Item: {
      id: uuid(),
      author: 'Daniel Byun',
      title: event.title,
      summary: event.summary,
      uploaded: Date.now(),
    },
  }, (err, data) => {
    if (err) console.log(err, err.stack);
    else console.log(data);
  });

  docClient.batchWrite({
    RequestItems: {
      'steps': event.steps.reduce((acc, []) => ([...acc, {
        PutRequest: {
          Item: {
            id: uuid(),
            sid: step.sid,
            rid: step.rid,
            stepText: step.stepText,
          },
        }
      }]))
    }
  }, (err, data) => {
    if (err) console.log(err, err.stack);
    else console.log(data);
  });

  docClient.batchWrite({
    RequestItems: {
      'ingredients': event.ingredients.reduce((acc, []) => ([
        ...acc, 
        {
          PutRequest: {
            Item: {
              id: uuid(),
              iid: ingr.iid,
              rid: ingr.rid,
              amount: ingr.amount,
              name: ingr.name,
            },
          }
        }
      ]))
    }
  }, (err, data) => {
    if (err) console.log(err, err.stack);
    else console.log(data);
  });

  callback(null, {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: ""
  });
};
