const {model} = require("mongoose");
const { ResourceSchema } = require("../schemas/ResourceSchema");

const ResourceModel = model("resource", ResourceSchema);
module.exports = ResourceModel;