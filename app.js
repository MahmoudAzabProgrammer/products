const express = require("express")
const fileUpload = require("express-fileupload")
const bodyParser = require("body-parser")
const mysql = require("mysql")
const path = require("path")
const app = express()
const port = 3000


app.set("port", process.env.port || port);
console.log("mainPath = " + __dirname)
//app.set("views", __dirname + "/views")
//app.set("view engine", "ejs")
app.set('view engine', 'ejs')
app.set('views', 'views')//default



app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())  //parse data from client as json
app.use(express.static(path.join(__dirname, 'public')))
app.use(fileUpload()) //configure file upload

// configure routes for products app
const {mainPage} = require("./routes/index");
const {addProductPage, addProduct, editProductPage, editProduct, deleteProduct} = require("./routes/product");

app.get("/", mainPage)
app.get("/add", addProductPage) 
app.get("/edit/:id", editProductPage) 
app.get("/delete/:id", deleteProduct) 

app.post("/add", addProduct) 
app.post("/edit/:id", editProduct)


// create connection on database sql
const db = mysql.createConnection({
    host : "localhost",
    user: "root",
    password: "",
    database: "products"
})
db.connect((err) => {
    if(err) throw err;
    console.log("connection Successed")

})
global.db = db;

app.listen(port , ()=> {console.log("server is running on port: " + port)})



