const mongoose  = require('mongoose')

const adminSchema = new mongoose.Schema({
  adminId: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  }
});
module.exports = mongoose.models.Admin || mongoose.model("Admin", adminSchema);