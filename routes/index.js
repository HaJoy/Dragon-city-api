
const fieldValidation = (req) => {
    let result;
    if (!req.body.name || !req.body.element || !req.body.attacks || !req.body.imageURL) {
        result = false;
    } else {
        result = true;
    };
    return result;
};

exports.index = (app, models, gate, jwt, path) => {


    app.get('/', async (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
    })

    // This route may change due to the possibility of front-end implementation
    app.get('/dragons', async (req, res) => {
        const dragons = await models.dragon.find().sort({ _id: +1 });
        res.json(dragons);
    });
    
    app.post('/dragons/create', async (req, res) => {

        if (!fieldValidation(req)) {
            return res.json({message: '"name", "element", "attacks" and "imageURL" fields are required'});
        };

        let dragon = req.body;
        let newDragon = await models.dragon.create(dragon);
        res.json(newDragon);
    });

    app.put('/dragons/:id', async (req, res) => {
        let dragonFound = await models.dragon.findById(req.params.id);
        if (!fieldValidation(req)) {
            return res.json({message: '"name", "element", "attacks" and "imageURL" fields are required'});
        };
        dragonFound.name = req.body.name;
        dragonFound.element = req.body.element;
        dragonFound.attacks = req.body.attacks;
        dragonFound.imageURL = req.body.imageURL;

        const dragonUpdate = await dragonFound.save();
        res.json(dragonUpdate);
    })

    app.delete('/dragons/delete', async (req, res) => {

        if (!req.body.name) return res.json({message: '"name" field is required'});

        const { name } = req.body;

        const result = await models.dragon.deleteOne({ name: name });

        if (result.deletedCount === 0) {
            return res.json({ message: 'Dragon not found' });
        }

        res.json({ message: 'Dragon deletion successful' });
    })
};