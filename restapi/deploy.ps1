param (
  [String[]] $Services = $null
)

$thisDir = Get-Location

if (!$Services) {
  Get-ChildItem -Path $thisDir -Directory -ErrorAction SilentlyContinue | 
    ForEach-Object {
      $fullPath = $_.FullName
      Write-Host "cd $fullPath; make deploy"
      Set-Location $fullPath; make deploy;
    }
}
else {
  foreach ($service in $Services) {
    Write-Host "cd $thisDir\$service; make deploy"
    Set-Location $thisDir\$service; make deploy;
  }
}

Set-Location $thisDir
