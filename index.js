const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://modue-65:45U3UxPeN1XdVvLq@cluster0.kfc3dzw.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const connectDatabase = async () => {
    try{
        const database = client.db('foodPanda').collection('foods');

    app.get('/foods', async(req,res) => {
        const result = database.find({});
        const data = await result.toArray();
        res.send(data);
    })

    app.post('/foods', async (req,res) => {
        const food = req.body;
        const result = await database.insertOne(food);
        console.log(food);
        res.send(result);
    })

    app.delete('/foods/:id', async (req,res) => {
        const id = req.params.id;
        const result = await database.deleteOne({_id: ObjectId(id)});
        console.error(result);
        res.send(result)
    })



    }finally{

    }
};
connectDatabase().catch(error => console.log(error.message));

app.listen(5000, () => console.log('server is running'))

