const express = require('express')
const app = express()
const path = require('path')
app.set('view engine' , 'hbs')
const viewsDic = path.join(__dirname,'../templates/viewsFiles')
app.set('views' , viewsDic)

//port
const port = process.env.PORT || 3000

const request = require('request')

const newsapi = (callback)=>{
    const newUrl = 'https://newsapi.org/v2/top-headlines?country=eg&apiKey=e791f5e1b84342129563ba9bbb6831ec'
    request({url:newUrl,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect' , undefined)
        }
        else if(response.body.message){
            callback('Invaild Key' , undefined)
        }
        else{
            callback(response.body)
        }
    })
}

app.get('/',(req,res)=>{
    newsapi((error, data)=>{
        if(error){
            res.render('index', error)
        }
        else{
            res.send('index', data.articles)
        }
    })

})

//listen
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })