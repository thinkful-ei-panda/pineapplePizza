const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});

app.get('/burgers', (req, res) => {
  res.send('We have juicy cheese burgers!');
});

app.get('/pizza/pepperoni', (req, res) => {
  res.send('Boring!');
});

app.get('/pizza/pineapple', (req, res) => {
  res.send("You're living on the edge!");
});

app.get('/echo', (req, res) => {
  const responseText = `Here are some details of your request:
    Base URL: ${req.baseURL}
    Host: ${req.hostname}
    Path: ${req.path}
    Cookies: ${req.signedCookies}
    `;
  res.send(responseText);
});

app.get('/queryViewer', (req, res) => {
  console.log(req.query);
  res.send(req.query); //do not send any data back to the client
});

app.get('/greetings', (req, res) => {
  //1. get values from the request
  const name = req.query.name;
  const race = req.query.race;

  //2. validate the values
  if (!name) {
    //3. name was not provided
    return res.status(400).send('Please provide a name');
  }

  if (!race) {
    //3. race was not provided
    return res.status(400).send('Please provide a race');
  }

  //4. and 5. both name and race are valid so do the processing.
  const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`;

  //6. send the response
  res.send(greeting);
});

app.get('/sum', (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);
  const sum = `The sum of ${a} and ${b} is ba${a+b}a.`;
  res.send(sum);
});

app.get('/cipher', (req, res) => {
  const text = req.query.text.toUpperCase();
  const shift = Number(req.query.shift);
  const string = Array.from(text).map(char => {
    let code;
    if (char.charCodeAt(0) + shift > 90) {
      code = 64 + ((char.charCodeAt(0) + shift) - 90);
    } else {
      code = char.charCodeAt(0) + shift;
    };
    return code;
  });
  res.send((String.fromCharCode(...string)));
});

app.get('/lotto', (req, res) => {
  const ticket = req.query.arr;
  // const num = Array.from(Array(6)).map(index => Math.ceil(Math.random() * 20));
  // const num = Array.from(Array(6), () => Math.ceil(Math.random() * 20));
  const win = Array.from(Array(6), () => Math.ceil(Math.random() * 20));

  let results = 0;
  ticket.forEach(tick => {
    win.forEach(num => {
      if (num == Number(tick)) {
        results++;
      };
    });
  });

  switch(results) {
    case 4:
      res.send("Congratulations, you win a free ticket!");
    case 5:
      res.send("Congratulations! You win $100!");
    case 6:
      res.send("Wow! Unbelievable! You could have won mega millions!");
    default:
      res.send("Sorry, you lose!")
  };
});