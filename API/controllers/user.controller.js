const userService = require('../services/user.service');

exports.register = async (req, res, next) => {
    try{
        const { name, email, password } = req.body;
        if ( !name || !email || !password){
            return res.status(400).json({ message: 'Hiányzó adatok!'});
        }
        const user = await userService.registerUser(name, email, password, "user");
        res.status(201).json({success: true, message: "Sikeres regisztráció!"});
    }catch(error){
        next(error);
    }
}

exports.login = async (req, res, next) => {
    try{
        const { email, password } = req.body;
        if (!email || !password){
            return res.status(400).json({ message: 'Hiányzó adatok!'});
        }
        const user = await userService.loginUser(email, password);
        res.status(200).json(user);
    }catch(error){
        next(error);
    }
}

exports.getAllUsers = async (req, res, next) => {
    try{
        const users = await userService.getAllUsers();
        res.status(200).json({success:true, results: users});
    }catch(error){
        next(error);
    }
}

exports.getUserByID = async (req, res, next) => {
    try{
        if (!req.params.id)
        {
            return res.status(400).json({ message: 'Hiányzó azonosító!'});
        }

        const user = await userService.getUserByID(req.params.id);

        res.status(200).json({success:true, results: user});
    }catch(error){
        next(error);
    }
}

exports.getProfile = async (req, res, next) => {
    try{
        if (!req.user.id)
        {
            return res.status(400).json({ message: 'Hiányzó azonosító!'});
        }

        const user = await userService.getUserByID(req.user.id);

        res.status(200).json({success:true, results: user});
    }catch(error){
        next(error);
    }
}
exports.updateUserByID = async (req, res, next) => {
    try{
        const { name, email, password, confirm, phone, address } = req.body;

        if (!req.params.id)
        {
            return res.status(400).json({ message: 'Hiányzó azonosító!'});
        }

        if (!name, !email, !password, !confirm)
        {
            return res.status(400).json({ message: 'Hiányzó adatok!'});
        }
        
        if (password != confirm)
        {
            return res.status(400).json({ message: 'A jelszavak nem egyeznek!'});
        }

        const user = await userService.updateUserByID(req.params.id, name, email, password, phone, address);
        
        res.status(200).json({success:true, results: user});
    }catch(error){
        next(error);
    }
}

exports.deleteUserByID = async (req, res, next) => {
    try{
        if (!req.params.id)
        {
            return res.status(400).json({ message: 'Hiányzó azonosító!'});
        }
        
        const user = await userService.deleteUserByID(req.params.id);
        
        res.status(200).json({success:true, results: user});
    }catch(error){
        next(error);
    }
}