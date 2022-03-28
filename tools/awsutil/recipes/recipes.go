package recipes

import (
	// Standard packages
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"log"

	// Local packages
	"github.com/beyondan/yorilab/tools/awsutil/dydb"

	// AWS packages
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/awserr"
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

// Read ./data/Recipes.json and return the content.
func readRecipesData() *[]Recipe {
	raw, err := ioutil.ReadFile("./data/Recipes.json")
	if err != nil {
		log.Fatalf("Got error reading file: %s", err)
	}
	var recipes *[]Recipe
	json.Unmarshal(raw, recipes)
	return recipes
}

func DeleteTable(tableName string) {
	op := fmt.Sprintf("DeleteTable(\"%s\")", tableName)
	err := dydb.DeleteTable(tableName)
	if err != nil {
		if awserr, ok := err.(awserr.Error); ok {
			switch awserr.Code() {
			case dynamodb.ErrCodeResourceNotFoundException:
				log.Printf("SKIP - %s - TableNotFound\n", op)
			default:
				log.Fatalf("FAIL - %s\nError: %s\n", op, err)
			}
		}
	} else {
		log.Printf("PASS - %s\n", op)
	}
}

func CreateTable(tableName string) {
	op := fmt.Sprintf("CreateTable(\"%s\")", tableName)
	if err := dydb.CreateTable(tableName); err != nil {
		if awserr, ok := err.(awserr.Error); ok {
			switch awserr.Code() {
			default:
				log.Fatalf("FAIL - %s\nError: %s\n", op, err)
			}
		}
	} else {
		log.Printf("PASS - %s\n", op)
	}
}

const RecipesTableName = "Recipes"

func LoadRecipes() {
	recipes := readRecipesData()
	op := fmt.Sprintf("PutItems(\"%s\", &recipes)", RecipesTableName)
	if err := dydb.PutItems(RecipesTableName, recipes); err != nil {
		if awserr, ok := err.(awserr.Error); ok {
			switch awserr.Code() {
			default:
				log.Fatalf("FAIL - %s\nError: %s\n", op, err)
			}
		}
	} else {
		log.Printf("PASS - %s\n", op)
	}
}

func FetchRecipe(
	id string,
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
		TableName: aws.String(RecipesTableName),
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
