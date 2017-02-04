#!/usr/bin/env perl
use utf8;
print ~~<>;
binmode STDOUT, ':utf8';
while (<>) {
    utf8::decode($_);
    next if /^\s*$/;
    next if /crosstalk/;
    print (
        (s/^\[(.*)\]/($1)/ or s/^[-'\w ]*\K: +/:\n    /)
            ? $/ : "    "
    );
    print;
}
