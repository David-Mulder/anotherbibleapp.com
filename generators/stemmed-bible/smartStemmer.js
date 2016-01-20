var nonStemmableWords = ["jesus"];
var smartStemmer = function(word){
	if(nonStemmableWords.indexOf(word) > -1){
		return word;
	}else{
		return lancasterStemmer(word);
	}
};