import { FileReader } from "./tools/filereader";

let test = `939
7,13,x,x,59,x,31,19`

let test2 = `0
17,x,13,19`

let test3 = `
67,7,x,59,61`

//day13A(test);

/*
let reader = new FileReader;
reader.read('./res/day13')
    .then(data => day13A(data))
    .catch(err => console.error(err));
*/

day13B(test, 1000);
day13B(test2, 40);
day13B(test3, 1000)
let reader = new FileReader;
reader.read('./res/day13')
    .then(data => day13B(data, 102033551303021))
    .catch(err => console.error(err));

function day13A(input: string) {
    let lines = input.split('\n');
    let minutes = parseInt(lines[0]);
    let busses = lines[1].split(',').map(line => parseInt(line));

    let mapped = busses.filter(bus => !isNaN(bus)).map(bus => {
        let difference = minutes % bus;
        let minimal = minutes - difference + bus;

        return [minimal, bus];
    });

    let result = mapped.sort((l, r) => l[0] - r[0]);
    let earliest = result[0];

    //console.log('found ' + earliest);
    console.log('result = ' + (earliest[0] - minutes) * earliest[1]);
}

//It has to be something with these goddamn primes
function day13B(input: string, start: number) {
    let lines = input.split('\n');
    let busses = lines[1].split(',').map(line => parseInt(line));

    let max = busses.reduce((acc, bus) => bus > acc ? bus : acc); 

    let found = false;

    let current = (start - (start % max)) - busses.indexOf(max);
    while (!found) {
        found = busses.every((bus, index) => isNaN(bus) || (current + index) % bus === 0);
        if (found){
            console.log('first timestamp = ' + current);
            break;
        }
        current += max;
    }
}