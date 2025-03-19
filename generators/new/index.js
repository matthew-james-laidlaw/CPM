import Generator from 'yeoman-generator';
import os from 'os';
import fs from 'fs';
import ora from 'ora';

export default class extends Generator {

    constructor(args, opts) {
        super(args, opts);

        this.env.options.silent = true;
        this.env.adapter.log = () => {};

        this.option('app', {
            type: String,
            description: 'Generate a new application'
        });

        this.option('lib', {
            type: String,
            description: 'Generate a new library'
        });

    }

    writing() {

        if (this.options.app && !this.options.lib) {
            const spinner = ora('[creating new application]').start();
            this._createApp(this.options.app);
            spinner.succeed('Done!');
        } else if (this.options.lib && !this.options.app) {
            const spinner = ora('[creating new library]').start();
            this._createLib(this.options.lib);
            spinner.succeed('Done!');
        } else {
            this.log('Specify one of --app {app-name} or --lib {lib-name} (not both)')
        }

    }

    _createApp(appName) {

        fs.appendFileSync('apps/CMakeLists.txt', os.EOL + `add_subdirectory(${appName})`)

        const files = [
            { from: 'app', to: `apps/${appName}`, options: { appName: appName } },
        ];
        
        this._applyTemplates(files);

    }

    _createLib(libName) {

        fs.appendFileSync('libs/CMakeLists.txt', os.EOL + `add_subdirectory(${libName})`)

        const files = [
            { from: 'lib/CMakeLists.txt',  to: `libs/${libName}/CMakeLists.txt`,      options: { libName: libName } },
            { from: 'lib/module.ixx',      to: `libs/${libName}/${libName}.ixx`,      options: { libName: libName } },
            { from: 'lib/test_module.cpp', to: `libs/${libName}/test_${libName}.cpp`, options: { libName: libName } },
        ];
        
        this._applyTemplates(files);

    }

    _applyTemplates(files) {
        files.forEach((file) => {
            if (file.options) {
                this.fs.copyTpl(
                    this.templatePath(file.from),
                    this.destinationPath(file.to),
                    file.options
                );
            } else {
                this.fs.copy(
                    this.templatePath(file.from),
                    this.destinationPath(file.to)
                );
            }
        });
    }

};
