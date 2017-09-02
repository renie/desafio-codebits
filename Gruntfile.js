module.exports = grunt => {
	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);
	
	let sourcePath	= 'src/',
		publicPath	= 'public/',
		tempPath	= 'temp/';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		copy: {
			main: { expand: true, cwd: tempPath, src: '**', dest: publicPath }
		},
		
		clean: [publicPath, tempPath],
		
		mkdir: {
			all: {
				options: {
					mode: 0777,
					create: [publicPath]
				},
			},
		},
		
		processhtml: { 
			dist: { 
				files: { 'temp/index.html': ['src/index.html'] }
			}
		}
		
	});
	
	grunt.registerTask('clear', ['clean', 'mkdir']);
	
	grunt.registerTask('default', ['clear', 'processhtml', 'copy']);
};