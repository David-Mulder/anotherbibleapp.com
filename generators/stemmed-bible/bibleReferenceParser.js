var bibleReferenceParserRegex = new RegExp('^([a-zA-Z0-9 ]+?) ?(([0-9]*?)(([: ])(([0-9]*?)([\-\u2013]([0-9]*?))?)?)?)?$');

//var BibleReference = function(bookObject, chapter, verseStart, verseEnd){
var BibleReference = function(vs){
  //todo: can be shorter than 8 if leading 0
  if(/^[0-9]{8}$/.test(vs)){
    //numeric reference
    var book = parseInt(vs.toString().substring(0,2));
    var chapter = parseInt(vs.toString().substring(2,5));
    var verse = parseInt(vs.toString().substring(5,8));
    var verseStart = verse;
    var verseEnd = verse;
    var bookObject = bibleBooks[book-1];
  }else{
    //normal reference
    var matches = bibleReferenceParserRegex.exec(vs);
    if(matches){
      var bookObject = bibleBooks.findBook(matches[1]);
      if(bookObject && bookObject.matchQuality <= 20 && !matches[3]){
        bookObject = undefined;
      }
      var matchQuality = bookObject ? bookObject.matchQuality : 0;
      matchQuality += matches[3] ? 30 : 0;
      matchQuality += matches[6] ? 50 : 0;
      matchQuality -= matches[5] === ' ' ? 50 : 0;

      var chapter = parseInt(matches[3]);
      var verseStart = parseInt(matches[7]);
      var verseEnd = parseInt(matches[9]);
    }
  }

  this.book = bookObject;
  this.chapter = chapter;
  this.verse = verseStart;
  this.verseStart = verseStart;
  this.verseEnd = verseEnd;
};
BibleReference.prototype.toString = function(){
  return this.book.name + ' ' + this.chapter + ':' + this.verse;
};
BibleReference.prototype.toLongString = function(){
  return this.book.title + ' ' + this.chapter + ':' + this.verse;
};
BibleReference.prototype.toNumeric = function(){
  var verse = this.verseStart || 1;
  return (('00' + (bibleBooks.indexOf(this.book)+1)).slice(-2) + ('000' + this.chapter).slice(-3) + ('000' + verse).slice(-3)) * 1;
};

