// routes/index.js

module.exports = function(app, Contact)
{
    // Get ALL CONTACTS
    app.get('/api/contacts', function(req,res){
        Contact.find(function(err, contacts){
            if(err) return res.status(500).send({error: 'database failure'});
            res.json(contacts);
        })
    });
    // GET SINGLE CONTACT
    app.get('/api/contacts/:FacebookID', function(req, res){
        Contact.findOne({FacebookID: req.params.FacebookID}, function(err, contact){
            if(err) return res.status(500).json({error: err});
            if(!contact) return res.status(404).json({'first': true});

            console.log("Get all contact! " + contacts.toString());
            res.json(contact);
        })
    });

    // app.get('/api/contacts/:contact_id', function(req, res){
    //     Contact.findOne({_id: req.params.contact_id}, {_id: 0, name: 1, phoneNumber: 1, images: 1}, function(err, images){
    //         if(err) return res.status(500).json({error: err});
    //         if(images.length === 0) return res.status(404).json({error: 'images not found'});
    //         res.json(images);
    //     })
    // });

    // GET IMAGES BY PHONENUMBER
    // app.get('/api/contacts/phoneNumber/:phoneNumber/:images', function(req, res){
    //     Contact.find({phoneNumber: req.params.phoneNumber, images: req.params.images}, {_id: 0, name: 0, phoneNumber: 0, images: 1}, function(err, images){
    //         if(err) return res.status(500).json({error: err});
    //         if(images.length === 0) return res.status(404).json({error: 'images not found'});
    //         res.json(images);
    //     })
    // });

    // CREATE CONTACT
    app.post('/api/contacts', function(req, res){
        var contact = new Contact();
        contact.FacebookID = req.body.FacebookID;
        contact.name = req.body.name;
        contact.phoneNumber = req.body.phoneNumber;
        contact.stage = req.body.stage;
        contact.save(function(err){
            if(err){
                console.error(err);
                res.json({result: 0});
                return;
            }
            console.log("Create new contact! name: " + contact.name + ", number : "+ contact.phoneNumber);
            res.json({result: 1});
        });
    });

    // UPDATE THE CONTACT (by save)
    app.put('/api/contacts/:FacebookID', function(req, res){
        Contact.findOne({FacebookID: req.params.FacebookID}, function(err, contact){
            if(err) return res.status(500).json({error: err});
            if(!contact) return res.status(404).json({error: 'contact not found'});

            if(req.body.FacebookID) contact.FacebookID = req.body.FacebookID;
            if(req.body.phoneNumber) contact.phoneNumber = req.body.phoneNumber;
            if(req.body.name) contact.name = req.body.name;
            if(req.body.stage) contact.stage = req.body.stage;
            
            contact.save(function(err){
                if(err) res.status(500).json({error: 'failed to update'});
                res.json({message: 'contact updated'});
            });
        });
    });

    // // UPDATE THE CONTACT by update (no document 조회)
    // app.put('/api/contacts/:contact_id', function(req, res){
    //     Contact.update({ _id: req.params.contact_id }, { $set: req.body }, function(err, output){
    //         if(err) res.status(500).json({ error: 'database failure' });
    //         console.log(output);
    //         if(!output.n) return res.status(404).json({ error: 'contact not found' });
    //         res.json( { message: 'contact updated' } );
    //     })
    // });

    // DELETE CONTACT
    app.delete('/api/contacts/:FacebookID', function(req, res){
        Contact.remove({ FacebookID: req.params.FacebookID }, function(err, output){
            if(err) return res.status(500).json({ error: "database failure" });

            /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
            if(!output.result.n) return res.status(404).json({ error: "contact not found" });
            res.json({ message: "contact deleted" });
            */

            res.status(204).end();
        })
    });

}

