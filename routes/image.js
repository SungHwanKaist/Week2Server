// routes/image.js

module.exports = function(app, Image)
{
    // Get ALL IMAGES
    app.get('/api/images', function(req,res) {
        Image.find(function(err, images){
            if(err) return res.status(500).send({error: 'database failure'});
            res.json(images);
        })
    });

    // GET SINGLE IMAGE
    app.get('/api/images/:FacebookID', function(req, res){
        Image.find({FacebookID: req.params.FacebookID}, function(err, image){
            if(err) return res.status(500).json({error: err});
            if(!image) return res.status(404).json({error: 'image not found'});
            res.json(image);
        })
    });

    app.post('/api/images', function(req, res) {
        var image = new Image();
        image.FacebookID = req.body.FacebookID;
        image.imageStr = req.body.imageStr;

        image.save(function(err) {
            if(err){
                console.error(err);
                res.json({result: 0});
                return;
            }
            res.json({result: 1});
        });
    });

    // UPDATE THE CONTACT (by save)
    app.put('/api/images/:FacebookID/:stage', function(req, res){
        Image.findOne({FacebookID: req.params.FacebookID, stage:req.params.stage}, function(err, image){
            if(err) return res.status(500).json({error: err});
            if(!image) return res.status(404).json({error: 'image not found'});

            // if(req.body.FacebookID) image.FacebookID = req.body.FacebookID;
            // if(req.body.stage) image.stage = req.body.stage;
            if(req.body.imageStr) image.imageStr = req.body.imageStr;

            image.save(function(err){
                if(err) res.status(500).json({error: 'failed to update'});
                res.json({message: 'image updated'});
            });
        });
    });
}
