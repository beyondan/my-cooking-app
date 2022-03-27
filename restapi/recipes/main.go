package main

import (
	"context"
	"log"
	"os"

	// Local packages
	"github.com/beyondan/yorilab/restapi/recipes/handlers"

	// AWS packages
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
)

var (
	dydb   *dynamodb.DynamoDB
	region string = os.Getenv("AWS_REGION")
)

func main() {
	sess, err := session.NewSession(&aws.Config{
		Region: aws.String(region)})

	if err != nil {
		log.Printf("Failed to create new AWS session. Error: %s\n", err)
		return
	}

	dydb = dynamodb.New(sess)
	lambda.Start(handler)
}

// Handler is our lambda handler invoked by the `lambda.Start` function call
func handler(
	ctx context.Context,
	req events.APIGatewayProxyRequest,
) (
	*events.APIGatewayProxyResponse,
	error,
) {
	switch req.HTTPMethod {
	case "GET":
		return handlers.GetRecipes(ctx, req, dydb)
	case "POST":
		return handlers.PostRecipes(ctx, req, dydb)
	default:
		return handlers.UnhandledMethod()
	}
}
