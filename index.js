import BencodeParser from './bencoder.js';

console.log('Encoding 42:', BencodeParser.encode(42));
console.log('Encoding "spam":', BencodeParser.encode('spam'));
console.log('Encoding [1, 2, 3]:', BencodeParser.encode([1, 2, 3]));
console.log('Encoding {key: "value"}:', BencodeParser.encode({ key: 'value' }));
console.log('Encoding nested:', BencodeParser.encode({ info: { length: 1024 } }));
console.log('-----------');

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


console.log(BencodeParser.decode(BencodeParser.encode({ cat: 1, dog: 2 })));