use 5.12.0;
#  • 科技新聞通訊社-林鴻仁's avatar image.科技新聞通訊社-林鴻仁 asked Audrey Tang:
##    Audrey Tang's avatar image.Audrey Tang•Jan 26Taiwan’s Digital Minister
#  • Anonymous asked Audrey Tang:
##    Anonymous profile image
##    Anonymous•Dec 27
use utf8;
my ($id, $title, $user, $body, @replies);
my ($r_user, $r_body, $r_date);
my @parsed;
open my $fh, '<:utf8', "wiselike-2017-01-30-backup.txt";
while (<$fh>) {
    if (/• (.+) asked Audrey Tang:/) {
        if ($r_user) { push @replies, { user => $r_user, date => $r_date, body => $r_body }; }
        if (@replies) {
            push @parsed, { id => $id, title => $title, user => $user, replies => [@replies] };
            @replies = ();
        }
        $id = $title = $user = $body = $r_user = $r_body = $r_date = '';
        $user = $1;
        $user =~ s/.*avatar image.//;
        chomp($title = <$fh>) until $title;
        $title =~ s/^\s*//;
    }
    elsif (/(.+?)•([A-Za-z]+?\s\d+)/) {
        if ($r_user) { push @replies, { user => $r_user, date => $r_date, body => $r_body }; }
        $r_user = $1;
        $r_date = $2;
        $r_body = '';
        $r_user =~ s/.*avatar image\.|^\s*//;
        $r_date =~ s/Jan\s(\d+)/Jan $1 2017/;
        $r_date =~ s/([A-Za-z]+?\s\d+)$/$1 2016/;
    }
    elsif (m{\[http://wslk.io/(.+)\]}) {
        $id = $1;
    }
    elsif (m!Appreciated? \(\d+|'s avatar image|\[\s{10}\s*\]|•Edit|Anonymous profile image|Appreciate•!) {
        next;
    }
    elsif ($r_user) {
        s/^\s*//;
        $r_body .= $_;
    }
    else {
        s/^\s*//;
        $body .= $_;
    }
}

if ($r_user) { push @replies, { user => $r_user, date => $r_date, body => $r_body }; }
if (@replies) { push @parsed, { id => $id, title => $title, user => $user, replies => \@replies }; }
use JSON;
print encode_json(\@parsed);
__DATA__
# "id", "title", "user", "body", "replies": [ "user", "body", "date" ]

