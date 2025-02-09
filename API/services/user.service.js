const { User } = require('../models/user.model');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/token');

exports.registerUser = async (name, email, password, role) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
        domain: `www.${name}.hu`
    });

    return user;
}

exports.loginUser = async (email, password) => {
    const user = await User.findOne({where: { email }});

    if (!user) throw new Error('Nem regisztrált felhasználó!');

    if (!await bcrypt.compare(password, user.password)) throw new Error('Hibás jelszó!');

    const token = generateToken({ id: user.id, name: user.name, email: user.email, role: user.role, domain: user.domain});
    
    return { token }; 
}

exports.getAllUsers = async () => {
    return await User.findAll({
        attributes: {exclude: ['password']}
    });
}

exports.getUserByID = async (id) => {
    const user = await User.findOne({where: {id}});

    if (!user) throw new Error('Felhasználó nem található!');

    return user;
}

exports.updateUserByID = async (id, name, email, address, phone, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.update({
        name,
        email,
        address,
        phone,
        password: hashedPassword
    },
    {
        where: {id}
    });
    console.log(user);
    if (user == 0) throw new Error('Felhasználó nem található!');

    return "Adatok sikeresen módosítva!";
}

exports.deleteUserByID = async (id) => {
    const user = await User.destroy({where: {id}});

    if (!user) throw new Error('Felhasználó nem található!');

    return "Felhasználó törölve!";
}