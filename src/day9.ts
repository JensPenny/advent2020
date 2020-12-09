import { read } from "fs";
import { add } from "lodash";
import { findPair } from "./day1";
import { FileReader } from "./tools/filereader";

let test = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`

//day9A(test, 5);
day9B(test, 127);

let reader = new FileReader
//reader.read('./res/day9')
//    .then(data => day9A(data, 25))
//    .catch(err => console.error(err))

reader.read('./res/day9')
    .then(data => day9B(data, 14360655))
    .catch(err => console.error(err))


function day9A(data: string, prelength: number) {
    let input = data.split('\n').map(line => parseInt(line));
    let out = input.slice(prelength);

    out.forEach((output, index) => {
        let preamble = input.slice(0 + index, prelength + index).join('\n');
        let result = findPair(preamble, output);
        if (result[0] === 0 && result[1] === 0){
            console.log('invalid entry: ' + output);
        }
    })
}

function day9B(data: string, tofind: number){
    let input = data.split('\n').map(line => parseInt(line)).filter(f => f < tofind);

    for (let index in input) {
        let sum = input[index];
        let found = [sum];
        while (sum < tofind) {
            let next = input[Number(index) + found.length];
            sum += next;
            found.push(next);
        }

        if (sum === tofind){ 
            console.log(found);
            console.log('I wish I read the actual assignment');
            console.log('result = ' + (found.sort((l, r) => r - l)[0] + found.sort((l, r) => r - l)[found.length - 1]))
        }
    }
    console.log('noop');
}

//Wanted to do backtracking so badly I messed up and didnt read the word 'contingious', herp
//It gets all permutations. Posted so my shame can live eternally on github
function day9BButWrong(data: string, tofind: number){
    let input = data.split('\n').map(line => parseInt(line)).filter(f => f < tofind).sort((l, r) => r - l);

    for (let index in input) {
        let sum = input[index];
        let added = [sum];
        findSum(added, sum, input.slice(Number(index) + 1), tofind);
    }
}

function findSum(added: number[], sum: number, toCheck: number[], toFind: number) {
    for (let number of toCheck) {
        let newSum = sum + number;
        if (newSum > toFind){ 
            continue;
        } else if (newSum < toFind) {
            findSum(added.concat(number), newSum, toCheck.slice(toCheck.indexOf(number)), toFind);
        } else if (newSum == toFind) {
            console.log(added.concat(number));
        }
    }
}
