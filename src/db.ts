
import mongoose, {model, Schema} from  "mongoose";

mongoose.connect("mongodb+srv://vijaycdevkate_db_user:8duB85wUG8yikK6i@second-brain-cluster.6s5sy8y.mongodb.net/?appName=second-brain-cluster")
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error(err));

const UserSchema = new Schema({
    username : {type:String, unique:true},
    password : String
})

export const UserModel =  model("Users", UserSchema)

const contentSchema = new Schema({
    title: String,
    links: String,
    tag: [{type:mongoose.Types.ObjectId, ref:'Tags'}],
    userId: [{type:mongoose.Types.ObjectId, ref:'Users', required:true}]

})

export const ContentModel = model("Contents", contentSchema)

const LinkSchema = new Schema({
    hash: String,
    userId: [{type:mongoose.Types.ObjectId, ref:'Users', required:true, unique:true}]
 
})

export const LinkModel =  model("Links", LinkSchema)