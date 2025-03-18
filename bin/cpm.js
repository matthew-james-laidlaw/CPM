#!/usr/bin/env node

import { exec } from 'child_process';
import { program } from 'commander';

program
    .command('init <projectName>')
    .description('Initialize a new project')
    .action((projectName) => {
        exec(`yo cmake:init ${projectName}`, (err, stdout, stderr) => {
            if (err) {
                console.error(`Error initializing project: ${stderr}`);
                console.error(`${stdout}`);
                process.exit(1);
            }
            console.log(stdout);
        });
    });

program
    .command('new <name>')
    .description('Create a new app or library')
    .option('--app', 'Generate a new app')
    .option('--lib', 'Generate a new library')
    .action((name, options) => {
        if (options.app) {
            exec(`yo cmake:new --app ${name}`, (err, stdout, stderr) => {
                if (err) {
                    console.error(`Error creating app: ${stderr}`);
                    console.error(`${stdout}`);
                    process.exit(1);
                }
                console.log(stdout);
            });
        } else if (options.lib) {
            exec(`yo cmake:new --lib ${name}`, (err, stdout, stderr) => {
                if (err) {
                    console.error(`Error creating library: ${stderr}`);
                    console.error(`${stdout}`);
                    process.exit(1);
                }
                console.log(stdout);
            });
        } else {
            console.error('Please specify either --app or --lib');
            process.exit(1);
        }
    });

program
    .command('build')
    .description('Build the project')
    .option('--release', 'Use release preset')
    .action((options) => {
        const preset = options.release ? 'build-release' : 'build-debug';
        exec(`cmake --workflow --preset ${preset}`, (err, stdout, stderr) => {
            if (err) {
                console.error(`Error building: ${stderr}`);
                console.error(`${stdout}`);
                process.exit(1);
            }
            console.log(stdout);
        });
    });

program
    .command('test')
    .description('Test the project')
    .option('--release', 'Use release preset')
    .action((options) => {
        const preset = options.release ? 'test-release' : 'test-debug';
        exec(`cmake --workflow --preset ${preset}`, (err, stdout, stderr) => {
            if (err) {
                console.error(`Error testing: ${stderr}`);
                console.error(`${stdout}`);
                process.exit(1);
            }
            console.log(stdout);
        });
    });

program.parse(process.argv);
