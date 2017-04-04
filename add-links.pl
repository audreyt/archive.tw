while (<>) { print s!(https?[-.:/#%0-9a-zA-Z]+)!<a href="$1">$1</a>!r }
