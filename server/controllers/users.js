import express from "express"
import { dataBase } from "../utilities/connection_data.js";


//Edit user
export const editUser = async (req, res) => {
    const { id } = req.params;
    console.log(req.body)
    console.log("what reached controller from edit")
    const {firstName,lastName,address,email,fb,linkedin} = req.body;
    try {
      const user = await dataBase.query('UPDATE users SET fname = $1, lname = $2, address=$3, email=$4, fb=$5, linkedin=$6 WHERE id = $7 returning *',
      [firstName,lastName,address,email,fb,linkedin,id]);
      res.json(user.rows[0]);
      console.log("User has been updated successfully")
    } catch (err) {
      console.error(err.message);
      console.log('nonono');
      res.status(500).send('Server Error');
    }
  }


  //Get user by ID
export const getUserByID = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await dataBase.query('SELECT * FROM users WHERE id = $1', [id]);
      res.json(user.rows[0]);
    } catch (err) {
      res.status(500).send('Server Error');
    }
  }




