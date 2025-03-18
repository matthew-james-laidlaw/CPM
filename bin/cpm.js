#!/usr/bin/env node

import { exec, spawn } from 'child_process';
import { program } from 'commander';
import path from 'path';

program
    .command('init')
    .description('Initialize a new CPM project in the current directory.')
    .option('--name <projectName>', 'Specify a project name other than the current directory\'s name.')
    .action((options) => {
        const projectName = options.name || path.basename(process.cwd());
        const child = spawn('yo', ['cmake:init', projectName], { stdio: 'inherit', shell: true });
        child.on('exit', (code) => { process.exit(code); });
    });

program
    .command('new')
    .description('Create a new app or library.')
    .option('--app <appName>', 'Generate a new app.')
    .option('--lib <libName>', 'Generate a new library.')
    .action((options) => {
        if (options.app) {
            const child = spawn('yo', ['cmake:new', '--app', options.app], {
                stdio: 'inherit',
                shell: true,
            });
            child.on('exit', (code) => process.exit(code));
        } else if (options.lib) {
            const child = spawn('yo', ['cmake:new', '--lib', options.lib], {
                stdio: 'inherit',
                shell: true,
            });
            child.on('exit', (code) => process.exit(code));
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
        const preset = options.release ? 'build-release' : 'build-debug';
        const child = spawn('cmake', ['--workflow', '--preset', preset], { stdio: 'inherit', shell: true });
        child.on('exit', (code) => { process.exit(code); });
    });

program
    .command('test')
    .description('Test the project.')
    .option('--release', 'Use release preset.')
    .action((options) => {
        const preset = options.release ? 'test-release' : 'test-debug';
        const child = spawn('cmake', ['--workflow', '--preset', preset], { stdio: 'inherit', shell: true });
        child.on('exit', (code) => { process.exit(code); });
    });

program.parse(process.argv);
