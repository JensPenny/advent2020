import { match } from "assert";
import { start } from "repl";
import { FileReader } from "./tools/filereader";

let testA = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`

day14A(testA);
let reader = new FileReader;
reader.read('./res/day14')
    .then(data => day14A(data))
    .catch(err => console.error(err));

let testB = `mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1`
day14B(testB);
reader.read('./res/day14')
    .then(data => day14B(data))
    .catch(err => console.error(err));


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
    let buffer: Map<number, string> = new Map();

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
                let value = startIndex.toString(2)
                    .padStart(mask.length, '0')
                    .split('')
                    .map((element, index) => {
                        if (mask[index] == 'X') {
                            return 'X';
                        } else if (mask[index] == '1') {
                            return '1';
                        } else {
                            return element;
                        }
                    }).join('');

                let perms = findPermutations(value);

                //Hurr durr sparse arrays gaan `maar` tot 4294967296 - 1, wat 32 bits zijn. 
                //Mem adresses in die opdracht zijn 36 bits
                perms.forEach((perm) => buffer.set(parseInt(perm, 2), line[1]));
            }
        }
    });

    let result = 0;
    buffer.forEach(line => result += parseInt(line, 10));

    console.log('result B: ' + result);
}

function findPermutations(perms: string): string[] {
    let index = perms.lastIndexOf('X');


    if (index == -1) {
        return [perms];
    } else {
        let baseString = perms.substring(index + 1, perms.length);
        let postparts = findPermutations(perms.substring(0, index));

        let results: string[] = [];
        postparts.forEach(part => {
            results.push(part + '0' + baseString);
            results.push(part + '1' + baseString);
        });
        return results;
    }
}