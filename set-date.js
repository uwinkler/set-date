#!/usr/bin/env node
'use strict';

const moment = require('moment');
const { exec } = require('child_process');

if (process.argv.length > 2) {
  const argv = Array.from(process.argv).splice(2);
  const momentStr = argv.join(' ');

  const dateFormat = moment(momentStr).format('MMDDHHmmYY');
  exec(`systemsetup - setusingnetworktime on`, () =>
    exec(`systemsetup - setusingnetworktime off`, () =>
      exec(`date ${dateFormat}`, (err, stdout, stderr) => {
        // the *entire* stdout and stderr (buffered)
        console.log(`${stdout}`);
        console.log(`${stderr}`);
      })
    )
  );
} else {
  exec(`systemsetup -setusingnetworktime off`, () =>
    exec(`systemsetup -setusingnetworktime on`)
  );
}
