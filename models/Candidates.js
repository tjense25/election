var mongoose = require('mongoose');
var CandidateSchema = new mongoose.Schema({
	title:String,
	votes:{type: Number, default: 0}
});
CandidateSchema.methods.upvote = function(cd) {
	this.upvotes += 1;
	this.save(cd);
};
mongoose.model('Candidate', CandidateSchema);
