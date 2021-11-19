"use strict";

const AWS = require('aws-sdk');
const dydb = new AWS.DynamoDB.DocumentClient({region: "us-west-1"});

const response = (statusCode, body) => ({
  statusCode: statusCode,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Content-Type': 'application/json'
  },
  body: body,
});

/*
 * GET /users/{id}
 */
module.exports.getUser = async (event) => {
  console.log(event);

  const { id } = event.pathParameters;

  let user = null;
  let error = null;

  await dydb.get({
    TableName: 'users',
    Key: { 'id': id }
  }).promise()
  .then(data => {
    user = JSON.stringify(data.Item);
  })
  .catch(err => {
    error = err;
  });

  let resp = null;

  if (error) {
    console.error(`Function failed. Error: ${error}`);
    resp = response(500, error);
  }
  else if (!user) {
    console.error('Function failed. {user} is null.');
    resp = response(404, 'No recipe found.');
  }
  else {
    console.log('Function success.');
    resp = response(200, JSON.stringify(user));
  }

  console.log(`Response: ${JSON.stringify(resp, null, 2)}`);
  return resp;
}
