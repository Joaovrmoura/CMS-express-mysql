require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3060
const path = require('path')
const publicRoutes = require('./src/routes/public')
const privateRoutes = require('./src/routes/private')

const session = require('express-session')

app.use(session({
    secret: 'eoeoi)Ç{{^^)_)QLsesdfdffejodDLW#5w0@%¨@¨@H)(_',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } 
}));


app.use(express.json())
app.use(express.urlencoded({urlencoded:true}))


app.use('/', publicRoutes)
app.use('/admin', privateRoutes)

app.set('view engine', 'ejs')

app.set('views', [
    path.join(__dirname, 'src', 'views'),
    path.join(__dirname, 'src', 'views', 'public'),
    path.join(__dirname, 'src', 'views', 'admin')
])

app.use(express.static(path.join(__dirname, 'src', 'public')))


app.listen(PORT, () => {
    console.log(`APP ${__dirname} RUNING ON http://localhost:${PORT}/index`);
})