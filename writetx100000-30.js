const { spawn } = require('child_process');
const fs = require('fs');

let num = 100000;
const folder = "payload_100000_30";

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
  spawn('node', ['yonsenwa.js', folder + '/payload0009.txt', num]),
  spawn('node', ['yonsenwa.js', folder + '/payload0010.txt', num]),
  spawn('node', ['yonsenwa.js', folder + '/payload0011.txt', num]),
  spawn('node', ['yonsenwa.js', folder + '/payload0012.txt', num]),
  spawn('node', ['yonsenwa.js', folder + '/payload0013.txt', num]),
  spawn('node', ['yonsenwa.js', folder + '/payload0014.txt', num]),
  spawn('node', ['yonsenwa.js', folder + '/payload0015.txt', num]),
  spawn('node', ['yonsenwa.js', folder + '/payload0016.txt', num]),
  spawn('node', ['yonsenwa.js', folder + '/payload0017.txt', num]),
  spawn('node', ['yonsenwa.js', folder + '/payload0018.txt', num]),
  spawn('node', ['yonsenwa.js', folder + '/payload0019.txt', num]),
  spawn('node', ['yonsenwa.js', folder + '/payload0020.txt', num]),
  spawn('node', ['yonsenwa.js', folder + '/payload0021.txt', num]),
  spawn('node', ['yonsenwa.js', folder + '/payload0022.txt', num]),
  spawn('node', ['yonsenwa.js', folder + '/payload0023.txt', num]),
  spawn('node', ['yonsenwa.js', folder + '/payload0024.txt', num]),
  spawn('node', ['yonsenwa.js', folder + '/payload0025.txt', num]),
  spawn('node', ['yonsenwa.js', folder + '/payload0026.txt', num]),
  spawn('node', ['yonsenwa.js', folder + '/payload0027.txt', num]),
  spawn('node', ['yonsenwa.js', folder + '/payload0028.txt', num]),
  spawn('node', ['yonsenwa.js', folder + '/payload0029.txt', num]),
  spawn('node', ['yonsenwa.js', folder + '/payload0030.txt', num]),
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
