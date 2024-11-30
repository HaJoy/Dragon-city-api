
const fieldValidation = (req) => {
    let result;
    if (!req.body.name || !req.body.element || !req.body.attacks || !req.body.imageURL) {
        result = false;
    } else {
        result = true;
    };
    return result;
};

const userFieldValidation = (req) => {
    let result;
    if (!req.body.email || !req.body.password) {
        result = false;
    } else {
        result = true;
    };
    return result;
};

exports.index = (app, models, gate, auth, jwt, path, validator, bcrypt) => {

    // rutas usuarios --------------------------------------------------------------------
    app.get('/user', async (req, res) => {
        const users = await models.user.find().sort({ _id: +1 });
        res.json(users);
    });

    app.get('/user/:id', async (req, res) => {
        let userFound = await models.user.findById(req.params.id);
        res.json(userFound);
    });

    app.post('/user/register', async (req, res) => {
        
        const { email, password } = req.body;

        if (!userFieldValidation(req)) { // verificar campos
            return res.status(400).json({error: '"email" and "password" fields are required.'});
        }
        if (!validator.isEmail(email)) { // verificar estructura del email
            return res.status(400).json({error: 'email does not have a valid structure.'});
        }
        if (password.length < 5) { // verificar longitud de contraseña
            return res.status(400).json({error: 'password must have at least 5 characters.'});
        }

        // hashear contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // guardar usuario
        let user = {
            email,
            password: hashedPassword
        };
        let newUser = await models.user.create(user);
        res.json(newUser);
    });

    app.post('/user/login', async (req, res) => {
        
        const { email, password } = req.body;

        // busqueda de usuario por email
        const user = await models.user.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'user not found.' });
        }

        // validar contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'wrong password' });
        }

        // inicio de sesión correcto, generar token jwt
        const token = await gate({ useremail: email}, jwt);

        res.json({email, password, token});
    });

    app.put('/user/update/:id', auth, async (req, res) => {
        let userFound = await models.user.findById(req.params.id);
        if (!userFieldValidation(req)) {
            return res.status(400).json({error: '"email" and "password" fields are required'});
        };
        userFound.email = req.body.email;
        userFound.password = req.body.password;

        const userUpdate = await userFound.save();
        res.json(userUpdate);
    });

    app.delete('/user/delete', auth, async (req, res) => {

        if (!req.body.email) return res.status(400).json({error: '"email" field is required'});

        const { email } = req.body;

        const result = await models.user.deleteOne({ email: email });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User deletion successful' });
    });


    // rutas dragones ---------------------------------------------------------------------
    app.get('/', async (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
    })

    app.get('/dragons', async (req, res) => {
        const dragons = await models.dragon.find().sort({ _id: +1 });
        res.json(dragons);
    });

    app.get('/dragons/:id', async (req, res) => {
        let dragonFound = await models.dragon.findById(req.params.id);
        res.json(dragonFound);
    });
    
    app.post('/dragons/create', auth, async (req, res) => {

        if (!fieldValidation(req)) {
            return res.status(400).json({error: '"name", "element", "attacks" and "imageURL" fields are required'});
        };

        let dragon = req.body;
        let newDragon = await models.dragon.create(dragon);
        res.json(newDragon);
    });

    app.put('/dragons/update/:id', auth, async (req, res) => {
        let dragonFound = await models.dragon.findById(req.params.id);
        if (!fieldValidation(req)) {
            return res.status(400).json({error: '"name", "element", "attacks" and "imageURL" fields are required'});
        };
        dragonFound.name = req.body.name;
        dragonFound.element = req.body.element;
        dragonFound.attacks = req.body.attacks;
        dragonFound.imageURL = req.body.imageURL;

        const dragonUpdate = await dragonFound.save();
        res.json(dragonUpdate);
    });

    app.delete('/dragons/delete', auth, async (req, res) => {

        if (!req.body.name) return res.status(400).json({error: '"name" field is required'});

        const { name } = req.body;

        const result = await models.dragon.deleteOne({ name: name });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Dragon not found' });
        }

        res.json({ message: 'Dragon deletion successful' });
    });
};