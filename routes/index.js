

exports.index = (app, models, gate, jwt) => {
    
    app.post('/dragons', async (req, res) => {
        let dragon = req.body;
        let newDragon = await models.dragon.create(dragon);
        res.json(newDragon);
    });
};