use 5.12.0;
#  • 科技新聞通訊社-林鴻仁's avatar image.科技新聞通訊社-林鴻仁 asked Audrey Tang:
use utf8;
my ($id, $title, $user, $body, @replies);
my ($r_user, $r_body, $r_date);
my @parsed;
open my $fh, '<:utf8', "wiselike-2017-01-30-backup.txt";
while (<$fh>) {
    #• Anonymous asked Audrey Tang:
   #Werjer Ting's avatar image.Werjer Ting asked Audrey Tang:
    if (/(?:avatar image.|• (?=Anonymous))(.+) asked .+:/) {
        if ($r_user) { push @replies, { user => $r_user, date => $r_date, body => $r_body }; }
        if (@replies) {
            push @parsed, { id => $id, title => $title, user => $user, replies => [@replies] };
            @replies = ();
        }
        $id = $title = $user = $body = $r_user = $r_body = $r_date = '';
        $user = $1;
        chomp($title = <$fh>) until $title;
        $title =~ s/^\s*//;
    }
    elsif (/avatar image\.(.+?)•([A-Za-z]+?\s\d+)/) {
        if ($r_user) { push @replies, { user => $r_user, date => $r_date, body => $r_body }; }
        $r_user = $1;
        $r_date = $2;
        $r_body = '';
    }
    elsif (m{\[http://wslk.io/(.+)\]}) {
        $id = $1;
    }
    elsif (m!Appreciated? \(\d+|'s avatar image|\[\s{10}\s*\]|•Edit!) {
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
# "id", "title", "user", "body", "replies": [ "user", "body" ]

