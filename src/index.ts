
import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { UserModel, ContentModel, LinkModel } from './db.js';
import {JWT_PASSWORD} from './config.js'
import { userMiddleware } from './middleware.js';
import { random } from './utils.js';

const app = express();
app.use(express.json())

app.post('/api/v1/signup', async (req, res) => {

   const username =  req.body.username
   const password = req.body.password

   try{
    await UserModel.create({
        username: username,
        password: password
    })

    res.json({
        message: "User signed up successfully"
    })
 } catch(e){
    res.status(411).json({
        message: "user already exists"
    })
 }

})

app.post('/api/v1/signin', async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const existingUser = await UserModel.findOne({
        username, password
    })

    if(existingUser){
        const token = jwt.sign({
           id: existingUser._id 
        }, JWT_PASSWORD)
       
        res.json({
        token
    })
    }else(
        res.json({message: "Incorrect username or password"})
    )
})

app.post('/api/v1/content', userMiddleware,async (req, res) =>{

    const type = req.body.type
    const link = req.body.link

   await ContentModel.create({
        type,
        link,
        //@ts-ignore
        title: req.body.title,
        //@ts-ignore
        userId: req.userId,
        tags:[]
    })
    res.json({
        message: "Content Added"
    })

})

app.get('/api/v1/content', userMiddleware, async (req, res) =>{
    //@ts-ignore
   const userId = req.userId
   const content =  await ContentModel.find({userId : userId}).populate("userId", "username")

   res.json({
    content
   })
})

app.delete('/api/v1/content', userMiddleware, async (req, res) =>{
    
    const contentId = req.body.contentId
    await ContentModel.deleteMany({
        contentId,
        //@ts-ignore
        userId : req.userId
    })


})

app.post('/api/v1/brain/share', async (req, res) =>{

    const share = req.body.share

    if(share){
        //generate a unique shareable link
       await  LinkModel.create({
            //@ts-ignore
            userId: req.userId,
            hash: random(10)

        })
    } else{
          await LinkModel.deleteOne({
            //@ts-ignore
            userId: req.userId
          })   
    }
    res.json({
        message: "Updated share link"
    })

})

app.get('/api/v1/brain/:shareLink', async(req, res)=>{

    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({
        hash: hash
    })

    //if hash is incorrect
    if(!link){
        res.status(404).json({
            message: "sorry, link not found"
        })
        return;
    } 

    const content = await ContentModel.findOne({
        userId: link.userId
    })

    const user = await UserModel.findOne({
        userId: link.userId
    })

    if(!user){
       res.status(404).json({
            message: "user not found"
        })
        return; 
    }

    res.json({
        username: user.username,
        content: content
    })
    
})


app.listen(3000);