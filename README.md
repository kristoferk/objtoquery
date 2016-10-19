
# objtoquery

![](https://api.travis-ci.org/kristoferk/objtoquery.svg?branch=master)

Converts a javascript object to an url query string


## Installation
```shell
npm install objtoquery --save
```

## Usage
```js
import objToQuery from 'objtoquery';
const query = objToQuery({ Id: 3, Name: 'Example' }); // Id=3&Name=Example
```

