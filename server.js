	const express = require('express');
	const MongoClient = require('mongodb').MongoClient
	const bodyParser = require('body-parser');
	const app = express();

	app.use(bodyParser.urlencoded({extended:true}));
	app.use(express.static('public'));
	app.use(bodyParser.json());
	app.set('view engine', 'ejs');

	var db;
	MongoClient.connect('mongodb://me:yvgkqp@ds053196.mlab.com:53196/myfirstmdb', (err,database) => {
		if(err) return console.log(err)
		db = database;
		app.listen(process.env.PORT || 3000, () => {
			console.log('Hi, I am MONGO and currently listening on 3000')
		})
	})
	
	app.get('/', (req, res) => {
		db.collection('quotes').find().toArray((err, result) => {
			if(err) return console.log(err)
			res.render('index.ejs',{quotes: result})
		})
	})

	app.post('/quotes', (req, res) => {
		db.collection('quotes').save(req.body, (err, result) => {
			if(err) return console.log(err)

			console.log('phew.. done saving.')
			res.redirect('/')
		})
	})
	
	app.put('/quotes', (req, res) => {
		db.collection('quotes')
			.findOneAndUpdate({name: 'Ankur'}, {
	 			$set: 
	    			{
	      				name: req.body.name,
	      				quote: req.body.quote
	    			}
		  	}, 
		  		{
		    			sort: {_id: -1},
		  		}, 
					  
				(err, result) => {
		    		if (err) return res.send(err)
		    		res.send(result)			
		  	})
		  })

		  	app.delete('/quotes', (req, res) => {
		  	  db.collection('quotes').findOneAndDelete({},{
		    sort: {_id: -1},
		    //upsert: true
		  	},(err, result) => {
		  	      if (err) return res.send(500, err)
		  	      res.send('A quote got deleted')
		  	    })
		  	})

