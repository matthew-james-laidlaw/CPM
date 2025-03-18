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

        const files = [
            { from: '.gitignore',        to: '.gitignore'        },
            { from: 'CMakeLists.txt',    to: 'CMakeLists.txt'    },
            { from: 'CMakePresets.json', to: 'CMakePresets.json' },
            { from : 'apps',             to: 'apps'              },
            { from : 'extern',           to: 'extern'            },
            { from : 'libs',             to: 'libs'              },
        ];
        
        this._applyTemplates(files);

        this.spawnSync('git', ['init']);
        this.spawnSync('git', ['submodule', 'add', 'https://github.com/google/googletest.git', 'extern/googletest']);

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
