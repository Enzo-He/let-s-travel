let mongoose = require ('mongoose')
let Schema = mongoose.Schema

let postSchema = new Schema({
    /* 限制？ */
    id: String,
    title: String,
    date: Date,
    description: String,
    text: String,
    country: String,
    imageURL: String,
})

let Post = mongoose.model('Post', postSchema)

module.exports = {  Post  }