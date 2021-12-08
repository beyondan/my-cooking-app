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
 * GET /recipes
 */
module.exports.getRecipes = async (event) => {
  console.log(event);

  let recipes = null;
  let error = null;

  await dydb.scan({
    TableName: 'recipes',
    ProjectionExpression: 'id, title, summary, chef, uploaded, images',
  }).promise()
  .then(data => {
    recipes = data.Items;
  })
  .catch(err => {
    error = err;
  });

  let resp = null;

  if (error) {
    console.error(`Function failed. Error: ${error}`);
    resp = response(500, error);
  }
  else if (!recipes) {
    console.error('Function failed. {recipes} is null.');
    resp = response(404, 'No recipe found.');
  }
  else {
    console.log('Function success.');
    resp = response(200, JSON.stringify(recipes));
  }

  console.log(`Response: ${JSON.stringify(resp, null, 2)}`);
  return resp;
}


/*
 * GET /recipe/{id}
 */
module.exports.getRecipe = async (event) => {
  console.log(event);

  const { id } = event.pathParameters;

  let recipe = null;
  let error = null;

  await dydb.get({
    TableName: 'recipes',
    Key: { 'id': id },
    ProjectionExpression: 
    'id, chef, images, ingredients, steps, summary, title, uploaded',
  }).promise()
  .then(data => {
    recipe = data.Item;
  })
  .catch(err => {
    error = err;
  });

  let resp = null;

  if (error) {
    console.error(`Function failed. Error: ${error}`);
    resp = response(500, error);
  }
  else if (!recipe) {
    console.error('Function failed. {recipe} is null.');
    resp = response(404, 'No recipe found.');
  }
  else {
    console.log('Function success.');
    resp = response(200, JSON.stringify(recipe));
  }

  console.log(`Response: ${JSON.stringify(resp, null, 2)}`);
  return resp;
}


/*
 * POST /recipes
 */
module.exports.postRecipe = async (event) => {
  console.log(event);

  let req = JSON.parse(event.body);
  let res = null;

  await dydb.put({
    TableName: 'recipes',
    Item: {
      id: req.id,
      author: req.author,
      title: req.title,
      summary: req.summary,
      uploaded: Date.now().toString(),
      images: req.images,
      ingredients: req.ingredients,
      steps: req.steps,
    },
  }).promise()
  .then(data => {
    console.log('Function success.');
    res = response(200, JSON.stringify(data));
  })
  .catch(err => {
    console.error(`Function failed. Error: ${err}`);
    res = response(500, err);
  });

  console.log(`Response: ${JSON.stringify(res, null, 2)}`);
  return res;
}
