const { spawn } = require('child_process');
const fs = require('fs');

let num = 320000;
const folder = "payload_320000_8";

if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder);
};

let r = [
  spawn('node', ['yonsenwa.js', folder + '/payload0001.txt', num]),
  spawn('node', ['yonsenwa.js', folder + '/payload0002.txt', num]),
  spawn('node', ['yonsenwa.js', folder + '/payload0003.txt', num]),
  spawn('node', ['yonsenwa.js', folder + '/payload0004.txt', num]),
  spawn('node', ['yonsenwa.js', folder + '/payload0005.txt', num]),
  spawn('node', ['yonsenwa.js', folder + '/payload0006.txt', num]),
  spawn('node', ['yonsenwa.js', folder + '/payload0007.txt', num]),
  spawn('node', ['yonsenwa.js', folder + '/payload0008.txt', num]),
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
