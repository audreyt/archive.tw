function cw2pad(x){

  var out, i$, ref$, len$, ln, replace$ = ''.replace;
  out = '';
  var names = {};
  ref$ = x.split(/\n+/);
  if ((ref$.length > 0) && (!/[：:]/.exec(ref$[0]))) {
    out += (ref$.shift() + "\n");
  }
  for (i$ = 0, len$ = ref$.length; i$ < len$; ++i$) {
    ln = ref$[i$];
    if (/^\s*$/.exec(ln)) {
      continue;
    }
    if (/[\(\[]crosstalk[\)\]]/.exec(ln)) {
      continue;
    }
    if (/[-'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ\w ]+:(?!\d)/.exec(ln) && /^((?:\s\w\.|[-'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ\w ]+)+):(?!\d)/.exec(ln)) {
      var n = RegExp.$1;
      if (/ /.test(n)) {
        names[n.replace(/ .*/, '')] = n;
      }
      else if (names[n]) {
        ln = replace$.call(ln, /^(?:\s\w\.|[-'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ\w ]+)+:/, (names[n] + ':'));
      }
    }

    if (/^\[(.*)\]/.exec(ln)) {
      out += "\n" + (replace$.call(ln, /^\[(.*)\]/, '($1)')) + "\n";
      continue;
    }
    if (/[-'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ\w ]+:(?!\d)/.exec(ln) && /^(?:\s\w\.|[-'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ\w ]+)+: +/.exec(ln)) {
      out += "\n" + (replace$.call(ln, /^((?:\s\w\.|[-'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ\w ]+)+): +/, "$1:\n    ")) + "\n";
      continue;
    }
    if (/\S/.exec(ln))  {
      out += "    " + ln + "\n";
      continue;
    }
  }
  return out;
}

function pad2md(x){
  var out, i$, ref$, len$, ln, replace$ = ''.replace;
  out = '';
  for (i$ = 0, len$ = (ref$ = x.split(/\n+/)).length; i$ < len$; ++i$) {
    ln = ref$[i$];
    if (/^[🌐📅🏡]|^:::/.exec(ln)) {
	out += ln + "\n";
      continue;
    }
    if (/^((?:19|2[0-9])\d{2})-(1[012]|0[1-9])-(3[01]|[12][0-9]|0?[1-9])/.exec(ln)) {
      out += "# " + ln + "\n\n";
      continue;
    }
    if (/^\s+/.exec(ln)) {
      out += (replace$.call(ln, /^\s+/, '').replace(/\]（(.*?)）/g, ']($1)')) + "\n\n";
      continue;
    }
    if (/[：:]\s*$/.exec(ln)) {
      out += "### " + (replace$.call(ln, /([：:])\s+$/, '$1')) + "\n";
      continue;
    }
    if (/^[（(]/.exec(ln)) {
	out += "> " + ln + "\n\n";
      continue;
    }
    if (/^[【[]/.exec(ln)) {
	out += "\n" + ln + "\n\n";
      continue;
    }
    if (/\S/.exec(ln))  {
	out += ":::warning\n" + ln + "\n:::\n\n";
      continue;
    }
  }

  return out;
}

function md2pad(x){
  var out, i$, ref$, len$, ln, replace$ = ''.replace;
  out = '';
  x = replace$.call(x, /^#+\s+/, '# ');
  for (i$ = 0, len$ = (ref$ = x.split(/\n+/)).length; i$ < len$; ++i$) {
    ln = ref$[i$];
    if (/^[【🌐📅🏡]|^:::/.exec(ln)) {
      continue;
    }
    if (/^###\s+/.exec(ln)) {
      out += "\n" + (replace$.call(ln, /^###\s+/, '')) + "\n";
      continue;
    }
    if (/^#\s+/.exec(ln)) {
        out += (replace$.call(ln, /^#\s+/, '')) + "\n\n";
      continue;
    }
    if (/^>\s+/.exec(ln)) {
        out += "\n" + (replace$.call(ln, /^>\s+/, '')) + "\n";
      continue;
    }
    if (/^【/.exec(ln)) {
        out += "\n" + ln + "\n\n";
      continue;
    }
    if (/^[🌐📅🏡]|^:::/.exec(ln)) {
	out += ln + "\n";
      continue;
    }
    if (/\S/.exec(ln))  {
	out += "    " + ln + "\n";
      continue;
    }
  }

  return out;
}
