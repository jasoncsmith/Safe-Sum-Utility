# safeSum
A javaScript utility that will add/subtract floating point numbers without causing a repeating decimal found in native javascript operations.

## Example
Native javascript: 0.1 + 0.2 = 0.30000000000000004  
Safe Sum Utility: 0.1 + 0.2 = 0.3

## To View Demo
Click the link: https://jasoncsmith.github.io/Safe-Sum-Utility/

## How I did it
Convert the floating points to integers by removing the decimal, align the 2 addends by adding zeroes to one of the addends, add the numbers, finally insert the decimal point based on the precision found. The repeating decimal is not introduced when adding integers.

## Inspired By
The following article that outlines the limitation of javaScript when adding/subtracting floating point numbers:
http://adripofjavascript.com/blog/drips/avoiding-problems-with-decimal-math-in-javascript.html

