export function validateNumber(number) {

    const re = /^\d+(\.\d+)?$/;
    if (number === '' || re.test(number)) {
        return number;
    }
    else {
        return number.substring(0, number.length - 1);;
    }
}

export function validateDecimal(number) {

    const re = /^\d+(\.\d+)?$/;
    if (number === '' || re.test(number)) {
        return number;
    }
    else {
        return number.substring(0, number.length - 1);;
    }
}

export function validateEmail(email) {

    var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
    if (filter.test(email))
        return true
    else {
        return false
    }

}