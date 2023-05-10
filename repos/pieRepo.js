//fs is a built in node module that knows how to read/write files
let fs = require('fs');

const FILE_NAME = './assets/pies.json';

let pieRepo = {
    // using promise design pattern
    get: function(resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data){
            if(err){
                reject(err);
            }
            else {
                resolve(JSON.parse(data));
            }
        });
    },
    getById: function(id, resolve, reject){
        fs.readFile(FILE_NAME, function(err, data){
            if(err){
                reject(err)
            }
            else{
                let pie= JSON.parse(data).find(p => p.id == id);
                resolve(pie)
            }
        });
    }
    }

module.exports = pieRepo;