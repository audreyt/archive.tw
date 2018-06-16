#!/usr/bin/env perl
while (<>) { print
    s!(https?[-=_;&?.:/#%0-9a-zA-Z]+)!<a href="$1">$1</a>!rg =~
    s!DIGI(\+|＋)!DIGI⁺!r
}
