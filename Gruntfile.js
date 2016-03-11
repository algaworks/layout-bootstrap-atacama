module.exports = function(grunt) {
  grunt.initConfig({
    less: {
      layout: {
        files: {
          "dist/assets/stylesheets/layout.css": "sources/less/layout.less"
        }
      },
      vendor: {
        files: {
          "dist/assets/stylesheets/vendors.bundle.css": "sources/less/vendors.less"
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
      fonts: {
        expand: true,
        cwd: "assets/vendors/bower/",
        src: ["font-awesome/fonts/**", "bootstrap/fonts/**"],
        dest: "dist/assets/vendors/",
      },
      sweetalert: {
        expand: true,
        cwd: "assets/vendors/bower/sweetalert/dist/",
        src: ["sweetalert.min.js", "sweetalert.css"],
        dest: "dist/assets/vendors/sweetalert/",
      },
      jquery: {
        expand: true,
        cwd: "assets/vendors/bower/jquery/dist/",
        src: ["jquery.min.js"],
        dest: "dist/assets/vendors/jquery/",
      },
      bootstrap: {
        expand: true,
        cwd: "assets/vendors/bower/bootstrap/dist/js/",
        src: ["bootstrap.min.js"],
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
        files: ["sources/less/**/*.less", "sources/html/**/*.html"],
        tasks: ["less:layout", "includes"],
        options: {
          nospawn: true
        }
      }
    }
  });

  ["contrib-less", "contrib-watch", "contrib-copy", "includes", "http-server"].forEach(function(plugin) {
    grunt.loadNpmTasks("grunt-" + plugin);
  });

  grunt.registerTask("default", ["http-server", "copy", "less", "includes", "watch"]);
};