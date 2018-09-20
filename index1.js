var https = require('https');

function getRecentNodeVersion(callback) {
    console.log(2);
    https.get('https://nodejs.org/dist/index.json', function (response) {
        //first function that gets run after start is completed, follows 11
        console.log(12);

        var rawData = '',
            parsedData;

        response.setEncoding('utf8');
        //when is this called
        response.on('data', function (chunk) {
            rawData += chunk;
        });
        //when is this called
        response.on('end', function () {
            try {
                parsedData = JSON.parse(rawData);
            } catch (e) {
                console.error(e.message);
            }

            //this is weird for a callback to return a value, just think about it
            var words = callback(null, parsedData[0].version);
            //console.log(words);
            //this is the final callback
            console.log(16);

            //where does this string go?
            return "more words things";
        });
        //still synchronous inside the http.get function
        console.log(13);
        //where does this string go?
        return "more words";

    }).on('error', function (e) {
        //when would this be executed
        callback(e);

        // if this returned a value where would it go?
        return "this is in the error"
    });
    //when function gets called, this is not embedded in the async function, gets printed first, reaches return statement
    console.log(3);

    //it is weird for the "node-pattern of handling async problems" to return something (don't do this) 
    //but I want you to think about this to fully understand async flow of execution
    //and to understand the difference between an async function and a callback
    return "return";
}

function addNumbers(a, b, callback) {
    //this is being called before asynchronous things happen, prints next
    console.log(5);
    var notANumber = callback(null, a + b);
    //console.log(notANumber);
    //after the addNumbers is executed, the return goes back to the function definition
    console.log(7);
    //it is weird for the "node-pattern of handling async problems" to return something (don't do this) 
    //but I want you to think about this to fully understand async flow of execution
    //and to understand the difference between an async function and a callback
    return 500;
}


function start() {
    var text, number;
    //gets printed because it's before asynchronous code
    console.log(1)
    text = getRecentNodeVersion(function (err, nodeVersion) {
        //getRecentNodeVersion is finally being executed here with the response from the callback.
        console.log(14);

        if (err) {
            console.log(err);
            // if this returned a value where would it go?
            return;
        }

        // console.log("Current Node Version:", nodeVersion);
        //executes synchronously here
        console.log(15);

        //this return is also weird, just want you to think about it
        return "this is weird";
    })
    //after "getRecentNodeVersion" is called and being run in the background, this next console.log is synchronous
    console.log(4);
    number = addNumbers(2, 3, function (err, sum) {
        if (err) {
            console.log(err);
            //if this returned a value where would it go?
            // also, why do we need a return here?
            return;
        }
        console.log(6);

        //prints the sum of the addNumbers>        console.log(sum);
        //this return is also weird, just want you to think about it
        return "not a number";
    });
    //once the addNumbers is reExecuted asynchronously, we resume here with synchronous
    console.log(8);
    //this is what was returned from the addNumbers async function > console.log(number);
    console.log(9);
    //this is what was returned from the getRecentNodeVersion > console.log(text);
    console.log(10);
}

//comes down here first to compile the first set of code synchronously
console.log(0);
//start gets called
start();
//start is being run in the background, getRecentNodeVersion has not completed yet.
console.log(11);