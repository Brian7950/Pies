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

//Create GET/id to return a single pie 
router.get('/:id', function(req,res,next){
    pieRepo.getById(req.params.id, function(data){
        if(data){
            res.status(200).json({
                "status": 200,
                "statusText": "OK",
                "message": "Single Pie retrieved",
                "data": data
            });
        }
        else{
            res.status(404).json({
                "status":404,
                "statusText": "The pie with ID " + req.params.id + " could not be found.",
                "error":{
                    "code":"NOT_FOUND",
                    "message":  "The pie with ID " + req.params.id + " could not be found."
                }
            });
        }
    },function(err){
        next(err);
    });
});

// Configure router so all routes are prefixed with /api/v1
app.use('/api/',router);

// Create server to listen  on port 5000
var server = app.listen(5000, function(){
    console.log('Node server is running on http://localhost:5000..')
});