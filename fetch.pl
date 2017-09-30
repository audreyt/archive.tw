#!/usr/bin/env perl
use 5.12.0;
use XML::Simple 'XMLin';
my $url = shift or die "Usage: $0 <hackpad-url>";
my $xml = `curl http://pad.archive.tw:8080/$url`;
my $heading = XMLin($xml)->{debate}{debateBody}{debateSection}{heading};
$heading =~ s/\s+/-/g;
open(OUT, "| perl add-links.pl > $heading.an.xml");
print OUT $xml;
close OUT;
exec("vim $heading.an.xml && git add $heading.an.xml");
