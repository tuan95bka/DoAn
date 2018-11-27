
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/mydata', { useNewUrlParser: true });
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    role: String,
})

let user = mongoose.model('user', userSchema);

// add new account from sign up
module.exports.add = (object) => {
    return new Promise((resolve, reject) => {
        user.create(object, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    })
};

//authentication account user
module.exports.authentication = (username, password) => {
    return new Promise((resolve, reject) => {
        user.find({ username: username, password: password }, (err, result) => {
            if (result.length == 1) resolve(result[0]);
            else reject(err);
        })
    })
}

// get id by username
module.exports.getIdByUser = (username) => {
    return new Promise((resolve, reject) => {
        //resolve("haha");
        user.find({ username: username }, (err, result) => {
            if (err) reject(err);
            else resolve(result[0].id);
        })
    })
}

// get total User
module.exports.getTotalRecord = () => {
    return new Promise((resolve, reject) => {
        user.countDocuments((err, result) => {
            if (err) reject(err);
            else resolve(result);
        })
    })
}
// get all user by page number
module.exports.getAllUser = (page) => {
    return new Promise((resolve, reject) => {
        const pagesize = 10;
        user.find().skip(pagesize * (page - 1)).limit(pagesize).exec((err, users) => {
            if (err) reject(err);
            else resolve(users);
        });
    })
};
// find user by id
module.exports.findByID = (id) => {
    return new Promise((resolve, reject) => {
        user.findById(id, (err, user) => {
            if (err) reject(err);
            else resolve(user);
        });
    })
}
// Update record by ID
module.exports.update = (id, object) => {
    return new Promise((resolve, reject) => {
        user.updateOne({ _id: id }, object, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        })
    })
}
//Delete record by ID
module.exports.delete = (id) => {
    return new Promise((resolve, reject) => {
        user.deleteOne({ _id: id }, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        })
    })
}
//Check exist user
module.exports.checkExistUser = (user_name) => {
    return new Promise((resolve, reject) => {
        user.find({ username: user_name }, (err, result) => {
            if (err) reject(err);
            else {
                if (result.length > 0) resolve(true);
                else resolve(false);
            }
        })
    })
}