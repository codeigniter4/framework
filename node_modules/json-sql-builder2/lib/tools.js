'use strict';

const fs = require('fs');
const path = require('path');

/**
 * walk
 *
 * Returns all files from the given directory in
 * a recursive way as array.
 *
 * @param dir	{String}	Specifies the directory
 * @return files {Array}	All files found recursivly
 */
let walk = function(dir) {
	var results = [];
	var list = fs.readdirSync(dir);
	list.forEach(function(file) {
		file = path.join(dir, file);
		var stat = fs.statSync(file);
		if (stat && stat.isDirectory()){
			results = results.concat(walk(file));
		} else {
			results.push(file)
		}
	});
	return results;
}
module.exports.walk = walk;
