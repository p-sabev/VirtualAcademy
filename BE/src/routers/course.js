const express = require('express');
const router = new express.Router;

const auth = require('./../middleware/auth');

const Course = require('./../models/course');

router.post('/courses', auth, async (req, res) => {
    const course = new Course({
        ...req.body
    });

    try {
        await course.save();
        res.status(201).send(course);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/courses', auth,  async (req, res) => {
    try {
        const courses = await Course.find({});
        res.send(courses);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/courses/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        const course = await Course.findOne( { _id });
        if (!course) {
            return res.status(404).send();
        }
        res.send(course);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/courses/addRate', auth, async (req, res) => {
    try {
        const rating = req.body.rating;
        const course = await Course.findOne( { _id: req.body.id } );
        console.log('Course' + course);
        console.log('Rating' + rating);
        console.log('req body' + JSON.stringify(req.body));
        if (!course) {
            return res.status(404).send();
        }

        course.usersRated += 1;
        course.averageRating = (course.averageRating + rating) / course.usersRated;
        await course.save();

        return res.send(course);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/courses/getByIds', auth, async (req, res) => {
    try {
        const ids = req.body.ids;
        let courses = [];

        if (ids && ids.length > 0) {
            courses = await Course.find().where('_id').in(ids).exec();
            // ids.forEach(id => {
            //     const course = await Course.findOne( { _id: id } );
            //     if (course) {
            //         courses.push(course);
            //     }
            // });
        }
        
        if (courses.length === 0) {
            return res.status(404).send();
        }

        return res.send(courses);
    } catch (error) {
        res.status(400).send(error);
    }
});

// router.patch('/tasks/:id', auth, async (req, res) => {
//     const updates = Object.keys(req.body);
//     const allowedUpdates = ['description', 'name'];
//     const isValidOperation = updates.every( update => allowedUpdates.includes(update) );

//     if (!isValidOperation) {
//         return res.status(400).send( {error: 'Invalid updates!'} );
//     }

//     try {
//         const task = await Task.findOne( { _id: req.params.id, owner: req.user._id } );

//         if (!task) {
//             return res.status(404).send();
//         }

//         updates.forEach(update => task[update] = req.body[update]);
//         await task.save();

//         return res.send(task);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });

// router.delete('/tasks/:id', auth, async (req, res) => {
//     try {
//         const task = await Task.findOneAndDelete( { _id: req.params.id, owner: req.user._id } );

//         if (!task) {
//             return res.status(404).send();
//         }

//         return res.send(task);
//     } catch (err) {
//         res.status(500).send();
//     }
// });

module.exports = router;