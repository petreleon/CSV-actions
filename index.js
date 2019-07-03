var fs  = require('fs');
var lineReader = require('readline').createInterface({
  input: fs.createReadStream('checkouts-by-title.csv')
});
var util = require('util');
var fs  = require('fs');

var categoryCount ={};


lineReader.on('line', function (line) {
  var row= line.split(',');
  var category = row[2];
  category = category.replace(/('|")/g, "");
  if(typeof categoryCount[category]=='undefined'){
    
    categoryCount[category]=0;
  }
  categoryCount[category]+=1;
});

lineReader.on('close', function () {
  console.log(categoryCount);
  fs.writeFileSync('./data.json', util.inspect(categoryCount) , 'utf-8');
});

