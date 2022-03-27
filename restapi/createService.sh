#!/bin/bash
serviceName=$1
thisDir=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

serverless create --template aws-go-dep --path $thisDir/$serviceName
