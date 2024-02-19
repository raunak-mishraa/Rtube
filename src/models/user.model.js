import mongoose, { mongo } from "mongoose";
import { Jwt } from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: true,//indexing for faster search
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    avatar: {
        type: String,//cloudinary url
        required: true,
    },
    coverImage: {
        type: String,//cloudinary url
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:'Video'
        }
    ],
    password: {
        type: String,
        required: [true, 'Password is required'],//custom error message
    },
    refreshToken:{
        type:String,
    },
},{timestamps:true});


//data save hone se pehle password ko hash karna hain then ye middleware use karenge, jaga save ek event hain
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();//if password is not modified then return next, basically agar password change nahi hua toh next kar do
    this.password = await bcrypt.hash(this.password, 10)
    next()
})
userSchema.methods.isCorrectPassword = async function(password){//password match karne ke liye login ke time pe
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_SECRET
        }
    )
}

export const User = mongoose.model('User', userSchema); 