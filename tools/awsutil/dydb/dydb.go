package dydb

import (
	// AWS packages
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
)

type Map map[string]interface{}

func CreateTable(tableName string) error {
	// Initialize a session that the SDK will use to load
	// credentials from the shared credentials file ~/.aws/credentials
	// and region from the shared configuration file ~/.aws/config.
	sess := session.Must(session.NewSessionWithOptions(session.Options{
		SharedConfigState: session.SharedConfigEnable,
	}))

	// Create DynamoDB client
	svc := dynamodb.New(sess)

	// Create table
	input := &dynamodb.CreateTableInput{
		AttributeDefinitions: []*dynamodb.AttributeDefinition{
			{
				AttributeName: aws.String("Id"),
				AttributeType: aws.String("S"),
			},
		},
		KeySchema: []*dynamodb.KeySchemaElement{
			{
				AttributeName: aws.String("Id"),
				KeyType:       aws.String("HASH"),
			},
		},
		ProvisionedThroughput: &dynamodb.ProvisionedThroughput{
			ReadCapacityUnits:  aws.Int64(10),
			WriteCapacityUnits: aws.Int64(10),
		},
		TableName: aws.String(tableName),
	}

	if _, err := svc.CreateTable(input); err != nil {
		return err
	}

	// Wait until table is created.
	describeParams := &dynamodb.DescribeTableInput{
		TableName: aws.String(tableName),
	}
	if err := svc.WaitUntilTableExists(describeParams); err != nil {
		return err
	}

	return nil
}

func DeleteTable(tableName string) error {
	// Initialize a session that the SDK will use to load
	// credentials from the shared credentials file ~/.aws/credentials
	// and region from the shared configuration file ~/.aws/config.
	sess := session.Must(session.NewSessionWithOptions(session.Options{
		SharedConfigState: session.SharedConfigEnable,
	}))

	// Create DynamoDB client
	svc := dynamodb.New(sess)

	// Delete table
	deleteParams := &dynamodb.DeleteTableInput{
		TableName: aws.String(tableName),
	}
	if _, err := svc.DeleteTable(deleteParams); err != nil {
		return err
	}

	// Wait until table is deleted.
	describeParams := &dynamodb.DescribeTableInput{
		TableName: aws.String(tableName),
	}
	if err := svc.WaitUntilTableNotExists(describeParams); err != nil {
		return err
	}

	return nil
}

func PutItems[T any](tableName string, items *[]T) error {
	// Initialize a session that the SDK will use to load
	// credentials from the shared credentials file ~/.aws/credentials
	// and region from the shared configuration file ~/.aws/config.
	sess := session.Must(session.NewSessionWithOptions(session.Options{
		SharedConfigState: session.SharedConfigEnable,
	}))

	// Create DynamoDB client
	svc := dynamodb.New(sess)

	// Add each item to the dynamodb table
	for _, item := range *items {
		if av, err := dynamodbattribute.MarshalMap(item); err != nil {
			return err
		} else {
			// Create item in table Movies
			input := &dynamodb.PutItemInput{
				Item:      av,
				TableName: aws.String(tableName),
			}

			if _, err = svc.PutItem(input); err != nil {
				if err != nil {
					return err
				}
			}
		}
	}

	return nil
}
