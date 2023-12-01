import { flatten } from "lodash";
import { resourceLimits } from "worker_threads";
import { FileReader } from "./tools/filereader";

let test = `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`;

let testB = `class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9`
//day16A(parseInput(test));
//day16B(parseInput(testB));

let reader = new FileReader;
/*
reader.read('./res/day16')
    .then(data => day16A(parseInput(data)))
    .catch(err => console.error(err));
    */

reader.read('./res/day16')
    .then(data => day16B(parseInput(data)))
    .catch(err => console.error(err));


function parseInput(input: string): card {
    let splitted = input.split('\n\n');

    let ticketRules: rule[] = splitted[0].split('\n').map(line => {
        let ruleline = line.split(':');
        let key = ruleline[0];
        let value = ruleline[1].split(' or ').map(rule => rule.split('-').map(limit => parseInt(limit)));

        let ruleLimits: bound[] = [];
        for (let index = 0; index < value.length; index++) {
            ruleLimits.push({ low: value[index][0], high: value[index][1] });
        }
        return { name: key, bounds: ruleLimits };
    });
    console.log(ticketRules);

    let myticket = splitted[1].replace('your ticket:\n', '').split('\n')[0].split(',').map(value => parseInt(value));

    let nearby = splitted[2].replace('nearby tickets:\n', '').split('\n').map(ticket => ticket.split(',').map(value => parseInt(value)));

    return { rules: ticketRules, myTicket: myticket, others: nearby };
}

function day16A(input: card) {
    let total = 1;
    flatten(input.others).forEach(entry => {
        let hasValidRule = input.rules.some(rule => {
            return rule.bounds.some(bound => entry <= bound.high && entry >= bound.low);
        });

        if (!hasValidRule) {
            console.log(entry + ' is not valid');
            total = total * entry;
        }
    });

    console.log('Day 16 A: ' + total);
}

function day16B(input: card) {

    let otherTickets = input.others.filter(others => {
        //If 1 rule succeeds for a ticket, its valid

        let hasValidRule = others.some(entry => 
            input.rules.some(rule => {
                return rule.bounds.some(bound => entry <= bound.high && entry >= bound.low);
            }));
        return hasValidRule;
    });
    //Find departure fields
    let validRules = input.rules.filter(rule => !rule.name.search('departure'));
    //let validRules = input.rules.filter(rule => !rule.name.search('seat'));

    let sum = 0;
    for (let index = 0; index < input.myTicket.length; index++) {
        //For every field we find, we try to find a rule where they all apply. That field we take in the sum.
        let hasRule = validRules.some(rule => {
            return otherTickets.every(ticket => {
                let entry = ticket[index];
                return rule.bounds.some(bound => entry <= bound.high && entry >= bound.low);
            });
        });

        if (hasRule) {
            console.log('found correct rule at position ' + index);
            sum += input.myTicket[index];
        }
    }

    console.log('total multi: ' + sum);
}

interface card {
    rules: rule[];
    myTicket: number[];
    others: number[][];
}

interface rule {
    name: string;
    bounds: bound[];
}

interface bound {
    low: number;
    high: number;
}