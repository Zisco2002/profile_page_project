import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { dataBase } from "../utilities/connection_data.js";

export const register = async(req, res) =>{
    try{
        const {
            firstName,
            lastName,
            // address,
            email,
            password,
            // fb,
            // linkedin

        } = req.body;

        // Check if the user already exists in the database
        const userExistsQuery = `
            SELECT * FROM users
            WHERE email = $1;
        `;

        const user = await dataBase.query(userExistsQuery, [email]);

        if (user.rows.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // User doesn't exist, proceed with registration
        
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // Insert new user into the database
        const insertUserQuery = `
            INSERT INTO users (fName, lName, email, password)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;

        const values = [firstName, lastName, email, passwordHash];
        const newUserResult = await dataBase.query(insertUserQuery, values);
        


        // Respond with the newly registered user
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user });

    } catch(err) {
        res.status(500).json({error: err.message});
    }
}



//LOGIN CONTROLLER

export const login = async(req, res) =>{
    try{
        const {
            email,
            password,  

        } = req.body;

        // Check if the user already exists in the database
        const userExistsQuery = `
            SELECT * FROM users
            WHERE email = $1;
        `;

        const user = await dataBase.query(userExistsQuery, [email]);

        if (user.rows.length === 0) {
            return res.status(400).json({ error: 'User not found' });
        }

        // User exists, proceed with login

        // Verify password
        const storedPasswordHash = user.rows[0].password;
        const isPasswordValid = await bcrypt.compare(password, storedPasswordHash);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Password is valid, respond with user data
        // res.json(user.rows[0]);
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user });
    } catch(err) {
        res.status(500).json({error: err.message});
    }
}
