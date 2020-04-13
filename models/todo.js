const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  name: {
    type: String, //資料型別
    required: true, //必填欄位
  },
  done: {
    type: Boolean,
    default: false,
  },
  //加入userId , 建立跟 User 的關聯
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true,
    required: true,
  },
});

module.exports = mongoose.model("Todo", todoSchema);
