package recipedb

import (
	// Standard packages
	"encoding/json"
	"errors"
	"fmt"

	// AWS packages
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
)

type Map map[string]interface{}
type Recipe struct {
	Id          string
	CreatedBy   Map
	CreatedOn   int
	Images      []Map
	Ingredients []Map
	Steps       []Map
	Summary     string
	Title       string
}

const tableName = "Recipes"

func FetchRecipe(
	id string,
	dydb *dynamodb.DynamoDB,
) (
	*Recipe,
	error,
) {
	input := &dynamodb.GetItemInput{
		Key: map[string]*dynamodb.AttributeValue{
			"Id": {
				S: aws.String(id),
			},
		},
		TableName: aws.String(tableName),
	}

	result, err := dydb.GetItem(input)
	if err != nil {
		return nil, errors.New(fmt.Sprintf(
			"Failed to get recipe [%s] from database. Error: %s", id, err))
	}

	if len(result.Item) == 0 {
		return nil, nil
	}

	recipe := new(Recipe)
	err = dynamodbattribute.UnmarshalMap(result.Item, recipe)
	if err != nil {
		return nil, errors.New(fmt.Sprintf(
			"Failed to unmarshal recipe [%s]. Error: %s", id, err))
	}

	return recipe, nil
}

func FetchRecipes(
	dydb *dynamodb.DynamoDB,
) (
	*[]Recipe,
	error,
) {
	input := &dynamodb.ScanInput{
		TableName: aws.String(tableName),
	}
	result, err := dydb.Scan(input)
	if err != nil {
		return nil, errors.New(fmt.Sprintf(
			"Failed to scan table %s. Error: %s", tableName, err))
	}
	recipes := new([]Recipe)
	err = dynamodbattribute.UnmarshalListOfMaps(result.Items, recipes)
	if err != nil {
		return nil, errors.New(fmt.Sprintf(
			"Failed to unmarshal list of recipes. Error: %s", err))
	}
	return recipes, nil
}

func CreateRecipe(
	reqBody string,
	dydb *dynamodb.DynamoDB,
) (
	*Recipe,
	error,
) {
	// Parse request body
	var newRecipe Recipe
	if err := json.Unmarshal([]byte(reqBody), &newRecipe); err != nil {
		return nil, errors.New(fmt.Sprintf(
			"Failed to unmarshal request body. Error: %s", err))
	}

	// Check if recipe already exists
	existingRecipe, err := FetchRecipe(newRecipe.Id, dydb)
	if err != nil {
		return nil, err
	}
	if existingRecipe != nil {
		return nil, errors.New("Recipe already exists.")
	}

	// Save recipe
	av, err := dynamodbattribute.MarshalMap(newRecipe)
	if err != nil {
		return nil, errors.New(fmt.Sprintf(
			"Failed to marshal recipe. Error: %s", err))
	}
	input := &dynamodb.PutItemInput{
		Item:      av,
		TableName: aws.String(tableName),
	}
	_, err = dydb.PutItem(input)
	if err != nil {
		return nil, errors.New(fmt.Sprintf(
			"Failed to put recipe in database. Error: %s", err))
	}

	return &newRecipe, nil
}
