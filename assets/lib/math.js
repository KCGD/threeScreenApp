const nativeOperators = ["+", "-", "*", "/", "^", "�"];
const debugging = true;
const debugPrefixFixedLength = 37;

function doTheMath(math) {
    return(eval(normalize(math)));
}


function normalize(input) {
    //basic formatting
    input = replaceAll(input, " ", "");
    input = replaceAll(input, "--", " - -");
    log(`${fixString("applied basic formatting:", debugPrefixFixedLength)} ${input}`);
    //map special functions to native math library
    input = input
        .replace(/sin/g, "Math.sin�")
        .replace(/cos/g, "Math.cos�")
        .replace(/tan/g, "Math.tan�")
        .replace(/sqrt/g, "Math.sqrt�")
        .replace(/log/g, "Math.log�");
    input = replaceAll(input, "√", "Math.sqrt�");
    log(`${fixString("translated special functions:", debugPrefixFixedLength)} ${input}`);
    //special values
    input = replaceAll(input, "PI", "Math.PI");
    log(`${fixString("applied special value substutitions:", debugPrefixFixedLength)} ${input}`);
    //implicit syntax
    let newString = [];
    for (let i = 0; i < input.length; i++) {
        let char = input[i];
        let previous = input[i - 1];
        let next = input[i + 1];
        switch (char) {
            case ")":
                if (!nativeOperators.includes(next) && next !== ")" && next !== undefined) {
                    //insert multiplication operator
                    newString.push(")");
                    newString.push("*");
                }
                else {
                    newString.push(")");
                }
                break;
            case "(":
                if (!nativeOperators.includes(previous) && previous !== "(" && previous !== undefined) {
                    //insert multiplication operator
                    newString.push("*");
                    newString.push("(");
                }
                else {
                    newString.push("(");
                }
                break;
            default:
                newString.push(char);
        }
    }
    log(`${fixString("generated syntax:", debugPrefixFixedLength)} ${newString.join('')}`);
    //apply last step replacements and return
    log(`${fixString("apply last step replacements:", debugPrefixFixedLength)} ${newString.join('')
        .replace(/\*\*/g, "*")
        .replace(/�/g, "")
        .replace(/\^/g, "**")}`);
    return newString.join('')
        .replace(/\*\*/g, "*")
        .replace(/�/g, "")
        .replace(/\^/g, "**");
}
//replace all of target string in parent string
function replaceAll(input, target, newString) {
    let occurances = occurrences(input, target, true);
    for (let i = 0; i < occurances; i++) {
        input = input.replace(target, newString);
    }
    return input;
}
//https://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string
//get occurances of substring in string
function occurrences(string, subString, allowOverlapping) {
    string += "";
    subString += "";
    if (subString.length <= 0) {
        return (string.length + 1);
    }
    else {
        var n = 0, pos = 0, step = allowOverlapping ? 1 : subString.length;
        while (true) {
            pos = string.indexOf(subString, pos);
            if (pos >= 0) {
                ++n;
                pos += step;
            }
            else
                break;
        }
        return n;
    }
}
//debug logger
function log(message) {
    if (debugging) {
        console.log(`[MATH]: ${message}`);
    }
}
//force string length to spesified size (will expand / crop automatically)
function fixString(input, length) {
    if (input.length > length) {
        return input.substring(0, length);
    }
    else {
        return input.concat(new Array(length - input.length).fill(" ").join(""));
    }
}
