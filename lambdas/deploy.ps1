param (
  [String[]] $Services = $null
)

$thisDir = $(pwd)

if (!$Services) {
  Get-ChildItem -Path $thisDir\services -Directory -ErrorAction SilentlyContinue | 
    % {
      $fullPath = $_.FullName
      Write-Host "cd $fullPath; serverless deploy"
      cd $fullPath; serverless deploy;
    }
}
else {
  foreach ($service in $Services) {
    Write-Host "cd $thisDir\services\$service; serverless deploy"
    cd $thisDir\services\$service; serverless deploy;
  }
}

cd $thisDir

