use 5.12.0;
use warnings;
use URI::Escape;

my $rand = rand();
my $akomantosoURL = shift or die "Usage: $0 <url>";

my $sayitURL = $ENV{SAYIT_URL} || "http://sayit.archive.tw";
my $username = uri_escape($ENV{SAYIT_USERNAME} || "root");
my $password = uri_escape($ENV{SAYIT_PASSWORD} || die "SAYIT_PASSWORD environment variable not set");

my $token = `curl -v -c cookies.txt -b cookies.txt ${sayitURL}/accounts/login/?$rand|grep csrf|sed 's/^ *//;s/ *\$//'`;
$token =~ m!<input type='hidden' name='csrfmiddlewaretoken' value='(.+)' />! or die "cannot find CSRF token";
$token = $1;

system(curl =>
    qw[-v -L -c cookies.txt -b cookies.txt],
    -d => "username=$username&password=$password&csrfmiddlewaretoken=$token",
    "$sayitURL/accounts/login/",
);

$token = `curl -v -c cookies.txt -b cookies.txt $sayitURL/import/akomantoso?$rand`;
$token =~ m!<input type='hidden' name='csrfmiddlewaretoken' value='(.+)' />! or die "cannot find CSRF token";
$token = $1;

system(curl =>
    qw[-v -L -c cookies.txt -b cookies.txt],
    -d => "existing_sections=replace&location=$akomantosoURL&csrfmiddlewaretoken=$token",
    "$sayitURL/import/akomantoso",
);

system(rm => -rf => 'cookies.txt');
