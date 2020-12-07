import { FileReader } from "./tools/filereader";

class Bag {
    color: string;
    linkedBags: Map<Bag, number>;

    constructor(color: string) {
        this.color = color;
        this.linkedBags = new Map();
    }
}

let test = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`
parseBags(test);
console.log('test B:' + (countBags(parseBags(test)) - 1));

let reader = new FileReader
reader.read('./res/day7')
    .then(data => parseBags(data))
    .then(root => countBags(root))
    .then(amount => console.log('amount bags: ' + (amount - 1)))
    .catch(err => console.error(err))


function parseBags(data: string) {
    //Root element: golden bag
    let root = new Bag('shiny gold');

    let bagSet = new Map<string, Bag>();
    bagSet.set(root.color, root);

    data.split('\n')
        .map(line => line.split('contain'))
        .map(pair => {
            let color = pair[0].trim().split('bags').join('').split('bag').join().trim();
            let bag: Bag | undefined;
            if (bagSet.has(color)) {
                bag = bagSet.get(color);
            } else {
                bag = new Bag(color);
                bagSet.set(color, bag);
            }

            if (pair[1] == undefined){
                return '';
            }
            let bagString = pair[1].split(',')
            bagString.forEach(singlebag => {
                let amount = parseInt(singlebag.trim().substring(0, 1));
                let subBag = singlebag.substring(2).split('.').join('').split('bags').join('').split('bag').join('').trim();

                let innerBag: Bag | undefined;
                if (bagSet.has(subBag)) {
                    innerBag = bagSet.get(subBag);
                } else {
                    innerBag = new Bag(subBag);
                    bagSet.set(subBag, innerBag);
                }
                if (!isNaN(amount) && bag != undefined && innerBag != undefined) {
                    bag.linkedBags.set(innerBag, amount);
                }
            })
        });
    
        let amount = 0;
        bagSet.forEach(bag => {
            if (canHoldGold(bag)){
                //console.log(bag.color + ' holds')
                amount++;
            } else {
                //console.log(bag.color + ' cant hold gold')
            }
        })

    console.log('solution A: ' + (amount - 1)); //includes gold

    return root;
};

function canHoldGold(bag: Bag): boolean{
    if (bag.color === 'shiny gold'){
        return true;
    } else {
        return Array.from(bag.linkedBags).some(bag => canHoldGold(bag[0]))
    }
}

function countBags(bag: Bag) : number{
    let counter = 1;

    Array.from(bag.linkedBags).forEach(innerBag => {
        let innerCount = innerBag[1];
        counter += innerCount * countBags(innerBag[0]);
    });
    return counter;
}