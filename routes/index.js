var express = require('express');
var mongoose = require('mongoose');
var Candidate = mongoose.model('Candidate');
var router = express.Router();

router.get('/voter', function(req, res, next) {
	res.sendFile('voter.html', {root: 'public'});
});
router.get('/administrator', function(req, res, next) {
	res.sendFile('administrator.html', {root: 'public'});
});
router.post('/candidate', function(req, res, next) {
	var candidate = new Candidate(req.body);
	candidate.save(function(err, comment) {
		if(err) return next(err);
		res.json(candidate);
	});
});
router.get('/candidate', function(req,res,next) {
	Candidate.find(function(err, candidates) {
		if(err) return next(err);
		res.json(candidates);
	});
});
router.get('/candidate/:candidate', function(req,res,next) {
	res.json(req.comment);
});
router.put('/candidate/:candidate/upvote', function(req,res,next) {
	req.candidate.upvote(function(err, comment) {
		if(err) return next(err);
		res.json(comment);
	});
});
router.delete('/candidate/:candidate', function(req, res) {
	console.log("in delete");
	req.candidate.remove();
	res.sendStatus(200);
});
router.param('candidate', function(req,res,next,id) {
	var query = Candidate.findById(id);
	query.exec(function(err, candidate) {
		if(err) return next(err);
		if(!candidate) return next(new Error("can't find candidate"));
		req.candidate = candidate;
		return next();
	});
});
module.exports = router;
