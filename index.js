//Bring in Express server and create application, 
let express = require('express');
let pieRepo = require('./repos/pieRepo')
//we bring express() from express npm package, many other objects are created form this application object 
let app = express();


//Use the express Router method that is used to create new Router objects, router obj is collections of middlewares and routes
let router = express.Router();
// got object from module inside repos directory. 


//Create GET to return a list of all pies 
router.get('/', function (req, res, next){
    pieRepo.get(function (data){
    res.status(200).json({
        "status": 200,
        "statusText": "OK",
        "message": "All pies retrieved",
        "data": data
    });
}, function(err){
    next(err)
    });
});

// Configure router so all routes are prefixed with /api/v1
app.use('/api/',router);

// Create server to listen  on port 5000
var server = app.listen(5000, function(){
    console.log('Node server is running on http://localhost:5000..')
});