{
    let test = `0,3,6`;
    let test2 = `3,1,2`;

    //day15A(test, 11);
    //day15A(test2, 2021);
    let input = `0,13,16,17,1,10,6`;
    //day15A(input, 2021);
    day15A(input, 30000001);
}
function day15A(input: string, turns: number) {
    let items = input.split(',').map(line => Number(line));
    let numberlist: Map<number, number[]> = new Map(items.map((item, index) => [item, [index + 1]]));

    //niet volledig, maar idee is goed
    let nextSpoken = 0;
    for (let turn = items.length + 1; turn < turns; turn++) {
        //console.log('turn ' + turn + ' spoken ' + nextSpoken);
        if (turn == turns - 1) {
            console.log('turn ' + turn + ' spoken ' + nextSpoken);
        }
        if (numberlist.has(nextSpoken)) {
            let spoken = numberlist.get(nextSpoken);
            if (spoken == undefined) {
                console.error('empty content for ' + spoken + ' :(')
            } else {
                spoken.push(turn);
                nextSpoken = spoken[spoken.length - 1] - spoken[spoken.length - 2];
            }
        } else {
            numberlist.set(nextSpoken, [turn]);
            nextSpoken = 0;
        }
    }
}