#!/usr/bin/env perl
use 5.12.0;
use warnings;
use URI::Escape;

die "upload.pl needs to be present in the current directory" unless -e 'upload.pl';

open my $fh, '<', '.git/HEAD' or die "Please run $0 in a checked-out github repo with .an.xml files";
<$fh> =~ m{ref: refs/heads/(.+)} or die "Cannot parse current branch";
my $branch = $1;
close $fh;

`git remote -v` =~ m{github\.com[/:](.*?)\.git \(fetch\)} or die "Cannot parse remote (needs to be in github)";
my $baseURL = "https://raw.githubusercontent.com/$1/$branch/";

`git config core.quotepath off`;

while (1) {
    my $pulled = `git pull`;
    unless ($pulled =~ /([a-f0-9]{7}\.\.[a-f0-9]{7})/) {
        sleep 60; next;
    }
    my $from_to = $1;
    my @xmls = grep { chomp; -s } `git diff --name-only $from_to | grep .an.xml\$` or do { sleep 60; next };
    for (@xmls) { chomp; system($^X, "upload.pl" => ($baseURL . uri_escape($_))); }
    #    system "rm -rf /var/cache/nginx/*; service nginx reload";
}
