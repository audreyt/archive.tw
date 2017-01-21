#!/usr/bin/env perl
while (<>) {
    next if /crosstalk/;
    print (
        (s/^\[(.*)\]/($1)/ or s/:  /:\n  /)
            ? $/ : "    "
    );
    print;
}
