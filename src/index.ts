import * as fs from "fs";
import handlebars from 'handlebars';

const templateString = fs.readFileSync('./template/index.hbs', 'utf8');
const template = handlebars.compile(templateString);

function readDeckJson() {
  const data = fs.readFileSync("./deck.json", "utf-8");
  return {objects: JSON.parse(data)};
}

const output = template(readDeckJson());
console.log(output);
