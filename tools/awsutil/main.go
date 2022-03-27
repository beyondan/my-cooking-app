package main

import (
	// Standard packages
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"

	// Local packages
	"github.com/beyondan/yorilab/tools/awsutil/dydb"

	// AWS packages
	"github.com/aws/aws-sdk-go/aws/awserr"
	"github.com/aws/aws-sdk-go/service/dynamodb"
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
func getRecipes() *[]Recipe {
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

func LoadRecipes(tableName string) {
	recipes := getRecipes()
	op := fmt.Sprintf("PutItems(\"%s\", &recipes)", tableName)
	if err := dydb.PutItems(tableName, recipes); err != nil {
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

func main() {
	const tableName = "Recipes"

	DeleteTable(tableName)
	CreateTable(tableName)
	LoadRecipes(tableName)
}
