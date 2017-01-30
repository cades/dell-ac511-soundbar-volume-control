var LinuxInputListener = require('linux-input-device');
var loudness = require('loudness');

var devPath = process.argv[2] || '/dev/input/event0'

var input = new LinuxInputListener(devPath);

input.on('state', function(value, key, kind) {
    console.log('State is now:', value, 'for key', key, 'of kind', kind, typeof kind);
    if (kind !== 'EV_KEY') return
    if (key === 115) volumeUp();
    if (key === 114) volumeDown();
});

input.on('error', console.error);

function volumeUp() {
    loudness.getVolume(function (err, vol) {
	loudness.setVolume(Math.min(vol + 5, 100), function (err) {
	});
    });
}

function volumeDown() {
    loudness.getVolume(function (err, vol) {
	loudness.setVolume(Math.max(vol - 5, 0), function (err) {
	});
    });
}

