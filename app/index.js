import Generator from 'yeoman-generator';

export default class extends Generator {

    writing() {

        const projectName = 'MYPROJECT';

        const appsDirectory = 'apps';
        const appTemplate = 'app';

        const libsDirectory = 'libs';

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
            this.templatePath(`${appsDirectory}/CMakeLists.txt`),
            this.destinationPath(`${appsDirectory}/CMakeLists.txt`),
            { appName: appName }
        );

        this.fs.copyTpl(
            this.templatePath(`${appsDirectory}/${appTemplate}/CMakeLists.txt`),
            this.destinationPath(`${appsDirectory}/${appName}/CMakeLists.txt`),
            { appName: appName }
        );

        this.fs.copyTpl(
            this.templatePath(`${appsDirectory}/${appTemplate}/main.cpp`),
            this.destinationPath(`${appsDirectory}/${appName}/main.cpp`),
            { appName: appName }
        );

        this.fs.copyTpl(
            this.templatePath(`${libsDirectory}/CMakeLists.txt`),
            this.destinationPath(`${libsDirectory}/CMakeLists.txt`)
        )

    }

};
