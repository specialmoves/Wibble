module.exports = function(grunt) {
	grunt.initConfig({
		shell: {
	        mongo: {
	            command: 'mongod'
	        }
	    },		
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				files: {
					'assets/styles/style.css' : 'assets/sass/style.scss'
				}
			}
		},
		watch: {
			css: {
				files: '**/*.scss',
				tasks: ['sass']
			}
		},
		nodemon: {
		  dev: {
		    options: {
		      file: 'app.js',
		      ignoredFiles: ['README.md', 'node_modules/**'],
		      watchedExtensions: ['js', 'hbs'],
		      legacyWatch: true,
		      env: {
		        PORT: '3000'
		      },
		      cwd: __dirname
		    }
		  },
		  exec: {
		    options: {
		      exec: 'less'
		    }
		  }
		},
		concurrent: {
		  dev: {
		    tasks: ['shell','watch','nodemon'],
		    options: {
		      logConcurrentOutput: true
		    }
		  }
		}	
	});
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-shell');

	grunt.registerTask('default',['concurrent']);
}