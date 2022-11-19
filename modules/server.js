require('dotenv').config();
const cors = require('cors');
const express = require('express');
const ProductModel = require('../src/database/models/product.model');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/products', async (req, res) => {
    try {
        const users = await ProductModel.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send('Não foi possível listar os produtos!');
    }
});

app.get('/products/:id', async (req, res) => {
    const id = req.params.id;
    const product = await ProductModel.findById(id, '-password');
    if (product) {
        return res.status(200).json(product);
    }
    res.status(404).send('Produto não encontrado!');
});

app.post('/register', async (req, res) => {

    const { name, price, description, type } = req.body;
    const product = new ProductModel({
        name,
        price,
        description,
        type,
        image: 'https://isobarscience.com/wp-content/uploads/2020/09/default-profile-picture1.jpg',
        reviews: [],
        soldoff: false
    });
    try {
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

app.patch('/products/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const product = await ProductModel.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

const port = process.env.PORT;

app.listen(port, () => console.log(`Listening on port ${port}`));
