import { reduce } from "lodash";
import { FileReader } from "./tools/filereader";


let test = `16
10
15
5
1
11
7
19
6
12
4`

let largetest = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`

//day10A(test);
day10B(test);
day10B(largetest);
let reader = new FileReader;
//reader.read('./res/day10')
//    .then(data => day10A(data))
//    .catch(err => console.error(err))

reader.read('./res/day10')
    .then(data => day10B(data))
    .catch(err => console.error(err))

function day10A(data: string) {
    let list = data.split('\n').map(line => parseInt(line)).sort((l, r) => l - r);
    let padded = [0].concat(list).concat(list[list.length - 1] + 3);

    let singlejumps = padded.reduce((acc, current, index) => {
        if (current - padded[index - 1] === 1) {
            return acc + 1;
        } else {
            return acc;
        }
    });

    let triplejumps = padded.reduce((acc, current, index) => {
        if (current - padded[index - 1] === 3) {
            return acc + 1;
        } else {
            return acc;
        }
    });

    console.log("sol A: " + (singlejumps * triplejumps));
}

function day10B(data: string) {
    let list = data.split('\n').map(line => parseInt(line)).sort((l, r) => r - l);
    let padded = [list[0] + 3].concat(list).concat(0);

    let multipleSolutions = [];
    //Chains have different possibilities
    //chains of 3 following items have 2 solutions
    //chains of 4 following items have 4 solutions
    //chains of 5 following items have 7 solutions

    let multiplier: number[] = [];
    let counter = 0; //Counts following items
    padded.reduce((acc, current) => {
        if (acc - current == 1) {
            counter++;
        } 
        if (acc - current != 1 || current == 0) { //dont forget to break for the last loop
            if (counter != 0) {
                if (counter == 2) {
                    multiplier.push(2);
                } else if (counter == 3) {
                    multiplier.push(4);
                } else if (counter == 4) {
                    multiplier.push(7);
                } else if (counter > 5) {
                    console.log('didnt count further links. Game is hard :(');
                }
                counter = 0;
            }
        }
        return current;
    })

    let result = multiplier.reduce((acc, curr) => acc * curr);
    console.log('Sol B: ' + result);
}