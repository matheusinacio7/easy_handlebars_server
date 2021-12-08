const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars');
const express = require('express');

const configFileName = process.argv[2];
const configFilePath = path.resolve(process.cwd(), configFileName);

const {
  templatePath,
  parameters,
  port: configPort
} = require(configFilePath);

const templateFile = fs.readFileSync(templatePath, 'utf-8');
const template = handlebars.compile(templateFile);
const html = template(parameters);

const app = express();

app.get('/', (_req, res) => {
  res.status(200).setHeader('Content-Type', 'text/html').send(html);
});

const port = configPort || process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`Your handlebars is served at port ${port}`);
});
