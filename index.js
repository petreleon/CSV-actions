var fs  = require('fs');
var lineReader = require('readline').createInterface({
  input: fs.createReadStream('checkouts-by-title.csv')
  //input: fs.createReadStream('test.csv')
});
var util = require('util');
var fs  = require('fs');
let t0 = new Date().getTime();
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
  fs.writeFile('./data.json', util.inspect(categoryCount), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
  let t1 = new Date().getTime();
  console.log(t1-t0);
});

