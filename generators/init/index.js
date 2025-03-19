import Generator from 'yeoman-generator';
import ora from 'ora';

export default class extends Generator {

    _expectSnakeCase(name, err_msg) {
        const snakeCaseRegex = /^[a-z]+(?:_[a-z]+)*$/;
        if (!snakeCaseRegex.test(name)) {
            this.env.error(err_msg);
        }
    }

    constructor(args, opts) {
        super(args, opts);

        this.spinner = ora('[initializing file system]').start();

        this.env.options.silent = true;
        this.env.adapter.log = () => {};

        this.argument('name', {
            type: String,
            required: true
        });

        this._expectSnakeCase(this.options.name, 'project name must be snake case');
    }

    async writing() {
        await this._initFileStructure();
    }
    
    async install() {
        this.spinner.text = '[initializing git]';
        await this._initGit();

        this.spinner.text = '[initializing cmake]';
        await this._initCmake();
        this.spinner.succeed('Done!');
    }

    async _initFileStructure() {
        const files = [
            { from: '.github',           to: '.github'           },
            { from: 'cmake',             to: 'cmake'             },
            { from: 'apps',              to: 'apps'              },
            { from: 'extern',            to: 'extern'            },
            { from: 'libs',              to: 'libs'              },
            { from: '.gitignore',        to: '.gitignore'        },
            { from: 'CMakePresets.json', to: 'CMakePresets.json' },
            
            { from: 'CMakeLists.txt', to: 'CMakeLists.txt', options: { projectName: this.options.name.toUpperCase() } },
        ];   
        await this._applyTemplates(files);
    }

    async _initGit() {
        await this.spawn('git', ['init', '--initial-branch', 'main'], { stdio: 'ignore', shell: true });
        await this.spawn('git', ['submodule', 'add', 'https://github.com/google/googletest.git', 'extern/googletest'], { stdio: 'ignore', shell: true });
        await this.spawn('git', ['add', '-A'], { stdio: 'ignore', shell: true });
        await this.spawn('git', ['commit', '-m', '\"initial commit\"'], { stdio: 'ignore', shell: true });
    }

    async _initCmake() {
        await this.spawn('cmake', ['--preset', 'default'], { stdio: 'ignore', cwd: this.destinationRoot(), env: process.env, shell: true });
    }

    async _applyTemplates(files) {
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
        return Promise.resolve();
    }

};
