const { response } = require("express")
const express = require("express")
const app = express()
const https = require("https")
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended:true}))

app.get("/", (req, res) => {
  res.sendFile(__dirname+"/index.html")
})

app.post("/", (req, res) => {
  const city = req.body.city

  const url = "https://api.openweathermap.org/data/2.5/weather?appid=356e8bd17d6efa671cfe38d7445a9d29&units=metric&q="+city
    https.get(url, (response) => {
      response.on("data", (data) => {
        const temp = JSON.parse(data).main.temp
        const discription = JSON.parse(data).weather[0].description
        const icon = JSON.parse(data).weather[0].icon
        const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
        
        res.write("<h1>The weather is like "+discription+"</h1>")
        res.write("<h2>Temp in London is " + temp + "digree celcius</h2>")
        res.write("<img src="+imgUrl+">")
        res.send()
      })
    })
})
app.listen(3000,()=>{console.log("listening at 3000")})