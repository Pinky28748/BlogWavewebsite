const User = require('../model/User');
const bcrypt = require('bcryptjs');

function isAuthenticated(req,res,next)
{
    if(req.session.user)
    {
        return next();
    }
    res.redirect("/login");
}

exports.getRegister = async (req,res) => {
    return res.render("register");
}

exports.postRegister = async (req,res) => {
    const {firstname,lastname,email,password} = req.body;
    if(!firstname || !lastname || !email || !password)
    {
        return res.status(400).send('Details not found');
    }
    try
    {
        const existUser = await User.findOne({email});
        if(existUser)
        {
            return res.status(400).send('User already exists.Please log in');
        }
        bcrypt.hash(password, 12).then(async (hashedPassword) => {
            

            const newUser = new User({
                firstname,
                lastname,
                email,
                password: hashedPassword,
            });

            await newUser.save();
            res.redirect("/");
        });
        
        
    }
    catch(err)
    {
        console.log(err)
        res.status(500).send('An error occured while registering ')
    }
    
}

exports.getLogin = async (req,res) => {
    return res.render("login");
}

exports.postLogin = async (req,res) => {
    const {email,password} = req.body;
    try
    {
        const user = await User.findOne({email});
        
        if(!user)
        {
            return res.status(500).send('User not found');
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch)
        {
            return res.status(400).send('Invalid credentials');
        }
        req.session.user = user;
        console.log(req.session.user);
        await req.session.save();
        res.redirect("/");

    }
    catch(err)
    {
        console.log(err);
        res.status(500).send('An error occured while login');
    }
}

exports.getLogout = async (req,res) => {
    req.session.destroy((err) => {
        if(err)
            throw err;
        res.redirect("/login");
    })
}