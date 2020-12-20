import { match } from "assert";
import { FileReader } from "./tools/filereader";

let test = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`

/*
day14A(test);
let reader = new FileReader;
reader.read('./res/day14')
    .then(data => day14A(data))
    .catch(err => console.error(err));
*/
let testB = `mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1`
day14B(testB);

function day14A(input: string) {
    let lines = input.split('\n').map(line => line.split('=').map(entry => entry.trim()));

    let mask = '';
    let buffer: string[] = [];

    lines.forEach(line => {
        if (line[0] == 'mask') {
            mask = line[1];
        } else {
            let matches = line[0].match(/\d+/);
            if (matches == null) {
                console.error('derp error');
                return;
            } else {
                let index = parseInt(matches[0]);
                let value = parseInt(line[1]).toString(2)
                    .padStart(mask.length, '0')
                    .split('')
                    .map((element, index) => {
                        if (mask[index] == 'X') {
                            return element;
                        } else {
                            return mask[index];
                        }
                    }).join('');
                //console.log('old: ' + line[1]);
                //console.log('new: ' + value);
                buffer[index] = value;
            }
        }
    });

    let result = buffer.map(line => parseInt(line, 2))
        .reduce((acc, current) => acc += current);

    console.log('result A: ' + result)
}

function day14B(input: string) {
    let lines = input.split('\n').map(line => line.split('=').map(entry => entry.trim()));

    let mask = '';
    let buffer: string[] = [];

    lines.forEach(line => {
        if (line[0] == 'mask') {
            mask = line[1];
        } else {
            let matches = line[0].match(/\d+/);
            if (matches == null) {
                console.error('derp error');
                return;
            } else {
                let startIndex = parseInt(matches[0]);
                let currentOffset = 0;
                let allXes = mask.match(/X/g);
                console.log(allXes);
                let value = parseInt(line[1]).toString(2)
                    .padStart(mask.length, '0')
                    .split('')
                    .map((element, index) => {
                        if (mask[index] == 'X') {
                            return element;
                        } else {
                            return mask[index];
                        }
                    }).join('');
                //console.log('old: ' + line[1]);
                //console.log('new: ' + value);
                buffer[startIndex] = value;
            }
        }
    });

    let result = buffer.map(line => parseInt(line, 2))
        .reduce((acc, current) => acc += current);

    console.log('result A: ' + result)
}