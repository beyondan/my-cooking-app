param (
  [String[]] $Services = $null
)

$thisDir = Get-Location

if (!$Services) {
  Get-ChildItem -Path $thisDir\services -Directory -ErrorAction SilentlyContinue | 
    ForEach-Object {
      $fullPath = $_.FullName
      Write-Host "cd $fullPath; serverless deploy"
      Set-Location $fullPath; serverless deploy;
    }
}
else {
  foreach ($service in $Services) {
    Write-Host "cd $thisDir\services\$service; serverless deploy"
    Set-Location $thisDir\services\$service; serverless deploy;
  }
}

Set-Location $thisDir

