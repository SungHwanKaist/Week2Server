module.exports = function(app, Pic, Contact)
{
    app.get('/api/contacts', function(req, res){
        Contact.find(function(err, list){
            if(err){
                console.log(err);
                return res.status(500).json({error: 'database failure'});
            }
            if(!list){
                console.log(err);
                return res.status(500).json({error: 'cannot query'});
            }
            //onsole.log(list);
            res.json(list);
        });
    });
    app.get('/api/contacts/:name', function(req, res){
        Contact.find({"name": req.params.name}, function(err, contact){
            if(err){
                console.log(err);
                return res.status(500).json({error: 'database failure'});
            }
            if(!contact){
                console.log(err);
                return res.status(404).json({error: 'no contact'});
            }
            res.json(contact);
        });
    });

    app.post('/api/contacts', function(req, res){

        //var contact = new Contact();
        
        //contact.name = req.body.name;
        //contact.phoneNumber = req.body.phoneNumber;
    
        Contact.insertMany(req.body, function(err){
            if(err){
                console.error(err);
                res.json({result: 0});
                return;
            }
            
            res.json({result: 1});
        });

    });

    app.get('/api/pics', function(req, res){
        Pic.find({}, {"_id": true, "thumbnail": true}, function(err, list){
            if(err){
                console.log(err);
                return res.status(500).json({error: 'database failure'});
            }
            if(!list){
                return res.status(500).json({error: 'cannot query'});
            }
            //console.log(list);
            res.json(list);

        });
    });
    app.get('/api/pics/:id', function(req, res){
        Pic.findOne({_id: req.params.id}, function(err, pic){
            if(err){
		    console.log(err);
                return res.status(500).json({error: 'database failure'});
            }
            if(!pic){
                return res.status(404).json({error: 'no such picture'});
            }
            //console.log(pic);
            // var filePath = pic.path;
            // var options = {
            //     root: __dirname + "/../"
            // }
            // res.sendFile(filePath, options, function(err){
            //     if(err){
            //         console.log(err);
            //         res.status(500).json({error: 'failure while sending the file'});
            //     }
            // });
            res.json({"image":pic.image});
        });
    });

    app.post('/api/pics', function(req, res){
        // if(!req.files){
        //     return res.status(400).send('no file uploaded');
        // }
        var pic = new Pic();
        //console.log(req.files);
        //pic.path = req.files.pic.file;
        //pic.name = req.files.pic.filename;
        pic.image = req.body.image
        pic.thumbnail = req.body.thumbnail
        pic.save(function(err){
            if(err){
                console.error(err);
                return res.json({result: 0});
                
            }
            
            res.json({result: pic});
        });

    });

    app.delete('/api/pics/:id', function(req, res){
        Pic.remove({"_id": req.params.id}, function(err){
            if(err){
                console.log(err);
                res.status(500).json({error: 'failure while deleting entry'});
            }
            res.json({result: 1});
        });
    });

    
}
