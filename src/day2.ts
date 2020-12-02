import { match } from "assert";
import { FileReader } from "./tools/filereader"

let test =
    `1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc
11-16 m: hmgcmtxxmpmdbdkmmmmmmmmmmmm`
let reader = new FileReader;

day2(test)

reader
    .read("./res/day2")
    .then((data) => day2(data))
    .catch((err) => console.error(err))


function day2(data: string) {
    let input = reader.asStringList(data, '\n');

    let passwords = input.map(line => {
        let split = line.split(' ', 2);
        let bounds = split[0].split('-', 2);
        let pwd = {
            lowerbound: Number(bounds[0]),
            upperbound: Number(bounds[1]),
            character: line.charAt(line.indexOf(':') - 1),
            password: line.slice(line.indexOf(':') + 1).trim()
        }
        return pwd;
    })

    let geldig = passwords.map(isValidA).filter(Boolean).length;
    console.log('\naantal geldig optie A: ' + geldig);

    let geldigB = passwords.map(isValidB).filter(Boolean).length;
    console.log('\naantal geldig optie B: ' + geldigB);
}

function isValidA(pwd: password): boolean {
    let matches = pwd.password.split(pwd.character).length - 1
    if (matches >= pwd.lowerbound && matches <= pwd.upperbound) {
        //console.log(pwd.password + ' valid');
        return true;
    } else {
        //console.log(pwd.password + ' invalid')
        return false;
    }
}

function isValidB(pwd: password): boolean {
    let lowerMatch = pwd.password.charAt(pwd.lowerbound - 1) === pwd.character;
    let upperMatch = pwd.password.charAt(pwd.upperbound - 1) === pwd.character;

    return lowerMatch !== upperMatch;
}

interface password {
    lowerbound: number
    upperbound: number
    character: string
    password: string
}