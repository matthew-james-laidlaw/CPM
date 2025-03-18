import Generator from 'yeoman-generator';

export default class extends Generator {

    constructor(args, opts) {
        super(args, opts);

        this.argument('name', {
            type: String,
            required: true
        });

        this.option('app', {
            type: Boolean,
            description: 'Generate a new application'
        });

        this.option('lib', {
            type: Boolean,
            description: 'Generate a new library'
        });

    }

    writing() {
        this._initFileStructure();
    }
    
    install() {        
        this._initGit();
        this._initCmake();
    }

    _initFileStructure() {
        const files = [
            { from: '.github',           to: '.github'           },
            { from: 'apps',              to: 'apps'              },
            { from: 'cmake',             to: 'cmake'             },
            { from: 'extern',            to: 'extern'            },
            { from: 'libs',              to: 'libs'              },
            { from: '.gitignore',        to: '.gitignore'        },
            { from: 'CMakeLists.txt',    to: 'CMakeLists.txt'    },
            { from: 'CMakePresets.json', to: 'CMakePresets.json' },
        ];   
        this._applyTemplates(files);
    }

    _initGit() {
        this.spawnSync('git', ['init']);
        this.spawnSync('git', ['submodule', 'add', 'https://github.com/google/googletest.git', 'extern/googletest']);
    }

    _initCmake() {
        this.spawnSync('cmake', ['--preset', 'default']);
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
