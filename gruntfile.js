module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    mochaTest: {
      tests: {
        options: {
          require: 'test/setup/node.js',
          reporter: 'dot',
          clearRequireCache: true,
          mocha: require('mocha')
        },
        src: [
          'test/setup/helpers.js',
          'test/unit/**/*.spec.js'
        ]
      }
    },

    watch: {
      options: {
        spawn: false
      },
      all: {
        files: ['backbone-ractive.js', 'test/unit/**'],
        tasks: ['test']
      }
    }
  });

  grunt.registerTask('test', [
    'mochaTest'
  ]);
};
