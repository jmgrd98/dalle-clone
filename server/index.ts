import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';

const openai = new OpenAI();

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = "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";

app.get('/', (req, res) => {
    res.send('Hello, World!');
});


app.post('/images', async (req, res) => {
    const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: "a white siamese cat",
        n: 1,
        size: "1024x1024",
      });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
