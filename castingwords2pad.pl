#!/usr/bin/env perl
use utf8;
use 5.14.0;
binmode STDOUT, ':utf8:eol(LF)';
print ~~<>;
my %names;
while (<>) {
    utf8::decode($_);
    next if /^\s*$/;
    next if /crosstalk/;
    if (/((?:\s\w\.|[-'\w ]+)*):/) {
        my $n = $1;
        if ($n =~ / /) {
            $names{$n =~ s/ .*//r} = $n;
        }
        elsif (my $fullname = $names{$n}) {
            s/(?:\s\w\.|[-'\w ]+)*:/$fullname:/;
        }

    }
    print (
        (s/^\[(.*)\]/($1)/ or s/^(?:\s\w\.|[-'\w ]+)*\K: +/:\n    /)
            ? $/ : "    "
    );
    print;
}
