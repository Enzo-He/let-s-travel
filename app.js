let express = require('express')
let app = express();
let mongoose = require('mongoose')
let multer = require('multer');
let cookieParser = require('cookie-parser')

let postsRouter = require('./routes/posts.route');
let CallbackRequest = require('./models/callback-requests.model').CallbackRequest;
let CallbackRequestsRouter = require('./routes/callback-requests.route');
let emailsRouter = require('./routes/emails.route')
let usersRouter = require('./routes/users.route')
let Post = require('./models/post.model').Post
let auth = require('./controllers/auth')

app.set('view engine', 'ejs');

mongoose.connect('mongodb+srv://admin:1234@mycluster.2xcx6nl.mongodb.net/travels')
app.use(express.json())
let imageStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/images'),
    filename: (req, file, cb) => cb(null, file.originalname),
})

app.use(multer({ storage: imageStorage }).single('imageFile')) //标识出谁在用multer



app.use(express.static('public'));
app.use(cookieParser())
app.use('/posts', postsRouter);
app.use('/callback-requests', CallbackRequestsRouter);
app.use('/emails', emailsRouter)
app.use('/users', usersRouter)

app.get('/landmark', async (req, resp) => {
    let id = req.query.id;
    let post = await Post.findOne({id:id})
    resp.render('landmark', {
        title: post.title,
        imageURL: post.imageURL,
        date: post.date,
        text: post.text
    })
})


app.get('/admin', (req, resp) =>{
    let token = req.cookies['auth_token']
    if (token && auth.checkToken(token)) {
        resp.render('admin')
    } else{
        resp.redirect('/login')
    }
})

app.get('/login', (req, resp) => {
    let token = req.cookies['auth_token']
    if (token && auth.checkToken(token)) {
        resp.redirect('/admin')
    } else {
        resp.render('login')
    }
})


app.listen(3000, () => console.log('Listening 3000...'));
