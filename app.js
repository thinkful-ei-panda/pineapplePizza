const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.get('/burgers', (req, res) => {
  res.send('We have juicy cheese burgers!');
});

app.get('/pizza/pepperoni', (req, res) => {
  res.send('Boring!');
});

app.get('/pizza/pineapple', (req, res) => {
  res.send('Living the dream!');
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
  res.send(req.query);
});

app.get('/greetings', (req, res) => {
  const name = req.query.name;
  const race = req.query.race;

  if (!name) {
    return res.status(400).send('Please provide a name');
  };

  if (!race) {
    return res.status(400).send('Please provide a race');
  };

  const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`;

  res.send(greeting);
});

app.get('/sum', (req, res) => {
  let sum;
  const a = Number(req.query.a);
  const b = Number(req.query.b);

  if (isNaN(a) || isNaN(b)) {
    sum = `The sum of ${a} and ${b} is ba${a+b}a.`;
  }
  
  sum = `The sum of ${a} and ${b} is ba${a+b}a.`;

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
  const lottoTicket = req.query.arr;
  // const num = Array.from(Array(6)).map(index => Math.ceil(Math.random() * 20));
  // const num = Array.from(Array(6), () => Math.ceil(Math.random() * 20));
  const winningNumbers = Array.from(Array(6), () => Math.ceil(Math.random() * 20));

  let results = 0;
  lottoTicket.forEach(ticketNum => {
    winningNumbers.forEach(winningNum => {
      if (winningNum == Number(ticketNum)) {
        results++;
      };
    });
  });

  switch(results) {
    case 4:
      return res.status(200).send("Congratulations, you win a free ticket!");
    case 5:
      return res.status(200).send("Congratulations! You win $100!");
    case 6:
      return res.status(200).send("Wow! Unbelievable! You could have won mega millions!");
    default:
      return res.status(200).send("Sorry, you lose!");
  };

});