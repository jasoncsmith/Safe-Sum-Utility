var utils = {
    // based on the research featured in this article:
    // http://adripofjavascript.com/blog/drips/avoiding-problems-with-decimal-math-in-javascript.html

    safeSum: function (num1, num2) {
        if (typeof num1 !== 'number' || typeof num2 !== 'number') {
            throw new Error('arguments must be numbers.')
        }

        var numParts1 = String(num1).split('.');
        var numParts2 = String(num2).split('.');
        var fractionalPart1 = numParts1[1] || '';
        var fractionalPart2 = numParts2[1] || '';
        var integerPart1 = numParts1[0];
        var integerPart2 = numParts2[0];

        var precisionLength1 = fractionalPart1.length;
        var precisionLength2 = fractionalPart2.length;
        var isPrecisionTheSame = precisionLength1 === precisionLength2;
        var lengthLongestPrecision = Math.max(...[precisionLength1, precisionLength2]);

        var intNoDecimal1 = Number(String(num1).replace('.', '')); // this removes leading zeroes in 0.2 -> '02'
        var intNoDecimal2 = Number(String(num2).replace('.', '')); // same

        var operand1 = null;
        var operand2 = null;

        if (!isPrecisionTheSame) {

            let numberToAddZeroesTo = '';

            if (lengthLongestPrecision === precisionLength1) {

                operand1 = intNoDecimal1;
                operand2 = integerPart2;
                numberToAddZeroesTo = fractionalPart2;

            } else if (lengthLongestPrecision === precisionLength2) {

                operand1 = intNoDecimal2;
                operand2 = integerPart1;
                numberToAddZeroesTo = fractionalPart1;

            }

            for (let i = 0, len = Math.abs(precisionLength1 - precisionLength2); i < len; i++) {
                numberToAddZeroesTo = numberToAddZeroesTo + '0';
            }

            operand2 = Number([operand2, numberToAddZeroesTo].join(''));

        } else {

            operand1 = intNoDecimal1;
            operand2 = intNoDecimal2;

        }

        var result = operand1 + operand2;
        var isResultNegative = result < 0;
        var resultString = String(result);

        if (isResultNegative) {
            // REMOVE THE NEGATIVE SIGN TO GET AN ACCURATE STRING LENGTH COUNT
            resultString = resultString.replace('-', '');
        }

        var arrNumberString = String(resultString).split('');
        var insertIndex = resultString.length - lengthLongestPrecision;

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
            arrNumberString.unshift('-')
        }

        return Number(arrNumberString.join(''));
    },
    safeSubtract: function (num1, num2) {
        if (typeof num1 !== 'number' || typeof num2 !== 'number') {
            throw new Error('arguments must be numbers.')
        }

        return utils.numbers.safeSum(num1, num2 * -1);
    },

    safeProduct: function (num1, num2) {
        var numParts1 = String(num1).split('.');
        var numParts2 = String(num2).split('.');
        var fractionalPart1 = numParts1[1] || '';
        var fractionalPart2 = numParts2[1] || '';

        var precisionLength1 = fractionalPart1.length;
        var precisionLength2 = fractionalPart2.length;

        var intNoDecimal1 = Number(String(num1).replace('.', '')); // this removes leading zeroes in 0.2 -> '02'
        var intNoDecimal2 = Number(String(num2).replace('.', '')); // same

        var operand1 = intNoDecimal1;
        var operand2 = intNoDecimal2;

        var result = operand1 * operand2;
        var isResultNegative = result < 0;
        var resultString = String(result);
        var insertIndex = resultString.length - (precisionLength1 + precisionLength2);


        if (precisionLength1 + precisionLength2 > 6) {
            throw new Error('This exceeds allowed precision.')
        }

        if (isResultNegative) {
            // REMOVE THE NEGATIVE SIGN TO GET AN ACCURATE STRING LENGTH COUNT
            resultString = resultString.replace('-', '');
        }

        var arrNumberString = String(resultString).split('');

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
            // INCLUDE THE NEGATIVE SIGN IF NEEDED
            arrNumberString.unshift('-')
        }

        return Number(arrNumberString.join(''));
    }
};
export default utils;