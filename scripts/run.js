#!/usr/bin/env node

const dotEnv = require('dotenv');
const { exec } = require('./utils');

const { parsed = {} } = dotEnv.config({ path: '.env' });
const { argv } = process;

const command = argv[argv.length - 1];
const VALID_COMMANDS = ['start', 'build'];
if (!VALID_COMMANDS.includes(command))
  throw new Error(`Not a valid command. Valid commands: ${VALID_COMMANDS.join(', ')}`);

const run = async () => {
  const envVars = Object.keys(parsed).map((key) => `${key.toUpperCase()}='${parsed[key]}'`);

  const cliEnv = envVars.join(' ');

  exec(`${cliEnv} REACT_APP_VERSION=${process.env.npm_package_version} npm run ${command}`, {
    cwd: './packages/webapp',
  });

  exec(`${cliEnv} npm run ${command}`, {
    cwd: './packages/server',
  });
};

run();
