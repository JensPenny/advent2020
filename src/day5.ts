import { read } from "fs";
import { FileReader } from "./tools/filereader";


let reader = new FileReader;
let test = `BFFFBBFRRR
FFFBBBFRRR`

//day5A(test);

reader.read('./res/day5')
    .then(data => day5A(data))
    .catch(err => console.error(err))


function day5A(data: string) {
    let asBytes = data.split('B').join('1')
        .split('F').join('0')
        .split('R').join('1')
        .split('L').join('0');

    let positionList = reader.asStringList(asBytes, '\n');
    let passes = positionList.map(position => {
        let left = position.substr(0, 7);
        let right = position.substr(7, 9);

        let row = parseInt(left, 2);
        let col = parseInt(right, 2);
        return { row, col }
    })

    let maxPassID = passes
        .map(pass => pass.row * 8 + pass.col)
        .reduce((max, current) => {
            if (current > max) {
                return current;
            } else {
                return max;
            }
        });

    console.log('highest id: ' + maxPassID);

    let passIds = passes.map(pass => pass.row * 8 + pass.col).sort().reverse();
    console.log(passIds);

    for (let testId = maxPassID - 1; maxPassID > 0; testId--){
        if (passIds.indexOf(testId) === -1
         && passIds.indexOf(testId - 1) !== -1
         && passIds.indexOf(testId + 1) !== -1){
            console.log('Found empty seat ' + testId);
            break;
         }
    }
}