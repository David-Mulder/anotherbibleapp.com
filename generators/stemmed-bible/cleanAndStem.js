var stopWords = ["a","about","above","after","again","against","all","am","an","and","any","are","aren't","as","at","be","because","been","before","being","below","between","both","but","by","can't","cannot","could","couldn't","did","didn't","do","does","doesn't","doing","don't","down","during","each","few","for","from","further","had","hadn't","has","hasn't","have","haven't","having","he","he'd","he'll","he's","her","here","here's","hers","herself","him","himself","his","how","how's","i","i'd","i'll","i'm","i've","if","in","into","is","isn't","it","it's","its","itself","let's","me","more","most","mustn't","my","myself","no","nor","not","of","off","on","once","only","or","other","ought","our","ours","ourselves","out","over","own","same","shan't","she","she'd","she'll","she's","should","shouldn't","so","some","such","than","that","that's","the","their","theirs","them","themselves","then","there","there's","these","they","they'd","they'll","they're","they've","this","those","through","to","too","under","until","up","very","was","wasn't","we","we'd","we'll","we're","we've","were","weren't","what","what's","when","when's","where","where's","which","while","who","who's","whom","why","why's","with","won't","would","wouldn't","you","you'd","you'll","you're","you've","your","yours","yourself","yourselves"];

var removeStopWords = function(word){
  if(stopWords.indexOf(toLowerCase(word)) > -1){
    return "";
  }else{
    return word;
  }
};

var toLowerCase = function(word){
  return word.toLowerCase();
};

var removeEmptyElements = function(string){
  return string.length;
};

var capitalize = function(str){
  return str.charAt(0).toUpperCase() + str.slice(1);
}

var smartStemmerIncludingOriginalWOrd = function(word){
  var stemmed = smartStemmer(word);
  stemmed = toLowerCase(stemmed);
  if(stemmed === word){
    return stemmed;
  }else{
    if(capitalize(stemmed) === word){
      return stemmed + '=' + '^';
    }else{
      return stemmed + '=' + word.replace(stemmed, '$')
    }
  }
  //return stemmed === word ? stemmed : stemmed + '=' + word.replace(stemmed, '$');
}

fetch("./plainBible.txt").then(function(response){
  return response.text();
}).then(function(text){
  // remove notes
  text = text.replace(/<note.*?>/g,"");
  text = text.replace(/[{}\[\]]/g,"");
  text = text.replace(/----------------------------------------------------------------------------------------------\n.*?\n----------------------------------------------------------------------------------------------\n/g,"");
  text = text.replace(/\nCHAPTER [0-9][0-9]?[0-9]?/g,"");
  text = text.replace(/\n\n/g,"\n");
  text = text.replace(/\n\n/g,"\n");
  text = text.replace(/[,\.!;()?'"]/g,"");
  text = text.replace(/--/g," ");
  text = text.replace(/([a-zA-Z]):/g,"$1");
  text = text.replace(/\n[a-zA-Z]{1,4} [0-9]{1,3}\n/g,"\n");
  text = text.replace(/\n /g," ");
  text = text.replace(/\n\n/g,"");

  //add chapter numbers to single chapter books
  var singleChapterBooks = ['Ob', 'Phm', '2 Jn', '3 Jn', 'Jud'];
  singleChapterBooks.forEach(function(book){
    text = text.replace(new RegExp('^'+book+' ', 'gm'),book+' 1:');
  });

  var verseMatch = /^([0-9]?.*?([0-9]|title))\s(.*)$/;
  text = text.split("\n").map(function(line, i){
    var result = verseMatch.exec(line);
    if(result) {
      var verseText = result[3];
      var verseRef = result[1];
      var words = verseText.split(/\s/);
      return verseRef + "| " + words.map(removeStopWords).map(smartStemmerIncludingOriginalWOrd).filter(removeEmptyElements).join(" ") + " ";
    }
  }).join("\n");

  document.write("<pre>"+text);

});
