const express = require('express')
const fileUpload = require('express-fileupload')
const path = require('path')

const app = express()

app.set('view engine','ejs')

app.use(fileUpload())

app.get('/',async(req, res, next) => {

    res.render('index')

})

app.post('/single', async(req, res, next)=>{

    try{

const file = req.files.mFile
console.log(file)
const fileName = new Date().getTime().toString() + path.extname(file.name) //to give new name to file while uploading
const savePath = path.join(__dirname, 'public','uploads',fileName)

if(file.truncated)
{
    throw new Error('File size is too big') //to show that file size is too huge 
}

if(file.mimetype!=='image/png')
{
    throw new Error("Only png is supported") //to show that only jpeg files are supported
}

await file.mv(savePath)
res.redirect('/')
    } 
    
    catch(error)
    {
        console.log(error)
        res.send("Error uploading file")
    }
})

app.post('/multiple', async(req, res, next)=>{

    try{

        const files = req.files.mFiles

const promises = files.map((file) => {
    const savePath = path.join(__dirname, 'public', 'uploads', file.name)
    return file.mv(savePath)
})

        await Promise.all(promises)
        res.redirect('/')
        
    }catch(error){

        console.log(error)
        res.send("Error uploading file")
    }

})

app.listen(3000, ()=>
    console.log("server running on port 3000")
)
