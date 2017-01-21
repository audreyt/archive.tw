#!/usr/bin/env perl
print ~~<>;
while (<>) {
    next if /^\s*$/;
    next if /crosstalk/;
    print (
        (s/^\[(.*)\]/($1)/ or s/^[\w ]*\K: +/:\n    /)
            ? $/ : "    "
    );
    print;
}
