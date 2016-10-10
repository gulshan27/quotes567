const express = require('express');
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');

var db;

MongoClient.connect('mongodb://me:yvgkqp@ds053196.mlab.com:53196/myfirstmdb', (err,database) => {
	if(err) return console.log(err)
	db = database;
	app.listen(3000, () => {
		console.log('Hi, I am MONGO and currently listening on 3000')
	})
})

app.post('/quotes', (req, res) => {
	db.collection('quotes').save(req.body, (err, result) => {
		if(err) return console.log(err)

		console.log('phew.. done saving.')
		res.redirect('/')
	})
})

app.get('/', (req, res) => {
	db.collection('quotes').find().toArray((err, result) => {
	if(err) return console.log(err)
		//render
	res.render('index.ejs',{quotes: result})
	//console.log(result)
})
})

