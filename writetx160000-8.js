const { spawn } = require('child_process');

let num = 160000;

let r = [
  spawn('node', ['yonsenwa.js', 'payload_160000_8/payload0001.txt', num]),
  spawn('node', ['yonsenwa.js', 'payload_160000_8/payload0002.txt', num]),
  spawn('node', ['yonsenwa.js', 'payload_160000_8/payload0003.txt', num]),
  spawn('node', ['yonsenwa.js', 'payload_160000_8/payload0004.txt', num]),
  spawn('node', ['yonsenwa.js', 'payload_160000_8/payload0005.txt', num]),
  spawn('node', ['yonsenwa.js', 'payload_160000_8/payload0006.txt', num]),
  spawn('node', ['yonsenwa.js', 'payload_160000_8/payload0007.txt', num]),
  spawn('node', ['yonsenwa.js', 'payload_160000_8/payload0008.txt', num]),
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
