import { stringify } from "querystring"
import { FileReader } from "./tools/filereader"


let test = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`
let reader = new FileReader;

calculateTrees(test, 1, 3);

reader.read('./res/day3')
    .then(data => calculateTrees(data, 1, 3))
    .then(trees => console.log('A - amount of trees: ' + trees))
    .catch(err => console.error(err))

reader.read('./res/day3')
    .then(data => {
        let result = calculateTrees(data, 1, 1) *
            calculateTrees(data, 1, 3) *
            calculateTrees(data, 1, 5) *
            calculateTrees(data, 1, 7) *
            calculateTrees(data, 2, 1);
        return result;
    })
    .then(trees => console.log('B - amount of trees: ' + trees))
    .catch(err => console.error(err))


function calculateTrees(data: string, downmove: number, rightmove: number): number {
    let lines = reader.asStringList(data, '\n');
    let field = lines.map(line => line.split(''));

    let column = 0;
    let countTrees = 0;
    for (let row = 0; row < field.length; row = row + downmove) {
        let fieldItem = field[row][column % field[row].length]

        if (fieldItem === '#') {
            countTrees++;
        }
        column += rightmove;
    }
    return countTrees;
}

