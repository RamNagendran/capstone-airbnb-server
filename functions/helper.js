import bcrypt from 'bcrypt';

const passwordHasing = (password) => {
    const saltRounds = 5;
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                reject(err);
            } else {
                resolve(hash);
            }
        });
    })
}

export {passwordHasing}