import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();


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

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
