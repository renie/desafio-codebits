module.exports = grunt => {
	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);
	
	let sourcePath	= 'src/',
		publicPath	= 'public/',
		tempPath	= 'temp/';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		copy: {
			main: { expand: true, cwd: tempPath, src: '**', dest: publicPath },
			libs: { expand: true, cwd: sourcePath + 'libs', src: ['**', '!templates/**/*'], dest: publicPath + 'libs' }
		},
		
		clean: {
			all : [publicPath, tempPath],
			tmp : [tempPath]
		},
		
		mkdir: {
			all: {
				options: {
					mode: 0777,
					create: [publicPath]
				},
			}
		},
		
		processhtml: { 
			dist: { 
				files: { 'temp/index.html': [sourcePath + 'index.html'] }
			}
		},
		
		handlebars: {
			compile: {
				options: {
					namespace: filePath => {
						let regex = /^src\/templates\/([a-z0-9]+)\/[a-z0-9]+.hbs$/;
						return filePath.replace(regex, "_templates.$1");
					},
					commonjs: true,
					processName: filePath => {
						let regex = /^src\/templates\/[a-z0-9]+\/([a-z0-9]+).hbs$/;
						return filePath.replace(regex, "$1");
					}
				},
				files: {
					'src/js/templates.js': sourcePath + 'templates/**/*.hbs',
					'temp/js/templates.js': sourcePath + 'templates/**/*.hbs'
				}
			}
		},
		
		sass: { 
			dist: {                        
				files: {
					'temp/style/app.css': sourcePath + 'style/snippet.scss',
				}
			}
		},
		
		browserify: {
			dist: {
				files: {
					'temp/js/app.js': [sourcePath + 'js/**/*.js', tempPath + 'templates/**/*.js']
				},
				options: {
					transform: [['babelify', { presets: 'es2015' }]],
					exclude: ['jquery', 'underscore']
				}
			}
		},
		
		watch: {
			scripts: {
				files: [sourcePath + '**/*'],
				tasks: ['default'],
				options: { spawn: false },
			}
		}
		
	});
	
	grunt.registerTask('clear', ['clean:all', 'mkdir']);
	grunt.registerTask('js', ['browserify']);
	
	grunt.registerTask('default', ['clear', 'processhtml', 'sass', 'handlebars', 'js', 'copy', 'clean:tmp']);
};