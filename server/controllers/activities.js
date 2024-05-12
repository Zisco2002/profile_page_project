import { dataBase } from "../utilities/connection_data.js";

export const getActivityByID = async (req, res) => {
    const { userId } = req.params;
    try {
      const activity = await dataBase.query('SELECT * FROM activities where activities.uid=$1 ;', [userId]);
      res.json(activity.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }}