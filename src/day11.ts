import { FileReader } from "./tools/filereader";


let test = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`

day11A(createMatrix(test));

let reader = new FileReader;

reader.read('./res/day11')
    .then(data => day11A(createMatrix(data)))
    .catch(err => console.error(err));

function createMatrix(data: string): string[][] {
    return data.split('\n').map(line => line.split(''));
}

function day11A(input: string[][]) {
    let previous = -1;
    let current = 0;

    let iteration = input;
    print(iteration);
    console.log('\n');
    while (current != previous) {
        iteration = doTurn(iteration);
        previous = current;
        current = countOccupied(iteration);
        print(iteration);
        console.log('\n');
    }
    console.log(countOccupied(iteration));
}

function doTurn(input: string[][]): string[][] {
    let out = [...input.map(row => [...row])]; //copy
    for (let row = 0; row < input.length; row++) {
        const element = input[row];
        for (let col = 0; col < element.length; col++) {
            let current = input[row][col];
            if (current == 'L') {
                //let count = countNeighbours(input, row, col); Part 1
                let count = countNeighboursPart2(input, row, col);
                if (count == 0) {
                    out[row][col] = '#';
                }
            } else if (current == '#') {
                //count neighbours
                //let count = countNeighbours(input, row, col); Part 1
                let count = countNeighboursPart2(input, row, col);
                //if (count >= 4) {: Part 1
                if (count >= 5) {
                    out[row][col] = 'L';
                }
            }
        }
    }
    return out;
}

//Old function that was used for part 1
function countNeighbours(input: string[][], row: number, col: number): number {
    let nearby = input.slice(row - 1 < 0 ? 0 : row - 1, row + 2 >= input.length ? input.length : row + 2)
        .map(r => r.slice(col - 1 < 0 ? 0 : col - 1, col + 2 >= r.length ? r.length : col + 2));

    let occupied = countOccupied(nearby);

    if (input[row][col] == '#') {
        return occupied - 1;
    } else {
        return occupied;
    }
}

function countNeighboursPart2(input: string[][], row: number, col: number) {
    let results = [];
    for (let rowoffset = -1; rowoffset <= 1; rowoffset++) {
        for (let coloffset = -1; coloffset <= 1; coloffset++) {
            if (rowoffset == 0 && coloffset == 0){
                continue;
            } else {
                results.push(findSeat(input, row, col, rowoffset, coloffset))
            } 
        }
    }

    return results.filter(res => res == '#').length;
}

function findSeat(input: string[][], currentx: number, currenty: number, offsetx: number, offsety: number): string {
    if (input[currentx + offsetx] && input[currentx + offsetx][currenty + offsety]) {
        let current = input[currentx + offsetx][currenty + offsety];
        if (current == '#' || current == 'L') {
            return current;
        } else {
            return findSeat(input, currentx + offsetx, currenty + offsety, offsetx, offsety);
        }
    } else {
        return '.';
    }
}

function countOccupied(input: string[][]): number {
    let occupied = 0;

    input.forEach(line => {
        occupied += line.filter(char => char === '#').length;
    });
    return occupied;
}

function print(input: string[][]) {
    input.map(row => row.join('')).forEach(row => console.log(row));
}