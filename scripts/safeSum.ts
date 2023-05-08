// This custom utility is based on the research featured in 
// this article:
// http://adripofjavascript.com/blog/drips/avoiding-problems-with-decimal-math-in-javascript.html

export function safeSum(num1: number, num2: number): number {
    
    if (isNaN(num1) || isNaN(num2)) {
        alert('Entries must be numbers.');
        return 0;
    }

    const numParts1: Array<string> = String(num1).split('.');
    const numParts2: Array<string> = String(num2).split('.');
    const fractionalPart1: string = numParts1[1] || '';
    const fractionalPart2: string = numParts2[1] || '';
    const integerPart1: string = numParts1[0];
    const integerPart2: string = numParts2[0];

    const precisionLength1: number = fractionalPart1.length;
    const precisionLength2: number = fractionalPart2.length;
    const lengthLongestPrecision: number = Math.max(precisionLength1, precisionLength2);

    const intNoDecimal1: number = Number(String(num1).replace('.', '')); // this removes leading zeroes in 0.2 -> '02'
    const intNoDecimal2: number = Number(String(num2).replace('.', '')); // same

    let addend1: number = null;
    let addend2: number | string = null;// COMBAK, make sure always number

    if (precisionLength1 !== precisionLength2) {
        // Flip equation based on precision length
        let sFractionalPartWithAppendedZeroes: string = '';

        if (lengthLongestPrecision === precisionLength1) {

            addend1 = intNoDecimal1;
            addend2 = integerPart2;
            sFractionalPartWithAppendedZeroes = fractionalPart2;

        } else if (lengthLongestPrecision === precisionLength2) {

            addend1 = intNoDecimal2;
            addend2 = integerPart1;
            sFractionalPartWithAppendedZeroes = fractionalPart1;
            
        }

        for (let i = 0, len = Math.abs(precisionLength1 - precisionLength2); i < len; i++) {
            sFractionalPartWithAppendedZeroes = sFractionalPartWithAppendedZeroes + '0';
        }

        addend2 = Number(`${addend2}${sFractionalPartWithAppendedZeroes}`);

    } else {

        addend1 = intNoDecimal1;
        addend2 = intNoDecimal2;

    }

    const result: number = addend1 + addend2;
    const isResultNegative: boolean = result < 0;
    let resultString: string = String(result);

    if (isResultNegative) {
        // REMOVE THE NEGATIVE SIGN TO GET AN ACCURATE STRING LENGTH COUNT
        resultString = resultString.replace('-', '');
    }

    const arrNumberString: Array<string> = String(resultString).split('');
    const insertIndex: number = resultString.length - lengthLongestPrecision;

    if (insertIndex < 0) {
        // ADD LEADING ZEROS TO MATCH PRECISION
        for (let i = 0, len = Math.abs(insertIndex); i < len; i++) {
            arrNumberString.unshift('0');
        }

        // INSERT INDEX CANNOT BE NEGATIVE
        arrNumberString.splice(0, 0, '.');
    } else {
        arrNumberString.splice(insertIndex, 0, '.');
    }

    if (isResultNegative) {
        // INCLUDE THE NEGATIVE SIGN IF NEEDED
        arrNumberString.unshift('-');
    }

    return Number(arrNumberString.join(''));
}

export function safeSubtract(num1: number, num2: number): number {
    if (isNaN(num1) || isNaN(num2)) {
        alert('Entries must be numbers.');
        return 0;
    }

    return safeSum(num1, num2 * -1);
}

export function safeProduct(num1: number, num2: number): number {
    if (isNaN(num1) || isNaN(num2)) {
        alert('Entries must be numbers.');
        return 0;
    }

    const numParts1: Array<string> = String(num1).split('.');
    const numParts2: Array<string> = String(num2).split('.');
    const fractionalPart1: string = numParts1[1] || '';
    const fractionalPart2: string = numParts2[1] || '';

    // console.log([...numParts1, ...numParts2].join('').length);
    // console.log([...numParts1, ...numParts2].join(''));
    
    if ([...numParts1, ...numParts2].join('').length > 22) {
        // .23424 will insert a zero 0.23424 which becomes 023424
        // adding more than 22 integers causes
        // answer to go into expanded form triggering NaN
        alert(`Combined entries cannot exceed 22 digits. Entered: ${[...numParts1, ...numParts2].join('').length}`);
        return 0;
    }
    
    const precisionLength1: number = fractionalPart1.length;
    const precisionLength2: number = fractionalPart2.length;

    const intNoDecimal1: number = Number(String(num1).replace('.', '')); // this removes leading zeroes in 0.2 -> '02'
    const intNoDecimal2: number = Number(String(num2).replace('.', '')); // same

    const factor1: number = intNoDecimal1;
    const factor2: number = intNoDecimal2;

    const result: number = factor1 * factor2;
    const isResultNegative: boolean = result < 0;

    let resultString: string = String(result);
    const insertIndex: number = resultString.length - (precisionLength1 + precisionLength2);

    if (isResultNegative) {
        // REMOVE THE NEGATIVE SIGN TO GET AN ACCURATE STRING LENGTH COUNT
        resultString = resultString.replace('-', '');
    }

    const arrNumberString: Array<string> = String(resultString).split('');

    if (insertIndex < 0) {
        // ADD LEADING ZEROS TO MATCH PRECISION
        // INSERT INDEX CANNOT BE NEGATIVE, OR ELSE COUNTS BACKWARDS FROM LENGTH
        for (let i = 0, len = Math.abs(insertIndex); i < len; i++) {
            arrNumberString.unshift('0');
        }

        arrNumberString.splice(0, 0, '.');
    } else {
        arrNumberString.splice(insertIndex, 0, '.');
    }

    if (isResultNegative) {
        // REPLACE THE NEGATIVE SIGN AS NEEDED
        arrNumberString.unshift('-');
    }

    return Number(arrNumberString.join(''));
}