#!/usr/bin/env node
process.env.NODE_NO_WARNINGS = '1';

import { spawn, spawnSync } from 'child_process';
import { program } from 'commander';
import path from 'path';

function Run(command, args = []) {
    spawnSync(command, args, { stdio: 'inherit', shell: true });
}

program
    .command('init')
    .description('Initialize a new CPM project in the current directory.')
    .option('--name <projectName>', 'Specify a project name other than the current directory\'s name.')
    .action((options) => {
        const projectName = options.name || path.basename(process.cwd());
        Run('yo', ['cmake:init', projectName]);
    });

program
    .command('new')
    .description('Create a new app or library.')
    .option('--app <appName>', 'Generate a new app.')
    .option('--lib <libName>', 'Generate a new library.')
    .action((options) => {
        if (options.app) {
            Run('yo', ['cmake:new', '--app', options.app]);
        } else if (options.lib) {
            Run('yo', ['cmake:new', '--lib', options.lib]);
        } else {
            console.error('Please specify either --app or --lib');
            process.exit(1);
        }
    });


program
    .command('build')
    .description('Build the project.')
    .option('--release', 'Use release preset.')
    .action((options) => {
        const preset = options.release ? 'release' : 'debug';
        Run('cmake', ['--build', '--preset', preset]);
    });

program
    .command('test')
    .description('Test the project.')
    .option('--release', 'Use release preset.')
    .action((options) => {
        const preset = options.release ? 'release' : 'debug';
        Run('cmake', ['--build', '--preset', preset]);
        Run('ctest', ['--preset', preset]);
    });

program.parse(process.argv);
