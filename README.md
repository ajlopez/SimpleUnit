# SimpleUnit

Simple test framework for JavaScript/Node.js

## Installation

Via npm on Node:

```
npm install simpleunit
```

or globally

```
npm install simpleunit -g
```

## Usage

```
simpleunit <name> [<name> ... ] [-r | --recursive]
```
where `name` is a directory or a `.js` file. If `name` is a directory, it processes all the `.js` files in
directory.

The options `-r`, `--recursive` indicates to process all directories in the tree. Without this option, if a directory is specified,
only the files in the directory are processed, without processing the files in subdirectories.

Each `.js` is a module that exports functions receiving a parameter, ie `test`:

```
exports['one function'] = function (test) {
    test.ok(1);
};

exports['another function'] = function (test) {
    test.ok(1);
};
```

The `test` argument has all the functions available for builtin `assert`.

Reference in your program:

```js
var sf = require('simpleunit');
```

## Development

```
git clone git://github.com/ajlopez/SimpleUnit.git
cd SimpleUnit
npm install
npm test
```

## Samples

TBD

## Versions

- 0.0.1: Published
- 0.0.2: Published;  asynchronous support via  `test.async`, `test.done` functions
- 0.0.3: Published; fixed bin to load library
- 0.0.4: Published: strange error in line feeds bin file
- 0.0.5: Published: adding color and print test name
- 0.0.6: Published: timeout in test.async
- 0.0.7: Published: recursive option

## Inception

Inspired by [node-unit](https://github.com/caolan/nodeunit), but simpler.

## Contribution

Feel free to [file issues](https://github.com/ajlopez/SimpleUnit) and submit
[pull requests](https://github.com/ajlopez/SimpleUnit/pulls) � contributions are
welcome<

If you submit a pull request, please be sure to add or update corresponding
test cases, and ensure that `npm test` continues to pass.
