import BencodeParser from './bencoder.js';

const tests = [
'i42e',                      // integer: 42
'4:spam',                    // string: "spam"
'li1ei2ei3ee',               // list: [1, 2, 3]
'd3:key5:valuee',            // dict: {key: "value"}
'd4:infod6:lengthi1024eeee', // nested dictitonayr
];

tests.forEach(test => {
    console.log(`Parsing: ${test}`);

    const parser = new BencodeParser(test);
    const result = parser.parse();

    console.log('Result:', result);
    console.log('-----------');
});