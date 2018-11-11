const { spawn } = require('child_process');

let num = 20000;

let r = [
  spawn('node', ['yonsenwa.js', 'payload_2000_4/payload0001.txt', num]),
  spawn('node', ['yonsenwa.js', 'payload_2000_4/payload0002.txt', num]),
  spawn('node', ['yonsenwa.js', 'payload_2000_4/payload0003.txt', num]),
  spawn('node', ['yonsenwa.js', 'payload_2000_4/payload0004.txt', num]),
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
