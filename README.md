
# objtoquery

![](https://api.travis-ci.org/kristoferk/objtoquery.svg?branch=master)

Converts a javascript object to a url query string


## Installation
```shell
npm install objtoquery --save
```

## Usage
```js
import objToQuery from 'objtoquery';
const query = objToQuery({ 
    Id: 3, 
    Name: 'Example', 
    List: ['a', 'b'], 
    Sub: { Prop: 'S' } 
  }); 
  
  //Result: Id=3&Name=Example&List=a&List=b&Sub.Prop=S
```

## Options
```shell
const query = objToQuery(obj, { 
    toLower: false, 
    removeEmptyValues: false, 
    skipEncoding: false
  }); 
```

| Property          | Default  | Description  |
| ----------------- |:--------:| ------------ |
| toLower           | false    | Set keys in resulting querystring to lowercase                   |
| removeEmptyValues | false    | Remove keys with values equal to empty string                    |
| skipEncoding      | false    | Skip url encoding properties and values in resulting querystring |


## Tests
```shell
npm test
```


## Release History

* 1.0.0 Initial release
* 1.0.1 Support list of objects
