#!/usr/bin/env perl -C
use utf8;
while (<>) { print
    s{\[([^\]]+)\][（\(](https?:[^\)]+)[\)）]}{<a href="$2">$1</a>}rg =~
    s{\[([^\]]+)\][（\(]<a href="(https?:[^"]+)">[^\)）]+[\)）]}{<a href="$2">$1</a>}rg =~
    s{(?<!href=")(https?[-=_;&?.:/#%0-9a-zA-Z]+)}{<a href="$1">$1</a>}rg =~
    s{DIGI(\+|＋)}{DIGI⁺}r
}
