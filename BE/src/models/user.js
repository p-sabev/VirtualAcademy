const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Task = require('./task');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        reuqired: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(val) {
            if (!validator.isEmail(val)) {
                throw new Error('Email is invalid');
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(val) {
            if (val < 0) {
                throw new Error('Age must be a positive number.');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true,
        validate(val) {
            if (val.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain the word "password"');
            }
        }
    },
    favoriteCourses: {
        type: [String]
    },
    ratings: [{
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Course'
        },
        rating: {
            type: Number,
            required: true
        }
    }],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    },
    roles: {
        type: [String],
        default: ['ViewCourses']
    }
}, {
    timestamps: true
});

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
});

userSchema.methods.toJSON = function () {
    const userObject = this.toObject();

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;

    return userObject;
}

userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign( { _id: this._id.toString() } , process.env.JWT_SECRET);

    this.tokens = this.tokens.concat( {token} );
    await this.save();
    
    return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne( {email} );

    if (!user) {
        throw new Error('Wrong email or password!');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Wrong email or password!');
    }

    return user;
};

// Hash the password
userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

// Delete all tasks for user, when user is deleted
userSchema.pre('remove', async function (next) {
    const user = this;

    await Task.deleteMany( { owner: user._id } );

    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;