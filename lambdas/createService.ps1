
param (
  [Parameter(Mandatory=$true)][string]$serviceName
)

serverless create --template aws-nodejs --path services\$serviceName
