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
			libs: { expand: true, cwd: sourcePath + 'libs', src: '**', dest: publicPath + 'libs' }
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
				files: { 'temp/index.html': ['src/index.html'] }
			}
		},
		
		browserify: {
			dist: {
				files: {
					'temp/js/app.js': 'src/js/**/*.js'
				},
				options: {
					transform: [['babelify', { presets: "es2015" }]],
					plugins: "uglifyify"
				}
			}
		},
		
		watch: {
			scripts: {
				files: [sourcePath + '**/*'],
				tasks: ['default'],
				options: { spawn: false },
			},
		}
		
	});
	
	grunt.registerTask('clear', ['clean:all', 'mkdir']);
	grunt.registerTask('js', ['browserify']);
	
	
	grunt.registerTask('default', ['clear', 'processhtml', 'js', 'copy', 'clean:tmp']);
};