

exports.dragon = (odm) => {

    const dragonSchema = new odm.Schema({
        name : String,
        element : Array,
        attacks : Object
    });

    return odm.model('Dragon', dragonSchema);
};