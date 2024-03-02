import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import fs from 'fs';
import multer from 'multer';

dotenv.config();

const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, 'public')
    },
    filename: (req: any, file: any, cb: any) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})
const upload = multer({ storage: storage }).single('file');


const apiKey: any | undefined = process.env.OPENAI_API_KEY;
if (!apiKey) {
    throw new Error('OpenAI API key is not provided.');
}

const openai = new OpenAI(apiKey);


const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});


app.post('/images', async (req, res) => {
    try {
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: req.body.message,
            n: 1,
            size: "1024x1024",
          });
          console.log(response)
          res.send(response.data);
    } catch (error) {
        console.error(error);
    }
});

app.post('/upload', async (req, res) => {
    upload(req, res, (err: any) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({ error: 'Multer error', message: err.message });
        } else if (err) {
            return res.status(500).json({ error: 'Internal serve r error', message: err.message });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        console.log('File uploaded:', req.file);
        res.status(200).json({ message: 'File uploaded successfully', file: req.file });
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
