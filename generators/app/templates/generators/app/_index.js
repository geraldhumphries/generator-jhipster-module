'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var packagejs = require(__dirname + '/../../package.json');

// Stores JHipster variables
var jhipsterVar = {moduleName: '<%= moduleName %>'};

// Stores JHipster functions
var jhipsterFunc = {};

module.exports = yeoman.Base.extend({

  initializing: {
    compose: function (args) {
      this.composeWith('jhipster:modules',
        {
          options: {
            jhipsterVar: jhipsterVar,
            jhipsterFunc: jhipsterFunc
          }
        },
        this.options.testmode ? {local: require.resolve('generator-jhipster/modules')} : null
      );
    },
    displayLogo: function () {
      // Have Yeoman greet the user.
      this.log('Welcome to the ' + chalk.red('JHipster <%= moduleName %>') + ' generator! ' + chalk.yellow('v' + packagejs.version + '\n'));
    }
  },

  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'input',
      name: 'message',
      message: 'Please put something',
      default: 'hello world!'
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    writeTemplates : function () {
      this.baseName = jhipsterVar.baseName;
      this.packageName = jhipsterVar.packageName;
      this.angularAppName = jhipsterVar.angularAppName;
      var javaDir = jhipsterVar.javaDir;
      var resourceDir = jhipsterVar.resourceDir;
      var webappDir = jhipsterVar.webappDir;

      this.message = this.props.message;

      this.log('baseName=' + this.baseName);
      this.log('packageName=' + this.packageName);
      this.log('angularAppName=' + this.angularAppName);
      this.log('message=' + this.message);

      this.template('dummy.txt', 'dummy.txt', this, {});
    }<% if(hook != 'none') { %>,

    registering: function () {
      try {
        jhipsterFunc.registerModule("generator-jhipster-<%= moduleName %>", "<%= hookFor %>", "<%= hookType %>", "<%= hookCallback %>", "<%= moduleDescription %>");
      } catch (err) {
        this.log(chalk.red.bold('WARN!') + ' Could not register as a jhipster <%= hookFor %> <%= hookType %> creation hook...\n');
      }
    }<% } %>
  },

  install: function () {
    this.installDependencies();
  },

  end: function () {
    this.log('End of <%= moduleName %> generator');
  }
});
