

exports.user = (odm) => {

    const userSchema = new odm.Schema({
        email : String,
        password : String
    });

    return odm.model('User', userSchema);
};