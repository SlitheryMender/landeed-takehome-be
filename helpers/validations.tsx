
export const isInteger = (text: string) => {
    return /^-?\d+$/.test(text);
}

export const isFloat = (text: string) => {
    if(!isNaN(parseFloat(text))) {
        // is float    
        return true;
    } else {
        return false;
    }
}