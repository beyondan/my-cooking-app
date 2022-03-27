package handlers

import (
	// Standard packages
	"context"
	"encoding/json"
	"net/http"

	// Local packages
	"github.com/beyondan/yorilab/restapi/recipes/recipedb"

	// AWS packages
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
)

const (
	ErrorMethodNotAllowed = "HTTP method not allowed"
)

func GetRecipes(
	ctx context.Context,
	req events.APIGatewayProxyRequest,
	dydb *dynamodb.DynamoDB,
) (
	*events.APIGatewayProxyResponse,
	error,
) {
	id := req.QueryStringParameters["id"]

	// Get single recipe
	if len(id) > 0 {
		recipe, err := recipedb.FetchRecipe(id, dydb)
		if err != nil {
			return response(
				http.StatusInternalServerError,
				aws.String(err.Error()))
		}
		return response(http.StatusOK, recipe)
	}

	// Get all recipes
	recipes, err := recipedb.FetchRecipes(dydb)
	if err != nil {
		return response(
			http.StatusInternalServerError,
			aws.String(err.Error()))
	}
	return response(http.StatusOK, recipes)
}

func PostRecipes(
	ctx context.Context,
	req events.APIGatewayProxyRequest,
	dydb *dynamodb.DynamoDB,
) (
	*events.APIGatewayProxyResponse,
	error,
) {
	newRecipe, err := recipedb.CreateRecipe(req.Body, dydb)
	if err != nil {
		return response(
			http.StatusInternalServerError,
			aws.String(err.Error()))
	}
	return response(http.StatusOK, newRecipe)
}

func UnhandledMethod() (
	*events.APIGatewayProxyResponse,
	error,
) {
	return response(http.StatusMethodNotAllowed, "HTTP method not allowed")
}

func response(status int, bodyObj interface{}) (*events.APIGatewayProxyResponse, error) {
	bodyBytes, _ := json.Marshal(bodyObj)
	bodyString := string(bodyBytes)
	return &events.APIGatewayProxyResponse{
		Headers: map[string]string{
			"Content-Type": "application/json",
		},
		StatusCode: status,
		Body:       bodyString,
	}, nil
}
