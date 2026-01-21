
import mongoose, {model, Schema} from  "mongoose";

mongoose.connect("mongodb+srv://vijaycdevkate_db_user:8duB85wUG8yikK6i@second-brain-cluster.6s5sy8y.mongodb.net/?appName=second-brain-cluster")
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error(err));

const UserSchema = new Schema({
    username : {type:String, unique:true},
    password : String
})

export const UserModel =  model("User", UserSchema)

const contentSchema = new Schema({
    title: String,
    type:String,
    link: String,
    tags: [{type:mongoose.Types.ObjectId, ref:'Tag'}],
    userId: [{type:mongoose.Types.ObjectId, ref:'User', required:true}]

})

export const ContentModel = model("Content", contentSchema)

const LinkSchema = new Schema({
    hash: String,
    userId: [{type:mongoose.Types.ObjectId, ref:'User', required:true, unique:true}]
 
})

export const LinkModel =  model("Link", LinkSchema)