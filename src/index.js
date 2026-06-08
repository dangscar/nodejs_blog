const path = require('path')
const express = require('express')
const morgan = require('morgan')
const { engine } = require('express-handlebars')

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'public')))

// HTTP Logger
app.use(morgan('combined'))

// Template Engine
app.engine('hbs', engine({
    extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources\\views'))

console.log('Path: ' +path.join(__dirname, 'public\\img'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/news', (req, res) => {
    res.render('news')
})

app.use(express.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors());

app.use(
    "/word",
    require("./routes/word.route")
);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})