import { FileReader } from "./tools/filereader";


let test = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`

findDubs(test);

let reader = new FileReader
reader.read('./res/day8')
    .then(data => findDubs(data))
    .catch(err => console.error(err))

function findDubs(data: string) {
    let instructions = data.split('\n').map(line => line.split(' '));
    let tochange = instructions
        .map((instr, index) => { return { inst: instr, ind: index } })
        .filter(pew => pew.inst[0] === 'jmp' || pew.inst[0] === 'nop');

    for (let change of tochange) {

        let pointer = 0;
        let accum = 0;
        let path = new Set;

        while (pointer != -1) {
            if (pointer > instructions.length - 1) {
                console.log('program terminated succesfully at accum ' + accum);
                return;
            }
            let instr = instructions[pointer][0];
            let amount = parseInt(instructions[pointer][1]);

            if (pointer == change.ind){
                if (instr === 'jmp') {
                    instr = 'nop'
                } else {
                    instr = 'jmp'
                }
            }

            if (path.has(pointer)) {
                console.log('dupe pointer: ' + pointer);
                console.log('accum value: ' + accum);
                pointer = -1;
                continue;
            }
            path.add(pointer);
            switch (instr) {
                case 'nop':
                    pointer++;
                    break;
                case 'acc':
                    accum += amount;
                    pointer++;
                    break;
                case 'jmp':
                    pointer += amount;
                    break;
                default:
                    break;
            }
        }
    }
}