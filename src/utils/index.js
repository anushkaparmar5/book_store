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

export function calculateDiscountedPrice(originalPrice, discountPercentage) {
    if (discountPercentage < 0 || discountPercentage > 100) {
        throw new Error("Discount percentage must be between 0 and 100");
    }

    const discountAmount = (discountPercentage / 100) * originalPrice;
    const discountedPrice = originalPrice - discountAmount;

    return discountedPrice;
}
