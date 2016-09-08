var Yelp = require('yelp');

var yelp = new Yelp({
	consumer_key: '_1Kxu0NdU02g_myZiaaVMQ',
	consumer_secret: 'cQJNZiyseTLos6GPESktwOSAbQ0',
	token: 'UoJZd3FQZaPfD-fpfTkYEmZad7IMmJIr',
	token_secret: 'FfGhCbWh-kAOd55qOZhulhgttuY',
});


function REST_ROUTER(router) {
	var self = this;
	self.handleRoutes(router);
}


function queryHandler(res, params) {
	yelp.search(params)
	.then(function (data) {
		res.send(data.businesses);
	})
	.catch(function (err) {
		res.send(err);
	});
	
}

REST_ROUTER.prototype.handleRoutes = function(router) {
	var self = this;
	router.get("/", function(request, response){
		response.json({"message": "Hello World!"});
	});

	router.get("/bylocation/:term/:location", function(req, res){
		var term     = req.params.term;
		var location = req.params.location;
		var params   = {"term": term, "location": location};
		queryHandler(res, params);
	});

	router.get("/bycoord/:term/:ll", function(req, res){
		var term   = req.params.term;
		var ll     = req.params.ll;
		var params = {"term": term, "ll": ll};
		queryHandler(res, params);
	});
};

module.exports = REST_ROUTER;