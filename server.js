const express = require('express')
const app = express();
const port = 3000;

const groups = [
    'ANdRI',
    'LOGal',
    'eLPOI',
    'ecTUS',
    'nTMat',
    'quIXf',
];

var fs = require('fs');

const fps = null;

const answer = {
    age: "23-27",
    gender: "m",
    city: ">500",
    hapiness: 3,
    x: 1,
    group: 'ANdRI',
    fps,
    timestamp: Date.now(),
};

const appendAnswer = (answer)=>{
    const file = `${__dirname}/results/${answer.group}.json`;
    console.log(file);
    fs.readFile(file, (err, data) => {
        if (err) {
            console.log('read error')
        };
        let json = JSON.parse(data);
        json.push(answer);

        fs.writeFile(file, JSON.stringify(json), (err, result) => {console.log({err, result})})
    });
};

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Psy test mini server says: Hi.')
});

app.post('/', (req, res) => {
    const {body} = req;
    console.log(body);

    if (groups.includes(body.group)) {
      res.json({status: "ok"});
      appendAnswer(answer);
    } else {
      res.json({status: "group mismatch check url"});
    }


});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));





