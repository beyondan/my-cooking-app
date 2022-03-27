
services=$@
thisDir=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

if [[ $# -lt 1 ]]; then
  for d in $thisDir/*/ ; do
    echo "cd $d; make deploy"
    (cd $d; make deploy)
  done
else
  for s in $services ; do
    echo "cd $thisDir/$s/; make deploy"
    (cd $thisDir/$s; make deploy)
  done
fi
