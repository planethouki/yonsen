const loadtest = require('loadtest');
const fs = require('fs');

const file = process.argv[2] || "payload/payload.txt";
const splitFile = fs.readFileSync(file, 'utf8').split("\n");
const txPayloads = splitFile.filter((line) => { 
    return line.length === 330;
});

const reqs = txPayloads.length;

const requestGenerator = function(params, options, client, callback) {
    const message = {
        payload: txPayloads.pop()
    };
    // options.headers['Content-Length'] = message.length;
    options.headers['Content-Type'] = 'application/json';
    const request = client(options, callback);
    request.write(JSON.stringify(message));
    return request;
}

const options = {
	url: 'http://localhost:3000/transaction',
    maxRequests: reqs,
    method: 'PUT',
    concurrency: 1,
    requestGenerator: requestGenerator
};

loadtest.loadTest(options, function(error, result)
{
	if (error)
	{
		return console.error('Got an error: %s', error);
	}
    console.log('Tests run successfully');
    console.log(result);
});


