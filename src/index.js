const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

function decode(expr) {

    let arr = []

    function splitBy10 (start = 0) {

        if (expr.length <= start) return;

        let end = start + 10;
        arr.push(expr.slice(start, end));
        splitBy10(end);
    }

    splitBy10();

    let result = [];

    for (let item of arr) {

        let letter = '';
        let first1 = false;
        let stack = [];

        for (let i = 0; i < item.length; i++) {

            if (first1 === false && (item[i] === '0' || item[i] === '*')) {}
            else if (item[i] === '1') {

                if (first1 === false) first1 = true;

                if (stack[stack.length - 1] === '1') {
                    stack.pop();
                    letter += '-';
                }
                else {
                    stack.push('1');
                }
            }
            else if (item[i] === '0') {

                if (stack[stack.length - 1] === '1') {
                    stack.pop();
                    letter += '.';
                }
            }
        }

        if (letter.length < 1) result.push(' ');
        else {
            result.push(MORSE_TABLE[letter]);
        }
    }

    return result.join('');
}

module.exports = {
    decode
}