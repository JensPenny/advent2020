import { iteratee } from "lodash";
import { FileReader } from "./tools/filereader";


let test = `F10
N3
F7
R90
F11`

//day12A(test.split('\n'));
//day12B(test.split('\n'));

let reader = new FileReader;
/*
reader.read('./res/day12')
    .then(data => day12A(data.split('\n')))
    .catch(err => console.error(err));
*/

reader.read('./res/day12')
    .then(data => day12B(data.split('\n')))
    .catch(err => console.error(err));

function day12A(input: string[]) {
    let posX = 0;
    let posY = 0;
    let direction = 90; //East. Directions are 0, 90, 180, 270, 360

    let commands = input.map(line => [line.charAt(0), line.substring(1)]);
    commands.forEach(commandPair => {
        let command = commandPair[0];
        let move = parseInt(commandPair[1]);

        if (command == 'F') {
            if (direction == 90) {
                command = 'E';
            } else if (direction == 180) {
                command = 'S';
            } else if (direction == 270) {
                command = 'W';
            } else if (direction == 0) {
                command = 'N';
            }
        }

        switch (command) {
            case 'L':
                direction = (360 + direction - move) % 360;
                break;
            case 'R':
                direction = (direction + move) % 360;
                break;
            case 'N':
                posY = posY - move;
                break;
            case 'E':
                posX = posX + move;
                break;
            case 'S':
                posY = posY + move;
                break;
            case 'W':
                posX = posX - move;
                break;
            default:
                console.log('found unknown command ' + command);
                break;
        }
    });

    let distance = (Math.abs(posX) + Math.abs(posY));
    console.log('distance for the ship: ' + distance);
}

function day12B(input: string[]) {
    let shipX = 0;
    let shipY = 0;
    let wpX = 10;
    let wpY = -1;
    //let direction = 90; //East. Directions are 0, 90, 180, 270, 360

    let commands = input.map(line => [line.charAt(0), line.substring(1)]);
    commands.forEach(commandPair => {
        let command = commandPair[0];
        let move = parseInt(commandPair[1]);

        if (command == 'F') {
            shipX += (wpX * move);
            shipY += (wpY * move);
        }

        switch (command) {
            case 'L':
                let newPos = rotate(wpX, wpY, move);
                wpX = newPos[0];
                wpY = newPos[1];
                break;
            case 'R':
                let newPos2 = rotate(wpX, wpY, 360 - move);
                wpX = newPos2[0];
                wpY = newPos2[1];
                break;
            case 'N':
                wpY = wpY - move;
                break;
            case 'E':
                wpX = wpX + move;
                break;
            case 'S':
                wpY = wpY + move;
                break;
            case 'W':
                wpX = wpX - move;
                break;
            default:
                //console.log('found unknown command ' + command);
                break;
        }

        console.log('New ship position: ' + shipX + ' ' + shipY);
        console.log('New waypoint position: ' + wpX + ' ' + wpY);
        console.log();
    });

    let distance = (Math.abs(shipX) + Math.abs(shipY));
    console.log('distance for the ship B: ' + distance);
}

// E 10 | N 4 --> S 10 | E 4 --> 10, -4 --> 4,10
function rotate(posX: number, posY: number, direction: number): [number, number] {
    if (direction == 90) {
        return [posY, -posX];
    } else if (direction == 180) {
        return [-posX, -posY];
    } else if (direction == 270) {
        return [-posY, posX];
    }
    console.log('error and issues');
    return [0, 0];
}