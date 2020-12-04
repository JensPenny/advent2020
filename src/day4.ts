import { FileReader } from "./tools/filereader"

let test = `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:qwer

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:azer
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`

let testBValid = `pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719`

let reader = new FileReader;

day4A(test);
day4A(testBValid);

reader.read('./res/day4')
    .then(data => day4A(data))
    .catch(err => console.error(err))

function day4A(data: string) {
    let rawpass = reader.asStringList(data, '\n\n');

    let passports = rawpass.map(line => line.split('\n').join(' ').split(' ').map(element => element.split(':')));
    let valid = passports.filter(isValid).length
    console.log('valids: ' + valid);

    let withRules = passports.filter(isValidWithRules).length
    console.log('With rules: ' + withRules);
}

function isValid(passport: string[][]): boolean {
    let allKeys = passport.map(pwd => pwd[0]).join();
    return allKeys.match('byr') !== null &&
        allKeys.match('iyr') !== null &&
        allKeys.match('eyr') !== null &&
        allKeys.match('hgt') !== null &&
        allKeys.match('hcl') !== null &&
        allKeys.match('ecl') !== null &&
        allKeys.match('pid') !== null
}

function isValidWithRules(passport: string[][]): boolean {
    return passport.some(line => line[0] == 'byr' && Number(line[1]) >= 1920 && Number(line[1]) <= 2002)
        && passport.some(line => line[0] == 'iyr' && Number(line[1]) >= 2010 && Number(line[1]) <= 2020)
        && passport.some(line => line[0] == 'eyr' && Number(line[1]) >= 2020 && Number(line[1]) <= 2030)
        && passport.some(line => line[0] == 'hgt' && correctHeight(line[1]))
        && passport.some(line => line[0] == 'hcl' && line[1].match('^#[0-9a-f]{6}$'))
        && passport.some(line => line[0] == 'ecl' && checkEyes(line[1]))
        && passport.some(line => line[0] == 'pid' && line[1].match('^[0-9]{9}$'))
}

function checkEyes(eyecolor: string): boolean {
    return eyecolor === 'amb' ||
    eyecolor === 'blu' || 
    eyecolor === 'brn' || 
    eyecolor === 'gry' || 
    eyecolor === 'grn' || 
    eyecolor === 'hzl' || 
    eyecolor === 'oth' 
}

function correctHeight(height: string): boolean {
    let toCheck = height.match(/^(\d{2,3})(..)$/);
    if (toCheck == null) {
        return false;
    }
    if (toCheck[2] == 'cm') {
        return Number(toCheck[1]) >= 150 && Number(toCheck[1]) <= 193;
    }
    if (toCheck[2] == 'in') { 
        return Number(toCheck[1]) >= 59 && Number(toCheck[1]) <= 76;
    }
    return false;
}