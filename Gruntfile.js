module.exports = function(grunt) {
  grunt.initConfig({
    less: {
      algaworks: {
        files: {
          "dist/assets/stylesheets/algaworks.css": "sources/less/algaworks.less"
        }
      },
      application: {
        files: {
          "dist/assets/stylesheets/application.css": "sources/less/application.less"
        }
      },
      vendors: {
        files: {
          "dist/assets/stylesheets/vendors.css": "sources/less/vendors.less"
        }
      }
    },

    concat: {
      'vendors-css': {
        src: ["dist/assets/stylesheets/vendors.css", "dist/assets/vendors/sweetalert/*.css"],
        dest: "dist/assets/stylesheets/vendors.css"
      },
      'vendors-scripts': {
        src: ["dist/assets/vendors/jquery/jquery.js", 
              "dist/assets/vendors/bootstrap/bootstrap.js",
              "dist/assets/vendors/sweetalert/sweetalert-dev.js",
              "dist/assets/vendors/stickytableheaders/jquery.stickytableheaders.js"],
        dest: "dist/assets/javascripts/vendors.js"
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: "dist/assets/stylesheets",
          src: ["*.css", "!*.min.css", "!application.css"],
          dest: "dist/assets/stylesheets",
          ext: ".min.css"
        }]
      }
    },

    uglify: {
      vendors: {
        files: {
          'dist/assets/javascripts/vendors.min.js': ['dist/assets/javascripts/vendors.js']
        }
      },
      algaworks: {
        files: {
          'dist/assets/javascripts/algaworks.min.js': ['dist/assets/javascripts/algaworks.js']
        }
      }
    },

    includes: {
      build: {
        src: ["*.html", "security/*.html", "errors/*.html", "components/*.html"],
        dest: "dist/",
        cwd: "sources/html",
        options: {
          flatten: true,
        }
      }
    },

    "http-server": {
      dev: {
        root: "dist",
        port: 8282,
        host: "127.0.0.1",
        cache: 0,
        showDir : true,
        autoIndex: true,
        ext: "html",
        runInBackground: true,
        openBrowser : false 
      }
    },

    copy: {
      'javascripts': {
        expand: true,
        cwd: "sources/javascripts",
        src: ["algaworks.js"],
        dest: "dist/assets/javascripts/",
      },
      fonts: {
        expand: true,
        cwd: "assets/vendors/bower/",
        src: ["font-awesome/fonts/**", "bootstrap/fonts/**"],
        dest: "dist/assets/vendors/",
      },
      sweetalert: {
        expand: true,
        cwd: "assets/vendors/bower/sweetalert/dist/",
        src: ["sweetalert-dev.js", "sweetalert.css"],
        dest: "dist/assets/vendors/sweetalert/",
      },
      stickytableheaders: {
        expand: true,
        cwd: "assets/vendors/bower/StickyTableHeaders/js/",
        src: ["jquery.stickytableheaders.js"],
        dest: "dist/assets/vendors/stickytableheaders/",
      },
      jquery: {
        expand: true,
        cwd: "assets/vendors/bower/jquery/dist/",
        src: ["jquery.js"],
        dest: "dist/assets/vendors/jquery/",
      },
      bootstrap: {
        expand: true,
        cwd: "assets/vendors/bower/bootstrap/dist/js/",
        src: ["bootstrap.js"],
        dest: "dist/assets/vendors/bootstrap/",
      },
      images: {
        expand: true,
        cwd: "assets/",
        src: ["images/**"],
        dest: "dist/assets/",
      },
    },

    watch: {
      less: {
        files: ["sources/less/**/*.less"],
        tasks: ["less:algaworks", "less:application", "cssmin"],
        options: {
          nospawn: true
        }
      },
      html: {
        files: ["sources/html/**/*.html"],
        tasks: ["includes"],
        options: {
          nospawn: true
        }
      },
      javascript: {
        files: ["sources/javascripts/**/*.js"],
        tasks: ["copy:javascripts", "uglify:algaworks"],
        options: {
          nospawn: true
        }
      }
    }
  });

  ["contrib-less", "contrib-watch", "contrib-copy", "contrib-cssmin", "contrib-uglify",
      "contrib-concat", "includes", "http-server"].forEach(function(plugin) {
    grunt.loadNpmTasks("grunt-" + plugin);
  });

  grunt.registerTask("default", ["http-server", "copy", "less", "concat", "uglify", 
    "cssmin", "includes", "watch"]);
};