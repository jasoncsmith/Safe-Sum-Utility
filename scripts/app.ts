import { safeSum, safeSubtract, safeProduct } from "./safeSum.ts";
import '../styles/app.scss';

class App {
    private elFormAddition: HTMLFormElement | null = null;
    private elFormMultiplication: HTMLFormElement | null = null;
    
    private elInputAddendOne: HTMLInputElement | null = null;
    private elInputAddendTwo: HTMLInputElement | null = null;
    private elInputFactorOne: HTMLInputElement | null = null;
    private elInputFactorTwo: HTMLInputElement | null = null;

    private elResultAddition: HTMLDivElement | null = null;
    private elResultMultiplication: HTMLDivElement | null = null;
    private elResultAdditionNative: HTMLDivElement | null = null;
    private elResultMultiplicationNative: HTMLDivElement | null = null;
    
    constructor() {
        
    }

    initialize() {
        this.elFormAddition = document.getElementById('form-addition') as HTMLFormElement;
        this.elFormMultiplication = document.getElementById('form-multiplication') as HTMLFormElement;
        this.elInputAddendOne = document.getElementById('input-addend-one') as HTMLInputElement;
        this.elInputAddendTwo = document.getElementById('input-addend-two') as HTMLInputElement;
        this.elInputFactorOne = document.getElementById('input-factor-one') as HTMLInputElement;
        this.elInputFactorTwo = document.getElementById('input-factor-two') as HTMLInputElement;
        this.elResultAddition = document.getElementById('result-addition') as HTMLDivElement;
        this.elResultAdditionNative = document.getElementById('result-addition-native') as HTMLDivElement;
        this.elResultMultiplication = document.getElementById('result-multiplication') as HTMLDivElement;
        this.elResultMultiplicationNative = document.getElementById('result-multiplication-native') as HTMLDivElement;

        if (!this.elFormAddition || !this.elFormMultiplication) {
            throw new Error('Bueler? Bueler?');
        }


        this.elFormAddition.onsubmit = (e: Event): boolean => {
            e.preventDefault();

            const addend1: number = Number(this.elInputAddendOne.value);
            const addend2: number = Number(this.elInputAddendTwo.value);

            this.elResultAddition.innerHTML = String(safeSum(addend1, addend2));
            this.elResultAdditionNative.innerHTML = String(addend1 + addend2);

            return false;
        };

        this.elFormMultiplication.onsubmit = (e: Event): boolean => {
            e.preventDefault();

            const factor1: number = Number(this.elInputFactorOne.value);
            const factor2: number = Number(this.elInputFactorTwo.value);

            this.elResultMultiplication.innerHTML = String(safeProduct(factor1, factor2));
            this.elResultMultiplicationNative.innerHTML = String(factor1 * factor2);

            return false;
        };
    };
}

const app: App = new App();
app.initialize();