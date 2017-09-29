sayitURL="http://markdai.sayit.mysociety.org"
username="markdai"
password="xxxxxxxx"
akomantosoLocation="https://raw.githubusercontent.com/audreyt/archive.tw/gh-pages/2015-08-23-%E6%BC%94%E8%AC%9B-%E9%96%8B%E6%94%BE%5E%E8%B3%87%E6%96%99.an.xml"

csrf=`curl -v -c cookies.txt -b cookies.txt ${sayitURL}/accounts/login/|grep csrf|sed 's/^ *//;s/ *$//'`
tmp="${csrf/<input type=\'hidden\' name=\'csrfmiddlewaretoken\' value=\'/}"
csrf_token="${tmp/\' \/>/}"

curl -v -L -c cookies.txt -b cookies.txt \
    -d "login=markdai&password=f155155&csrfmiddlewaretoken="$csrf_token \
    $sayitURL/accounts/login/


csrf=`curl -v -c cookies.txt -b cookies.txt ${sayitURL}/import/akomantoso|grep csrf|sed 's/^ *//;s/ *$//'`
tmp="${csrf/<input type=\'hidden\' name=\'csrfmiddlewaretoken\' value=\'/}"
csrf_token="${tmp/\' \/>/}"

curl -v -L -c cookies.txt -b cookies.txt \
    -d "existing_sections=replace&location="$akomantosoLocation"&csrfmiddlewaretoken="$csrf_token \
    $sayitURL/import/akomantoso

rm -rf cookies.txt