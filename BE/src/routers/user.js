const express = require('express');
const router = new express.Router;

const multer = require('multer');
const sharp = require('sharp');
const auth = require('./../middleware/auth');

const { sendWelcomeEmail, sendGoodbyeEmail } = require('./../emails/account');

const User = require('./../models/user');

router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();

        sendWelcomeEmail(user.email, user.name);
        
        res.status(201).send({user, token});
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/users', auth, async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
});

router.get('/users/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (err) {
        res.status(500).send();
    }
});

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'surname', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send( {error: 'Invalid updates!'} );
    }

    try {
        const user = req.user;
        updates.forEach(update => user[update] = req.body[update]);
        await user.save();

        if (!user) {
            return res.status(404).send();
        }

        return res.send(user);
    } catch (err) {
        return res.status(400).send();
    }
});

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        sendGoodbyeEmail(req.user.email, req.user.name);
        return res.send(req.user);
    } catch (err) {
        res.status(500).send();
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user, token});
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter( token => {
            return token.token !== req.token;
        });

        await req.user.save();

        res.send();
    } catch (err) {
        res.status(500).send();
    }
});

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();

        res.send();
    } catch (err) {
        res.status(500).send();
    }
});

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            cb(new Error('File must be an image!'));
        }

        cb(undefined, true);
    }
});
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
});

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = null;
    await req.user.save();
    res.send();
});

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user || !user.avatar) {
            throw new Error();
        }

        res.set('Content-Type', 'image/png');
        res.send(user.avatar);
    } catch (err) {
        res.status(404).send();
    }
});

router.post('/users/grantPermission', async (req, res) => {
    const simplePermissions = ['ViewCourses'];
    const adminPermissions = ['EditCourses', 'ViewUsers', 'EditUsers'];

    try {
        const user = await User.findById(req.body.id);
        let permissions;
        if (user) {
            if (req.body.admin) {
                permissions = [...simplePermissions, ...adminPermissions];
            } else {
                permissions = simplePermissions;
            }
        } else {
            return res.status(404).send();
        }
        user.roles = permissions;
        await user.save();
        res.status(200).send({user});
    } catch (err) {
        res.status(400).send(err);
    }
});

router.delete('/users/:id', auth, async (req, res) => {
    try {
        const user = await User.findOneAndDelete( { _id: req.params.id } );

        if (!user) {
            return res.status(404).send();
        }

        return res.send(user);
    } catch (err) {
        res.status(500).send();
    }
});

router.get('/users/saveCourseToFavorite/:id', auth, async (req, res) => {
    try {
        req.user.favoriteCourses.push(req.params.id);
        await req.user.save();
        return res.status(200).send();
    } catch (err) {
        res.status(500).send();
    }
});

router.post('/users/edit', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'surname', 'age'];
    const isValidOperation = updates.every( update => allowedUpdates.includes(update) );

    if (!isValidOperation) {
        return res.status(400).send( {error: 'Invalid updates!'} );
    }

    try {
        const user = await User.findOne( { _id: req.user._id } );

        if (!user) {
            return res.status(404).send();
        }

        updates.forEach(update => user[update] = req.body[update]);
        await user.save();

        return res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;