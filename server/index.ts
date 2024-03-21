import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import fs from 'fs';
import multer from 'multer';

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, '../client/public')
    },
    filename: (req: any, file: any, cb: any) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const upload = multer({ storage: storage }).single('file');
let filePath: any;


const apiKey: any | undefined = process.env.OPENAI_API_KEY;
if (!apiKey) {
    throw new Error('OpenAI API key is not provided.');
}

const openai = new OpenAI(apiKey);

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
          res.send(response.data);
    } catch (error) {
        console.error(error);
    }
});

app.post('/upload', async (req, res) => {
    upload(req, res, (err: any) => {
        if (err instanceof multer.MulterError) {
            console.error('Multer error:', err);
            return res.status(500).json({ error: 'Multer error', message: err.message });
        } else if (err) {
            console.error('Internal server error:', err);
            return res.status(500).json({ error: 'Internal server error', message: err.message });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        filePath = req.file.path;

        res.status(200).json({ message: 'File uploaded successfully', file: req.file });
    });
});

app.post('/variations', async (req, res) => {
    try {
        const response: any = await openai.images.createVariation({
            image: fs.createReadStream(filePath) as any,
        });
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
});


app.post('/surprise-me', async (req: any, res: any) => {

    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: 'Make a random DALL-E prompt for me to use.'
                }
            ],
            max_tokens: 100
        })
    }

    try {
        const response = await fetch('\n' + 'https://api.openai.com/v1/chat/completions', options);
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.error(error);
    }
});



const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
