const { spawn } = require('child_process');

const folder = "payload_320000_8";
const persec = 505;

let r = [
  spawn('node', ['yonsenlt.js', folder + '/payload0001.txt', persec]),
  spawn('node', ['yonsenlt.js', folder + '/payload0002.txt', persec]),
  spawn('node', ['yonsenlt.js', folder + '/payload0003.txt', persec]),
  spawn('node', ['yonsenlt.js', folder + '/payload0004.txt', persec]),
  spawn('node', ['yonsenlt.js', folder + '/payload0005.txt', persec]),
  spawn('node', ['yonsenlt.js', folder + '/payload0006.txt', persec]),
  spawn('node', ['yonsenlt.js', folder + '/payload0007.txt', persec]),
  spawn('node', ['yonsenlt.js', folder + '/payload0008.txt', persec]),
];

r.map((s) => {
  s.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  s.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  s.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
});
