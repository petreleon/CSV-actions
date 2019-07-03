var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('checkouts-by-title.csv')
});

var categoryCount ={'\"ER': 0,
'"FLASHCARD': 0,
'\"PICTURE': 0,
'"REGPRINT': 0,
'"SLIDE': 0,
'"SOUNDCASS': 0,
'"SOUNDDISC': 0,
'"VIDEOCASS': 0,
ATLAS: 0,
AUDIOBOOK: 0,
BOOK: 0,
COMIC: 0,
COMPFILE: 0,
CR: 0,
EBOOK: 0,
ER: 0,
GLOBE: 0,
KIT: 0,
LARGEPRINT: 0,
MAGAZINE: 0,
MAP: 0,
MaterialType: 0,
MICROFORM: 0,
MIXED: 0,
MOVIE: 0,
MUSIC: 0,
MUSICSNDREC: 0,
NOTATEDMUSIC: 0,
PICTURE: 0,
REGPRINT: 0,
REMOTESEN: 0,
SLIDE: 0,
SONG: 0,
SOUNDCASS: 0,
SOUNDDISC: 0,
SOUNDREC: 0,
TELEVISION: 0,
UNSPECIFIED: 0,
VIDEO: 0,
VIDEOCART: 0,
VIDEOCASS: 0,
VIDEODISC: 0,
VIDEOREC: 0,
VISUAL: 0};


lineReader.on('line', function (line) {
  var row= line.split(',');
  categoryCount[row[2]]+=1;
});

console.log(categoryCount);