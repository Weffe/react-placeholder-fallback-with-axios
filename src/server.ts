import Express from 'express';
import cors from 'cors';

const server = Express();

server.use(cors());

async function performLongTask() {
    return new Promise(resolve => {
        setTimeout(resolve, 5000)
    })
}

async function performShortTask() {
    return new Promise(resolve => {
        setTimeout(resolve, 2000)
    })
}

server.get('/longtask', async (_, res) => {
    await performLongTask();
    res.send('Hello, from Hapi web server -- long task done!');
})

server.get('/shorttask', async (_, res) => {
    await performShortTask();
    res.send('Hello, from Hapi web server -- short task done!');
});

server.listen(4000, '0.0.0.0', () => {
    console.log("Started Express server on port 4000.")
})
