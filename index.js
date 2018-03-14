var fs = require('fs');

function readFileGetWord(callback) {
    //this console isn't wrapped in anything, gets printed
    console.log(3);
    fs.readFile('data.json', 'utf8', function (err, fileString) {
        //first function that gets run after start is completed, follows 12
        console.log(13);
        if (err) {
            callback(err);
            // if this returned a value where would it go?
            return;
        }
        //calls the callback right away, nothing happens until start has been completed
        var data = JSON.parse(fileString);
        //this is weird for a callback to return a value, just think about it
        var words = callback(null, data[0]);
        console.log('Value returned from callback inside readFileGetWord:', words);
        //does not get called until all data goes through the words callback
        console.log(16);

        //where does this string go?
        return 'more words';
    });
    //this console is not wrapped, gets printed
    console.log(4);

    //it is weird for the "node-pattern of handling async problems" to return something (don't do this) 
    //but I want you to think about this to fully understand async flow of execution
    //and to understand the difference between an async function and a callback
    return 'return';
}

function addNumbers(a, b, callback) {
    //not wrapped in anything, gets printed
    console.log(6);
    var notANumber = callback(null, a + b);
    //calls notANumber callback
    console.log('Value returned from callback in addNumbers:', notANumber);
    //gets printed after notANumber is returned but before the function returns 'dog'
    console.log(8);
    //it is weird for the "node-pattern of handling async problems" to return something (don't do this) 
    //but I want you to think about this to fully understand async flow of execution
    //and to understand the difference between an async function and a callback
    return 'dog';
}


function start() {
    var text, number;
    //not inside anything, printed next
    console.log(2);
    //calls readFileGetWord function
    text = readFileGetWord(function (err, word) {
        //gets printed after the callback is called from readFileGetWord from words
        console.log(14);

        if (err) {
            console.log(err);
            // if this returned a value where would it go?
            return;
        }

        console.log('Word from file:', word);
        //follows 14, word callback is called
        console.log(15);

        //this return is also weird, just want you to think about it
        return 'this is weird';
    });
    //this console gets printed before readFileGetWord returns info
    console.log(5);
    //calls addNumbers funtion
    number = addNumbers(2, 3, function (err, sum) {
        if (err) {
            console.log(err);
            //if this returned a value where would it go?
            return;
        }
        //callback was called, continue this function
        console.log(7);
        console.log('Sum:', sum);
        //this return is also weird, just want you to think about it
        return 'not a number';
    });
    //start function continues, these are printed in order
    console.log(9);
    console.log('Value returned from addNumbers:', number);
    console.log(10);
    console.log('Value returned from readFileGetWord:', text);
    console.log(11);
}
//this one gets printed first
console.log(1);
//start function is called
start();
//start function is over, other callbacks have not been called
console.log(12);