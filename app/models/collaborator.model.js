const mongoose = require("mongoose");
const schema = mongoose.Schema(
	{   
		name: {
			type: String,
			required: [true, 'Colloborator name is required']
		},
		address: String,
		phone: String,
		website: String,
	},
	{
		timestamps: true
	}
)
schema.method('toJSON', function(){
	const { __v, _id, ...object} = this.toObject();
	object.id = _id;
	return object;
});
module.exports = mongoose.model('colloborator', schema);