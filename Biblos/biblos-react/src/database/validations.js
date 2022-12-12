
// Error Messages
/**Array of values to specify is not contain values*/
export const MESSAGE_NO_VALUES = (...values) => {
    return values.join(',').concat(' debe contener valores.');
}

export const isEquals = (a,b) => {
    return a === b;
}

export const isNotEquals = (a,b) => {
    return !isEquals(a,b);
}
