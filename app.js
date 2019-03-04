const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const _ = require('lodash');
/////
const homeStartingContent = "Make a NEW POST";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const posts = [];
/////

app.set('view engine', 'ejs');
app.use(express.static(`public/`));
app.use(bodyParser.urlencoded({extended: true}));

/////

app.get('/', (req, res) => {
    res.render("home", {
        homeStartingContent: homeStartingContent,
        posts: posts
    });
});

app.get('/about', (req, res) => {
    res.render("about", {
        aboutContent: aboutContent
    });
});

app.get('/contact', (req, res) => {
    res.render("contact", {
        contactContent: contactContent
    });
});

app.get('/compose', (req, res) => {
    res.render("compose");
});

app.get('/post/:title', (req, res) => {
    const postTitle = _.lowerCase(req.params.title);
    posts.forEach(e => {
        const storedTitle = _.lowerCase(e.title);
        if(storedTitle === postTitle){
            res.render("post", { title : e.title, body : e.body}); 
        }
    });
});

app.post('/compose', (req, res) => {
    var article = {
        title: req.body.title,
        body: req.body.body
    }
    posts.push(article);
    res.redirect("/");
});



app.listen(port, () => console.log(`app listening on port ${port}!`));