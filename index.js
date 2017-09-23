var fs = require('fs')
var getExtension = require('file-extension')

var baseDir = './testdir'
var files = fs.readdirSync(baseDir)

function organizer(files){
	files.forEach(function(file) {
	    var existingPath = baseDir + '/' + file
	    var stats = fs.statSync(existingPath)
	    var ext = getExtension(file)

	    var directoryPath = baseDir + '/' + ext
	    var extendedPath = baseDir + '/' + ext + '/' + file

	    if (!stats.isDirectory()) {
	        if (fs.existsSync(directoryPath)) {
	            fs.renameSync(existingPath, extendedPath)
	        } else {
	            fs.mkdirSync(directoryPath);
	            fs.renameSync(existingPath, extendedPath)
	        }
	    }    
	})
}

fs.watch(baseDir, function(eventType, filename){	
	if (eventType == 'change'){
		organizer([filename])
	}
});
