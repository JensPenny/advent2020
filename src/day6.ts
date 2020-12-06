import { FileReader } from "./tools/filereader";


let test = `abc

a
b
c

ab
ac

a
a
a
a

b`

day6A(test);
day6B(test);

let reader = new FileReader
reader.read('./res/day6')
    .then(data => day6A(data))
    .then(data => day6B(data))
    .catch(err => console.error(err))

function day6A(data: string) : string{
    let questionairres = data.split('\n\n');
    let scores = questionairres.map(q => {
        let completestring = q.split('\n').join('');
        let uniqueAnswers = new Set();
        completestring.split('').forEach(element => uniqueAnswers.add(element));
        return uniqueAnswers.size;
    });

    let total = scores.reduce((sum, current) => sum += current);
    console.log('total score A is: ' + total);

    return data;
}

function day6B(data: string) {
    let questionairres = data.split('\n\n');
    let scores = questionairres.map(q => {
        let people = q.split('\n').length;
        let completestring = q.split('\n').join('');
        let uniqueAnswers = new Set();
        completestring.split('').forEach(element => uniqueAnswers.add(element));

        let counter = 0;
        uniqueAnswers.forEach(answer => {
            if (completestring.split(String(answer)).length - 1 === people){
                counter++;
            }
        })
        return counter;
    })
    let total = scores.reduce((sum, current) => sum += current);
    console.log('total score B is: ' + total);

}