module.exports = function (grunt) {
    grunt.initConfig({
        mochacli: {
            options: {
                require: ['should'],
                reporter: 'nyan',
                bail: true
            },
            all: ['Tests/*.js']
        }
    });
    grunt.loadNpmTasks('grunt-mocha-cli');
    grunt.registerTask('test', ['mochacli']);

};