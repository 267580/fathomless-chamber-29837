const express = require('express');
const hbs = require('hbs');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static(__dirname + '/public'));
var Record = require('./Record');

////////////////////////////////////////////////////////////////////

var RenderStart = function(res){
		res.render('./form2.hbs');
	}

//~ np. GET ->  http://http://localhost:3000/records/form
router.get('/form',function(req,res){
			RenderStart(res);
		})

////////////////////////////////////////////////////////////////////

router.post('/', function (req, res) {
    console.log("POST /");
    Record.create(req.body, 
        function (err, record) {
            if (err) return res.status(404).send("Błąd: " + err);
            res.status(200).send(record);
        });
});

////////////////////////////////////////////////////////////////////

//~ np. GET ->  http://localhost:3000/records/
router.get('/', function (req, res) {
    console.log("GET /");
    Record.findOne({}, function (err, records) {
        if (err) return res.status(404).send("There was a problem finding the records.");
        res.status(200).send(records);
    });

});

////////////////////////////////////////////////////////////////////

//~ np. GET ->  http://localhost:3000/records/param/5a50a049d78b6611a820a9f7
router.get('/param/:id', function (req, res) {
	console.log("GET /param/:id");
    Record.findById(req.params.id, function (err, record) {
        if (err) return res.status(404).send("You gave an incorrect ID.");
        if (!record) return res.status(404).send("No record found.");
        res.status(200).send(record);
    });
});

////////////////////////////////////////////////////////////////////

//~ np. GET ->
//~ http://http://localhost:3000/records/param/?nazwaGłówna=alamakota3
//~ http://http://localhost:3000/records/param/?nazwaGłówna=alamakota3&rodzajObiektu=szałas
router.get('/param', function (req, res) {
	console.log("GET /param/?");
    Record.find(req.query, function (err, record) {
        if (err) return res.status(404).send("There was a problem finding the recordDDDD.\n"+err);
        if (!record || Object.keys(record).length ===0)
			return res.status(404).send("No record found.");
        res.status(200).send(record);
    });
});

////////////////////////////////////////////////////////////////////

//~ np. DELETE ->  http://localhost:3000/records/5a574bb41a8c4d1629edde77
router.delete('/param/:id', function (req, res) {
	console.log("DELETE /param/:id");
    Record.remove({_id:req.params.id}, function (err, record) {
        if (err) return res.status(404).send("There was a problem finding the record ID to remove.");
        if (!record) return res.status(404).send("No record found to remove.");
        res.status(200).send("Successfully deleted.");
    });
});

////////////////////////////////////////////////////////////////////

//~ np. PATCH ->  http://localhost:3000/records/5a574bb41a8c4d1629edde77
router.patch('/param/:id', function (req, res) {
	console.log("PATCH /param/:id");
	let obj = req.body;
	obj.dataModyfikacji = new Date;
    Record.findByIdAndUpdate(req.params.id,obj, function (err, record) {
        if (err) return res.status(404).send("There was a problem finding the record ID to remove.");
        if (!record) return res.status(404).send("No record found to remove.");
        res.status(200).send("Successfully updated.");
    });
});


module.exports = router;
