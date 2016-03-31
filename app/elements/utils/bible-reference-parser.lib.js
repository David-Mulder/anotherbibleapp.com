define(function(){

  var bibleBooks = require('books');

  var bibleReferenceParserRegex = new RegExp('^([a-zA-Z0-9 ]+?) ?(([0-9]*?)(([: ])(([0-9]*?)([\-\u2013]([0-9]*?))?)?)?)?$');

//var BibleReference = function(bookObject, chapter, verseStart, verseEnd){
  var BibleReference = function(vs){
    if(vs instanceof BibleReference) return vs;

    if(/^[0-9]{7,8}$/.test(vs)){
      //numeric reference
      if(vs.toString().length == 7){
        vs = '0' + vs;
      }
      var book = parseInt(vs.toString().substring(0,2));
      var chapter = parseInt(vs.toString().substring(2,5));
      var verse = parseInt(vs.toString().substring(5,8));
      var verseStart = verse;
      var verseEnd = verse;
      var bookObject = bibleBooks[book-1];
    }else if(typeof vs == 'string'){
      //normal reference
      var matches = bibleReferenceParserRegex.exec(vs.trim());
      if(matches){
        var bookObject = bibleBooks.findBook(matches[1]);
        //console.info('bookObject', bookObject);
        if(bookObject && bookObject.matchQuality <= 30 && !matches[3]){
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

    this._debug = vs;

    this.book = bookObject;
    this.chapter = chapter;
    this.verse = verseStart;
    this.verseStart = verseStart;
    this.verseEnd = verseEnd || verseStart;
  };

  window.BR = BibleReference;

  Object.defineProperty(BibleReference.prototype, 'valid', {
    enumerable: false,
    configurable: false,
    get: function(){
      return typeof this.book != 'undefined';
    }
  });

  Object.defineProperty(BibleReference.prototype, 'start', {
    enumerable: false,
    configurable: false,
    get: function(){
      var originalEnd = this.verseEnd;
      var reference = new BibleReference(this.toNumeric());
      this.verseEnd = originalEnd;
      return reference;
    }
  });

  Object.defineProperty(BibleReference.prototype, 'end', {
    enumerable: false,
    configurable: false,
    get: function(){
      if(this.verseEnd){
        var originalStart = this.verseStart;
        this.verseStart = this.verseEnd;
        this.verseEnd = undefined;
        var reference = new BibleReference(this.toNumeric());
        this.verseEnd = this.verseStart;
        this.verseStart = originalStart;
        return reference;
      }else{
        return this.start;
      }
    }
  });

  BibleReference.prototype.toString = function(){
    var str = this.book.name;
    if(this.chapter){
      str += ' ' + this.chapter;
      if(this.verseStart){
        str += ':' + this.verseStart;
        if(this.verseEnd && this.verseStart !== this.verseEnd){
          str += '-' + this.verseEnd;
        }
      }
    }
    return str;
  };

  BibleReference.prototype.toLongString = function(){
    var str = this.book.title;
    if(this.chapter){
      str += ' ' + this.chapter;
      if(this.verseStart){
        str += ':' + this.verseStart;
        if(this.verseEnd && this.verseStart !== this.verseEnd){
          str += '-' + this.verseEnd;
        }
      }
    }
    return str;
  };

  BibleReference.prototype.toNumeric = function(){
    var verse = this.verseStart || 1;
    return (('00' + (bibleBooks.indexOf(this.book)+1)).slice(-2) + ('000' + this.chapter).slice(-3) + ('000' + verse).slice(-3)) * 1;
  };

  BibleReference.prototype.split = function() {
    var result = [];
    var originalStart = this.verseStart;
    var originalEnd = this.verseEnd;
    for(var v=originalStart;v<=originalEnd;v++){
      this.verseStart = v;
      this.verseEnd = v;
      result.push(new BibleReference(this.toNumeric()));
    }
    this.verseEnd = originalEnd;
    this.verseStart = originalStart;
    return result;
  };

  BibleReference.combine = function(arr){
    var initialLength = arr.length;
    arr = arr.filter(function(br){
      return br instanceof BibleReference;
    });
    var newArr = [];
    arr.forEach(function(br){
      var curNumericStart = br.start.toNumeric();
      var curNumericEnd = br.end.toNumeric();
      var added = false;
      for(var i=0;i<newArr.length;i++){
        var start = newArr[i].start.toNumeric();
        var end = newArr[i].end.toNumeric();
        if(start - 1 == curNumericEnd){
          //console.log('add', br, 'to', newArr[i]);
          newArr[i].verseStart -= curNumericEnd - curNumericStart + 1;
          added = true;
        }else if(end + 1 == curNumericStart){
          newArr[i].verseEnd += curNumericEnd - curNumericStart + 1;
          added = true;
        }else if(start == curNumericEnd){
          newArr[i].verseStart -= curNumericEnd - curNumericStart;
          added = true;
        }else if(end == curNumericStart){
          newArr[i].verseEnd += curNumericEnd - curNumericStart;
          added = true;
        }
      };
      if(!added){
        newArr.push(br);
      }
    });

    if(initialLength == newArr.length){
      return newArr;
    }else{
      return BibleReference.combine(newArr);
    }
  };

  return BibleReference;
});
