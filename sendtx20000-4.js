const { spawn } = require('child_process');

const folder = "payload_20000_4";

let r = [
  spawn('node', ['yonsenlt.js', folder + '/payload0001.txt']),
  spawn('node', ['yonsenlt.js', folder + '/payload0002.txt']),
  spawn('node', ['yonsenlt.js', folder + '/payload0003.txt']),
  spawn('node', ['yonsenlt.js', folder + '/payload0004.txt']),
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
