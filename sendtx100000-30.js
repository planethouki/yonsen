const { spawn } = require('child_process');

const folder = "payload_100000_30";
const persec = 135;

let r = [
    spawn('node', ['yonsenlt.js', folder + '/payload0001.txt', persec]),
    spawn('node', ['yonsenlt.js', folder + '/payload0002.txt', persec]),
    spawn('node', ['yonsenlt.js', folder + '/payload0003.txt', persec]),
    spawn('node', ['yonsenlt.js', folder + '/payload0004.txt', persec]),
    spawn('node', ['yonsenlt.js', folder + '/payload0005.txt', persec]),
    spawn('node', ['yonsenlt.js', folder + '/payload0006.txt', persec]),
    spawn('node', ['yonsenlt.js', folder + '/payload0007.txt', persec]),
    spawn('node', ['yonsenlt.js', folder + '/payload0008.txt', persec]),
    spawn('node', ['yonsenlt.js', folder + '/payload0009.txt', persec]),
    spawn('node', ['yonsenlt.js', folder + '/payload0010.txt', persec]),
    spawn('node', ['yonsenlt.js', folder + '/payload0011.txt', persec]),
    spawn('node', ['yonsenlt.js', folder + '/payload0012.txt', persec]),
    spawn('node', ['yonsenlt.js', folder + '/payload0013.txt', persec]),
    spawn('node', ['yonsenlt.js', folder + '/payload0014.txt', persec]),
    spawn('node', ['yonsenlt.js', folder + '/payload0015.txt', persec]),
    spawn('node', ['yonsenlt.js', folder + '/payload0016.txt', persec]),
    spawn('node', ['yonsenlt.js', folder + '/payload0017.txt', persec]),
    spawn('node', ['yonsenlt.js', folder + '/payload0018.txt', persec]),
    spawn('node', ['yonsenlt.js', folder + '/payload0019.txt', persec]),
    spawn('node', ['yonsenlt.js', folder + '/payload0020.txt', persec]),
    spawn('node', ['yonsenlt.js', folder + '/payload0021.txt', persec]),
    spawn('node', ['yonsenlt.js', folder + '/payload0022.txt', persec]),
    spawn('node', ['yonsenlt.js', folder + '/payload0023.txt', persec]),
    spawn('node', ['yonsenlt.js', folder + '/payload0024.txt', persec]),
    spawn('node', ['yonsenlt.js', folder + '/payload0025.txt', persec]),
    spawn('node', ['yonsenlt.js', folder + '/payload0026.txt', persec]),
    spawn('node', ['yonsenlt.js', folder + '/payload0027.txt', persec]),
    spawn('node', ['yonsenlt.js', folder + '/payload0028.txt', persec]),
    spawn('node', ['yonsenlt.js', folder + '/payload0029.txt', persec]),
    spawn('node', ['yonsenlt.js', folder + '/payload0030.txt', persec]),
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
