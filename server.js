const express = require("express");
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
require('dotenv').config();

require("./server/config/PostGresConnection.config")
const client = require('./server/config/PostGresConnection.config')

client.query('SELECT * FROM USERS', (err, res) =>{
    if(err){ throw err };
    console.log("You're Connected")
})

app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(cookieParser())
app.use(cors({credentials: true, origin: 'http://localhost:4200'})) //Change to client's http address
app.use(express.json(), express.urlencoded({ extended: true }));

// Importing routes to be used in app
const UserRoutes = require("./server/routes/user.route");
UserRoutes(app);
// const RatingRoutes = require("./server/routes/rating.routes")
// RatingRoutes(app)
// const CommentRoutes = require("./server/routes/comment.routes")
// CommentRoutes(app)
// const GifRoutes = require("./server/routes/gif.routes")
// GifRoutes(app)

app.listen(8000, () => console.log("The server is all fired up on port 8000"));