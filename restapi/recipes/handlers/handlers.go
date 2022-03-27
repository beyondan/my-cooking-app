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
	req events.APIGatewayV2HTTPRequest,
	dydb *dynamodb.DynamoDB,
) (
	*events.APIGatewayV2HTTPResponse,
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
	req events.APIGatewayV2HTTPRequest,
	dydb *dynamodb.DynamoDB,
) (
	*events.APIGatewayV2HTTPResponse,
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
	*events.APIGatewayV2HTTPResponse,
	error,
) {
	return response(http.StatusMethodNotAllowed, "HTTP method not allowed")
}

func response(status int, bodyObj interface{}) (*events.APIGatewayV2HTTPResponse, error) {
	bodyBytes, _ := json.Marshal(bodyObj)
	bodyString := string(bodyBytes)
	return &events.APIGatewayV2HTTPResponse{
		StatusCode: status,
		Headers: map[string]string{
			"Content-Type": "application/json",
		},
		Body: bodyString,
	}, nil
}
