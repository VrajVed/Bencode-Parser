class BencodeParser {
    constructor(data) {
        this.data = data;
        this.position = 0;
    }


    // DECODING LOGIC 
    parse() {
        return this.parseValue();
    }

    parseValue() {
        const character = this.data[this.position];

        if (character === 'i') {
            return this.parseInteger();
        }
        else if (character === 'l') {
            return this.parseList();
        }
        else if (character === 'd') {
            return this.parseDictionary();
        }
        else if (character >= '0' && character <= '9') {
            return this.parseString();
        }

        throw new Error(`Invalid Bencode format at position ${this.position}: unexpected character '${character}'`);
    }

    parseInteger(){
        this.position++;
        let numStr = "";

        while(this.data[this.position] !== 'e') {
            numStr += this.data[this.position++];
        }
        this.position++;
        return parseInt(numStr, 10);
    }

    parseString() {
        let lengthStr = "";

        while (this.data[this.position] !== ":") {
            lengthStr += this.data[this.position];
            this.position++;
        }
        this.position++;
        const length = parseInt(lengthStr, 10);
        const str = this.data.substr(this.position, length);

        
        this.position += length;

        return str;
    }

    parseList() {
        this.position++;
        const list = [];

        while (this.data[this.position] !== "e") {
            list.push(this.parseValue());
        }

        this.position++;
        return list;
    }

    parseDictionary() {
        this.position++;
        const ditionary = {};

        while (this.data[this.position] !== "e") { 
            const key = this.parseString();
            const value = this.parseValue();
            ditionary[key] = value;
        }

        this.position++;
        return ditionary;
    }

    // DECODING FUNCTIONALITY IN JAVASCRIPT

    
    static decode(bencodedString) {
        const parser = new BencodeParser(bencodedString);
        return parser.parse();
    }


    // ENCODING FUNCTIONALITY IN JAVASCRIPT


    static encode(value) {
        if (typeof value === 'number') {
            return `i${value}e`
        }
        if (typeof value === 'string') {
            return `${value.length}:${value}`;
        }
        if (Array.isArray(value)) {
            let result = 'l';
            for (let item of value) {
                result += BencodeParser.encode(item);
            }

            result += 'e';
            return result;
        }
        else if (typeof value === 'object') {
            let result = 'd';
            const keys = Object.keys(value).sort();
            for (let key of keys) {
                result += BencodeParser.encode(key);
                result += BencodeParser.encode(value[key]);
            }
            result += 'e';
            return result;
        }

        throw new Error("Unable to encode value of type " + typeof value);
    }
}

export default BencodeParser;
