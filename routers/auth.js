require('dotenv').config()
const express = require('express');
const app=express();
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// User registration
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        // const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.redirect("/");
    } catch (error) {
        console.log("Already EXist");
        res.render("./auth/signup",{message:"Username Already Exist!"});
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.render("./auth/login",{message:"Invalid Username or Password"});
        }
        const passwordMatch = bcrypt.compareSync(password, user.password);
        // const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.render("./auth/login",{message:"Invalid Username or Password"});
        }
        const token = jwt.sign({ userId: user.username },process.env.JWT_SECRET, {expiresIn: '1h'});
        res.cookie("token",token);
        res.status(200);
        res.redirect("/entry");
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});
router.get('/logout', async (req, res) => {
    try {
        res.clearCookie("token");
        res.redirect('/');
    }catch (error) {
        res.status(500).json({ error: 'Logout failed' });
    }
});

module.exports = router;