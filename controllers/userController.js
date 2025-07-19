import express from 'express'
import User from '../models/User.js'; 
import bcrypt from 'bcryptjs';
import generateToken from '../utils/genratetokem.js';


export const signup = async(req, res) => {
    
    const {name ,email, password,role} = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please fill all the fields' });
    }

    const hashedpass= bcrypt.hashSync(password, 10);
    
    try {
        const exest= await User.findOne({ email });
        if (exest) {
            return res.status(400).json({ message: 'User already exists' });
        }
        
        const user = await User.create({ name, email, password:hashedpass, role });
        
        const token = generateToken(user._id);

        console.log('User created successfully:', {user, token}); 
        return res.status(201).json({ message: 'User created successfully', user });
        
    } catch (error) {
        console.error('Error during signup:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const signin = async(req, res) => {
    const { email, password } = req.body;
    console.log('Signin request received:', { email, password });

    if (!email || !password) {
        return res.status(400).json({ message: 'Please fill all the fields' });
    }


    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user._id);

        console.log('User signed in successfully:',{ user,token});
        return res.status(200).json({ message: 'User signed in successfully', user , token });
        
    } catch (error) {
        console.error('Error during signin:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
 
}

export const getMe = (req, res) => {
    console.log('GetMe request received for user:', req.user._id);
    res.status(200).json({
        success: true,
        data: req.user,
    });
};