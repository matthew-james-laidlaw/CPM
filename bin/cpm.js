#!/usr/bin/env node

import { exec } from 'child_process';
import { program } from 'commander';

program
    .command('init')
    .description('Initialize a new CPM project in the current directory.')
    .option('--name <projectName>', 'Specify a project name other than the current directory\'s name.')
    .action((projectName) => {
        const projectName = options.name || path.basename(process.cwd());
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
    .command('new')
    .description('Create a new app or library.')
    .option('--app <appName>', 'Generate a new app.')
    .option('--lib <libName>', 'Generate a new library.')
    .action((name, options) => {
        if (options.app) {
            exec(`yo cmake:new --app ${appName}`, (err, stdout, stderr) => {
                if (err) {
                    console.error(`Error creating app: ${stderr}`);
                    console.error(`${stdout}`);
                    process.exit(1);
                }
                console.log(stdout);
            });
        } else if (options.lib) {
            exec(`yo cmake:new --lib ${libName}`, (err, stdout, stderr) => {
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
    .description('Build the project.')
    .option('--release', 'Use release preset.')
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
    .description('Test the project.')
    .option('--release', 'Use release preset.')
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
