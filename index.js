var LineInputStream = require("line-input-stream"),
    fs = require("fs"),
    async = require("async"),
    mongodb = require("mongoodb");


var stream = LineInputStream(fs.createReadStream("data.txt",{ flags: "r" }));

stream.setDelimiter("\n");

mongoose.connection.on("open",function(err,conn) { 

    // lower level method, needs connection
    var bulk = Entry.collection.initializeOrderedBulkOp();
    var counter = 0;

    stream.on("error",function(err) {
        console.log(err); // or otherwise deal with it
    });

    stream.on("line",function(line) {

        async.series(
            [
                function(callback) {
                    var row = line.split(",");     // split the lines on delimiter
                    var obj = {};             
                    // other manipulation
                    obj
                    bulk.insert(obj);  // Bulk is okay if you don't need schema
                                       // defaults. Or can just set them.

                    counter++;

                    if ( counter % 1000 == 0 ) {
                        stream.pause();
                        bulk.execute(function(err,result) {
                            if (err) callback(err);
                            // possibly do something with result
                            bulk = Entry.collection.initializeOrderedBulkOp();
                            stream.resume();
                            callback();
                        });
                    } else {
                        callback();
                    }
               }
           ],
           function (err) {
               // each iteration is done
           }
       );

    });

    stream.on("end",function() {

        if ( counter % 1000 != 0 )
            bulk.execute(function(err,result) {
                if (err) throw err;   // or something
                // maybe look at result
            });
    });

});