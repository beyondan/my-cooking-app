.PHONY: build clean deploy

build:
	go get ./...
	go mod vendor
	env GOOS=linux go build -ldflags="-s -w" -o bin/recipes main.go

clean:
	rm -rf ./bin ./vendor

deploy: clean build
	sls deploy --verbose
