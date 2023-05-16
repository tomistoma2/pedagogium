const express = require('express');
const router = express.Router();
const Posts = require('../models/post');
var fs = require('fs');
const multer = require('multer');
const upload = multer({dest: 'Images/'})

module.exports = router;



//saving image to folder
router.post('/api/image', upload.single('image'), function (req, res) {
    const file = req.file;
    console.log(file.path)
    console.log(file.originalname)
    fs.rename(file.path, 'frontend/src/media/science/'+file.originalname, function(err) {
      if (err) {
        console.log(err);
        res.status(500).send('Error occurred while saving the image');
      } else {
        res.status(200).json({ message: 'Image uploaded successfully' });
      }
    });
  });

//getting all
router.get('/api', async (req, res) => {
    try{
        const posts = await Posts.find();
        res.json(posts)
    }catch(err){
        res.status(500).json({message: err.message})
    
    }
});

//getting one
    //posts by id
router.get('/api/id/:id', getPost, (req, res) => {
res.json(res.post);
})

//get posts by section
router.get('/api/section/:section', getPostBySection, (req, res) => {
res.json(res.post); 
})  


//create one post
router.post('/api/post', async (req, res) => {
const post = new Posts ({
caption: req.body.caption,
content: req.body.content,
contentShort: req.body.contentShort,
section: req.body.section,
imageURL: req.body.imageURL,
url: req.body.url
})
let postId; //v této proměnné je uloženo Id postu
try{
    const newPost = await post.save();
    res.status(201).json(newPost._id);
   postId = newPost._id._id;
   console.log("created!");
}catch(err){
    res.status(400).json({message: err.message});
}})

//update one
router.patch('/api/id/:id', getPost, async (req, res) => {
if(req.body.caption != null){
        res.post.caption = req.body.caption;
    }
if(req.body.content != null){
    res.post.content = req.body.content;
}
if(req.body.contentShort != null){
    res.post.contentShort = req.body.contentShort;
}
if(req.body.section != null){
    res.post.section = req.body.section;
}

if(req.body.imageURL != null){
    res.post.imageURL = req.body.imageURL;
}
if(req.body.url != null){
    res.post.url = req.body.url;
}
try{
const updatedPost = await res.post.save();
res.json(updatedPost);
}catch(err){
res.status(400).json({message: err.message});
}
})

router.delete("/api/id/:id", getPost, async (req, res) => {
try{
await res.post.remove();
res.json({message: "deleted"});
}catch(err){
res.status(500).json({message: err.message});
}
})


async function getPostBySection(req, res, next){
    try{
       post = await Posts.find({section: req.params.section },{});
        //post = await Posts.find({}, {ukforum: {category: req.params.category}});
        if(post == null){
            return res.status(404).json({message: "Post doesnt exist"});
        }
}catch(err){
        return res.status(500).json({message: err.message});
}
res.post = post;
next();
}

async function getPost(req, res, next){
    try{
        post = await Posts.findById(req.params.id);
        if(post == null){
            return res.status(404).json({message: "Post doesnt exist"});
        }
    }catch(err){
        return res.status(500).json({message: err.message});
    }
res.post = post;
next();
}