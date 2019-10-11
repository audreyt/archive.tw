function cw2pad(x){

  var out, i$, ref$, len$, ln, replace$ = ''.replace;
  out = '';
  var names = {};
  ref$ = x.split(/\n+/);
  if ((ref$.length > 0) && (!/[：:]/.exec(ref$[0]))) {
    out += (ref$.shift() + "\n");
    out += ':::info\n'
         + '🌐 This is a collaborative editor for the meeting transcript. If you want to adjust your own speech, please click on the "Pencil" icon at the top left corner to start editing. The system automatically saves each edit. It is scheduled to be released on XXXX-XX-XX and will be published at https://pdis.nat.gov.tw/track/ to the [public domain](https://github.com/audreyt/archive.tw/blob/gh-pages/LICENSE). Thank you for your contribution to the commons.\n'
         + ':::\n';
  }
  for (i$ = 0, len$ = ref$.length; i$ < len$; ++i$) {
    ln = ref$[i$];
    if (/^\s*$/.exec(ln)) {
      continue;
    }
    if (/[\(\[]crosstalk[\)\]]/.exec(ln)) {
      continue;
    }
    if (/(?:[A-Z]\w*\.)*[-'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ\w ]+:(?!\d)/.exec(ln) && /^((?:[A-Z]\w*\.\s?)*)((?:\s\w\.|[-'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ\w ]+)+):(?!\d)/.exec(ln)) {
      var p = RegExp.$1; // honorific prefix, if any
      var n = RegExp.$2;
      if (/ /.test(n)) {
        names[n.replace(/ .*/, '')] = p + n;
      }
      else if (names[n]) {
        ln = replace$.call(ln, /^(?:[A-Z]\w*\.)*(?:\s\w\.|[-'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ\w ]+)+:/, (names[n] + ':'));
      }
    }

    if (/^\[(.*)\]/.exec(ln)) {
      out += "\n" + (replace$.call(ln, /^\[(.*)\]/, '($1)')) + "\n";
      continue;
    }
    if (/(?:[A-Z]\w*\.)*[-'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ\w ]+:(?!\d)/.exec(ln) && /^(?:[A-Z]\w*\.)*(?:\s\w\.|[-'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ\w ]+)+: +/.exec(ln)) {
      out += "\n" + (replace$.call(ln, /^((?:[A-Z]\w*\.)*(?:\s\w\.|[-'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ\w ]+)+): +/, "$1:\n    ")) + "\n";
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
  var labels = [];
  var ids = [];
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
	if (/^(##)/.exec(ln))  {
      var label = (/([^#]*)$/).exec(ln)[0]
      var text = ln.replace(/^##/, '').match(/#(.*?)#/)[1]
      out += '<a ' + label + '="' + text + '"/> \n\n'
      labels.push(label)
          continue;
    }
    if (/(#.*){2}/.exec(ln)) {
      var label = ''
      labels.map( lb => {
        if ((/([^#]*)$/).exec(ln)[0].match(lb) !== null) {
          label = (/([^#]*)$/).exec(ln)[0].match(lb)
        }
      })
      var text = ln.match(/#(.*?)#/)[1]
      var strCount = 2
      var id = text.substring(0, strCount)
      if (ids.length != 0) {
        ids.map( i => {
          if (i.includes(id)) {
            strCount++
          }
          id = text.substring(0, strCount)
        })
      }
      ids.push(id)
      var tag = '<a name="'+ label +'" id="' + id + '">' + text + '</a>'
      out += ln.replace(/\s+/,'').replace(label,'').replace(text,tag).replace(/#/g,'') +'\n\n'
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

  return genGraphviz(out);
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

const md2json = (x) => {
	let output = {
		'topics':[],
		'contexts':[]
	}
	let lines = x.split('\n')
	let speaker = ''
	lines.map( line => {
		let lineOutput = {}
		let category = ''
		let text = ''
		// speaker
		if ((/^###/).exec(line)) {
			speaker = line.replace(/###|\s/g, '')
			return
		}
	  else {
			if ((/id="/).exec(line)) {
				// <a category id="id">text</a>
				if ((/<\/a>/).exec(line)) {
					category = line.match(/<a (.*?) id="/)[1]
					text = line.match(/>(.*?)<\/a>/)[1]
					id = line.match(/id="(.*?)"/)[1]
					lineOutput = {
						'id': id,
						'speaker': speaker,
						'category': category,
						'text': text
					}
					output.contexts.push(lineOutput)
					return
				}
				// <a category id="id"/>text
				if ((/\/>/).exec(line)) {
					category = line.match(/<a (.*?) id=">/)[1]
					text = line.replace(line.match(/<a (.*?)\/>/)[0],'')
					id = line.match(/id="(.*?)"/)[1]
					lineOutput = {
						'id': id,
						'speaker': speaker,
						'category': category,
						'text': text
					}
					output.contexts.push(lineOutput)
					return
				}
			} else {
				if ((/="/).exec(line)) {
					// <a category="text"/>
					category = line.match(/<a (.*?)=/)[1]
					text = line.match(/="(.*?)"/)[1]
					lineOutput = {
						'category': category,
						'text': text
					}
					output.topics.push(lineOutput)
					return
				}
			}
		}
  })
	return output
}

const genGraphviz = (x) => {
  let output = md2json(x);
  if ((output.topics || []).length == 0) { return x; }
  let vizOutput = ''
	let graphviz = ''
	vizOutput += '【心智圖】 \n\n ```graphviz \n digraph test { \n nodesep=1.0 \n node [style=filled, fillcolor="#fff9b1", shape=box, color=none] \n '
	output.topics.map( topic => {
		vizOutput += '"' + topic.text + '" [label="' + topic.text + '"] \n'
		for (let i = 0; i < output.contexts.length; i++){
			if (topic.category == output.contexts[i].category) {
				vizOutput += '"' + output.contexts[i].speaker + output.contexts[i].text + '" [label="' + output.contexts[i].speaker + output.contexts[i].text + '", URL="#' + output.contexts[i].id  + '"] \n'
				if (_.findIndex(_.groupBy(output.contexts, 'category')[output.contexts[i].category], {'text': output.contexts[i].text}) == 0) {
					vizOutput += '"' + topic.text + '" -> "' + output.contexts[i].speaker + output.contexts[i].text + '" \n'
				} else {
					vizOutput += '"' + output.contexts[i-1].speaker + output.contexts[i-1].text + '" -> "' + output.contexts[i].speaker + output.contexts[i].text + '" \n'
				}
			}
		}
	})
	vizOutput += '} \n ``` \n\n'
	graphviz = x.replace((x.match(/【以下開始記錄】/) || [])[0], vizOutput + '【以下開始記錄】')
	return graphviz
}
