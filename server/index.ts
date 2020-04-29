import express from 'express';

const app = express();

// Replace code for body-parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  console.log('Hello world!');
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server listen on port: ${port} ...`);
});
