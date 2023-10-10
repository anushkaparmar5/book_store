export function titleCase(str) {
    return str
        .toLowerCase()
        .split(' ')
        .map(function (word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
}

export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}