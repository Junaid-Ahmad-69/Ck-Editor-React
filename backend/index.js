const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
mongoose.connect('mongodb://localhost:27017/');

const UserSchema = new mongoose.Schema({
    data: String,
});
const user = mongoose.model('users', UserSchema);
user.createIndexes();


app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())
app.use(express.json());


app.post('/request', async (req, res) => {
    try {
        const newData = new user(req.body);
        await newData.save();

        res.status(201).json({message: 'Data saved successfully'});
    } catch (error) {
        res.status(500).json({error: 'Error saving data to MongoDB'});
    }
});
app.get('/edit', async (req, res) => {
    try {
        const newData = await user.find();
        res.status(201).json({
           data: newData,
            message: "succefull"
        });
    } catch (error) {
        res.status(500).json({error: 'Error saving data to MongoDB'});
    }
});
app.listen(5000);
