while (<>) { print s!(https?\S+)!<a href="$1">$1</a>!r }
