#!/usr/bin/env perl
use utf8;
binmode STDOUT, ':utf8';
while (<>) {
    utf8::decode($_);
    print
    s{\[([^\]]+)\][（\(]<a href="(https?:[^"]+?)">[^\)）]+[\)）]}{<a href="$2">$1</a>}rg =~
    s{\[([^\]]+)\][（\(](https?:[^\)]+?)[\)）]}{<a href="$2">$1</a>}rg =~
    s{(?<!href=")(?<!/)(https?[-=_;&?.:/#%0-9a-zA-Z]+)}{<a href="$1">$1</a>}rg =~
    s{DIGI(\+|＋)}{DIGI⁺}r
}
