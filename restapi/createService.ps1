
param (
  [Parameter(Mandatory=$true)][string]$serviceName
)

$thisDir = Get-Location

serverless create --template aws-go-dep --path $serviceName
