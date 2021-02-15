function ToSummary(text){
    var words = GetWordCount(text); 
    var sentenceList = GetSentenceList(text);
    
    var sentenceScoreList = [];
    
    for(var i = 0;i<sentenceList.length;i++){
        var sentence = sentenceList[i];
        var sentenceWords = GetWord(sentence);
        var score = 0;
        
        sentenceWords.forEach(element => {
            var result = words[element];
            score += result;
        });
        score /= sentenceWords.length;
        sentenceScoreList.push({sentence:sentence,score:score});
    }

    sentenceScoreList.sort(x=>x.score);
    
    var result = '';
    for(var i = 0;i<3;i++){
        result += sentenceScoreList[i].sentence + ".\n";
    }

    return result;
}

function GetWordCount(text){
    var words = [];
    var list = {};

    var sentenceList = GetSentenceList(text);
    sentenceList.forEach(sentence => {
        words = GetWord(sentence);

        words.forEach(element => {
            if(list[element] === undefined || list[element] === null){
                list[element] = 1;
            }else {
                list[element] += 1;
            }
        });
    });
    
    // words = GetWord(text);
    
    // words.forEach(element => {
    //     if(list[element] === undefined || list[element] === null){
    //         list[element] = 1;
    //     }else {
    //         list[element] += 1;
    //     }
    // });

    return list;
}


function GetWord(text){
    text = text.replace(/[`~!@#$%^&*()_|+\-=?;:،'",.<>\{\}\[\]\\\/]/gi, '');
    text = text.replace(/(\r\n|\n|\r)/gm, "");
    text = text.trim();

    var words = [];
    var word = '';

    for(var i = 0;i<text.length;i++){
        if(text[i] !== ' '){
            word += text[i]; 
            continue;
        }
        if(word !== '')
        {
            words.push(word.trim());
            word = '';
        }
    }

    if(word !== '')
        words.push(word.trim());
    return words;
}

function GetSentenceList(text){
    text = text.replace(/[`~!@#$%^&*()_|+\-=?;:،'",<>\{\}\[\]\\\/]/gi, '');
    text = text.replace(/(\r\n|\n|\r)/gm, "");
    text = text.trim();

    var sentenceList = [];
    var sentence = '';
    for(var i = 0;i<text.length;i++){
        if(text[i] !== '.' && text[i] !== '\n'){
            sentence += text[i]; 
            continue;
        }
        if(sentence !== ''){
            sentence = sentence.replace(/(\r\n|\n|\r)/gm, "").trim();
            sentenceList.push(sentence);
            sentence = '';
        }
    }
    if(sentence !== ''){
        sentence = sentence.replace(/(\r\n|\n|\r)/gm, "").trim();
        sentenceList.push(sentence);
    }
    
    return sentenceList;
}
