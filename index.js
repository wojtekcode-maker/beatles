import express from 'express';
import * as url from "url";
import {songs} from "./db/db.js";

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public/'))

app
    .get('/', (req, res) => {
        res.redirect('/song')
    })
    .get('/song', (req, res) => {
        const titles = songs.map(song => [song.id, song.title]);
        res.setHeader('content-type', 'text/html');
        res.render('homePage', {titles, song: null});
    })
    .get('/song/:id', (req, res) => {
        const titles = songs.map(song => [song.id, song.title]);
        const {id} = req.params;
        const [song] = songs.filter(song => {
            if(id === song.id){
                return song;
            }
        })
        res.setHeader('content-type', 'text/html');
        res.render('homePage', {titles, song: song});
    })

app.listen(3000, () => {
    console.log('App is listening on http://localhost:3000/');
})