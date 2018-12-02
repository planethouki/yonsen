const loadtest = require('loadtest');
const fs = require('fs');

const file = process.argv[2] || "payload/payload.txt";
const requestsPerSecond = process.argv[3] || 500;
const splitFile = fs.readFileSync(file, 'utf8').split("\n");
const txPayloads = splitFile.filter((line) => { 
    return line.length === 330;
});

const reqs = txPayloads.length;

const requestGenerator = function(params, options, client, callback) {
    const message = {
        payload: txPayloads.pop()
    };
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
    requestGenerator: requestGenerator,
    requestsPerSecond: requestsPerSecond
};

loadtest.loadTest(options, function(error, result)
{
	if (error) console.error('Got an error: %s', error);
    console.log({
        comment: 'Tests run successfully',
        file,
        result
    });
});


