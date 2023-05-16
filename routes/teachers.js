const express = require('express');
const router = express.Router();
const Teachers = require('../models/teacher');
var fs = require('fs');
const multer = require('multer');


const upload = multer({dest: 'Images/'})
module.exports = router;


//saving image to folder
router.post('/api/image', upload.single('image'), function (req, res) {
    const file = req.file;
    console.log(file.path)
    console.log(file.originalname)
    fs.rename(file.path, 'frontend/src/media/excellent-teachers/'+file.originalname, function(err) {
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
        const posts = await Teachers.find();
        res.json(posts)
    }catch(err){
        res.status(500).json({message: err.message})
    
    }
});

//getting one
    //posts by id
router.get('/api/id/:id', getTeacher, (req, res) => {
res.json(res.teacher);
})

//get posts by faculty
router.get('/api/faculty/:faculty', getTeacherByFaculty, (req, res) => {
res.json(res.teacher); 
})  
const app = express();



//create one teacher
router.post('/api/teacher', async (req, res) => {
const teacher = new Teachers ({
name: req.body.name,
caption: req.body.caption,
faculty: req.body.faculty,
imageURL: req.body.imageURL
})
fs.appendFile('myImage.jpg', teacher.imageURL, function (err) {
    if (err) throw err;
    console.log('Saved!');
  }); 
console.log(teacher);
let teacherId; //v této proměnné je uloženo Id postu
try{
    const newTeacher = await teacher.save();
    res.status(201).json(newTeacher._id);
   // console.log(res.status(201).json(newPost._id));
   teacherId = newTeacher._id._id;
}catch(err){
    res.status(400).json({message: err.message});
}})

//update one
router.patch('/api/id/:id', getTeacher, async (req, res) => {
if(req.body.name != null){
        res.post.name = req.body.name;
    }
if(req.body.caption != null){
    res.post.caption = req.body.caption;
}
if(req.body.faculty != null){
    res.post.faculty = req.body.faculty;
}
if(req.body.imageURL != null){
    res.post.imageURL = req.body.imageURL;
}
try{
const updatedTeacher = await res.teacher.save();
res.json(updatedTeacher);
}catch(err){
res.status(400).json({message: err.message});
}
})

router.delete("/api/id/:id", getTeacher, async (req, res) => {
try{
await res.teacher.remove();
res.json({message: "deleted"});
}catch(err){
res.status(500).json({message: err.message});
}
})


async function getTeacherByFaculty(req, res, next){
    try{
       teacher = await Teachers.find({faculty: req.params.faculty },{});
        //post = await Posts.find({}, {ukforum: {category: req.params.category}});
        if(teacher == null){
            return res.status(404).json({message: "Teacher doesnt exist"});
        }
}catch(err){
        return res.status(500).json({message: err.message});
}
res.teacher = teacher;
next();
}

async function getTeacher(req, res, next){
    try{
        teacher = await Teachers.findById(req.params.id);
        if(teacher == null){
            return res.status(404).json({message: "Teacher doesnt exist"});
        }
    }catch(err){
        return res.status(500).json({message: err.message});
    }
res.teacher = teacher;
next();
}