import Generator from 'yeoman-generator';

export default class extends Generator {

    writing() {

        const projectName = 'MYPROJECT';

        const appsDir = 'apps';
        const appTemplate = 'app';

        const externDir = 'extern';

        const libsDir = 'libs';

        const appName = 'myapp';

        this.fs.copyTpl(
            this.templatePath('CMakeLists.txt'),
            this.destinationPath('CMakeLists.txt'),
            { projectName: projectName }
        );

        this.fs.copyTpl(
            this.templatePath('CMakePresets.json'),
            this.destinationPath('CMakePresets.json')
        );

        this.fs.copyTpl(
            this.templatePath(`${appsDir}/CMakeLists.txt`),
            this.destinationPath(`${appsDir}/CMakeLists.txt`),
            { appName: appName }
        );

        this.fs.copyTpl(
            this.templatePath(`${appsDir}/${appTemplate}/CMakeLists.txt`),
            this.destinationPath(`${appsDir}/${appName}/CMakeLists.txt`),
            { appName: appName }
        );

        this.fs.copyTpl(
            this.templatePath(`${appsDir}/${appTemplate}/main.cpp`),
            this.destinationPath(`${appsDir}/${appName}/main.cpp`),
            { appName: appName }
        );

        this.fs.copyTpl(
            this.templatePath(`${externDir}/CMakeLists.txt`),
            this.destinationPath(`${externDir}/CMakeLists.txt`)
        )

        this.fs.copyTpl(
            this.templatePath(`${libsDir}/CMakeLists.txt`),
            this.destinationPath(`${libsDir}/CMakeLists.txt`)
        )

        this.spawnSync('git', ['init']);
        this.spawnSync('git', ['submodule', 'add', 'https://github.com/google/googletest.git', 'extern/googletest']);

    }

};
