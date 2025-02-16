import formatDate from "./formatDate";
import formatMoney from "./formatMoney";
import getCodeSnippets from "./getCodeSnippets";
import converter from "number-to-words"

export interface CodeSnippet {
    snippet: string,
    value: string | undefined,
    chain: string
}

interface SplitChain {
    key: string | undefined,
    func: string | undefined,
    chain: string
}

const splitSnippetChain = (chain: string): SplitChain => {
    let nextLink: string;
    let remainingChain: string;
    if (chain.split('.').length === 1) {
        nextLink = chain
        remainingChain = '';
    } else {
        nextLink = chain.slice(0, chain.indexOf('.'));
        remainingChain = chain.slice(chain.indexOf('.') + 1);
    }
    if (nextLink.includes('(')) {
        let bracketDepth = 0;
        let closeBracketIndex = chain.indexOf(')');
        for (let characterIndex = chain.indexOf('('); characterIndex < chain.length; characterIndex++) {
            let currentCharacter = chain[characterIndex];
            if (currentCharacter === '(') {
                bracketDepth++;
            } else if (currentCharacter === ')') {
                bracketDepth--;
            }
            if (bracketDepth === 0) {
                closeBracketIndex = characterIndex;
                break;
            }
        }
        
        nextLink = chain.slice(0, closeBracketIndex + 1);
        remainingChain = chain.slice(closeBracketIndex + 1);
        if (remainingChain[0] === '.') {
            remainingChain = remainingChain.slice(1);
        }
        return {
            key: undefined,
            chain: remainingChain,
            func: nextLink
        }
    }
    return {
        key: nextLink,
        chain: remainingChain,
        func: undefined
    }
}

const canContinueNavigation = (codeSnippet: CodeSnippet): boolean => {
    return (codeSnippet.value !== undefined && codeSnippet.chain.length > 0)
}

const getNextValue = (currentValue: any, key: string) => {
    return currentValue && currentValue[key];
}

const isTernaryOperation = (currentExpression: string) => {
    return currentExpression.includes(' ? ') && currentExpression.includes(' : ')
}

const performMap = (valueArray: Array<any>, func: string): Array<string> => {
    let currentValue;
    const valueRef: string = func.split(' => ')[0];
    const expressions: Array<string> = func.split(' => ')[1].split(' + ');
    let newValueArray: Array<string> = [];
    for (let valueIndex = 0; valueIndex < valueArray.length; valueIndex++) {
        currentValue = valueArray[valueIndex];
        let returnString = '';
        for (let expressionIndex = 0; expressionIndex < expressions.length; expressionIndex++) {
            let currentExpression = expressions[expressionIndex];
            // is string 
            if (currentExpression[0] === "'" && currentExpression[currentExpression.length -1] === "'") {
                returnString += currentExpression.slice(1).slice(0, -1)
            } else {
                // if ternary operation
                if (isTernaryOperation(currentExpression)) {
                    const check = currentExpression.split(' ? ')[0];
                    const results = currentExpression.split(' ? ')[1].split(' : ');
                    let currentSnippet = {
                        snippet: check,
                        value: undefined,
                        chain: check
                    }
                    let associatedData = {
                        [valueRef]: currentValue
                    }
                    let checkValue = navigateSnippetChain(currentSnippet, associatedData).value;
                    returnString += checkValue ? results[0].slice(1).slice(0, -1) : results[1].slice(1).slice(0, -1);
                // if multiplication
                } else if (currentExpression.includes(' * ')) {
                    const values = currentExpression.split(' * ');
                    let firstSnippet = {
                        snippet: values[0],
                        value: undefined,
                        chain: values[0]
                    }
                    let secondSnippet = {
                        snippet: values[1],
                        value: undefined,
                        chain: values[1]
                    }
                    let associatedData = {
                        [valueRef]: currentValue
                    }
                    let firstValue = navigateSnippetChain(firstSnippet, associatedData).value;
                    let secondValue = navigateSnippetChain(secondSnippet, associatedData).value;
                    if (firstValue && secondValue) {
                        returnString += parseFloat(firstValue) * parseFloat(secondValue);
                    }
                } else {
                    let currentSnippet = {
                        snippet: currentExpression,
                        value: undefined,
                        chain: currentExpression
                    }
                    let associatedData = {
                        [valueRef]: currentValue
                    }
                    let returnValue = navigateSnippetChain(currentSnippet, associatedData).value;
                    returnString += returnValue ? returnValue : '';
                }
            }
        }
        newValueArray.push(returnString);
    }
    return newValueArray
}

const performFormatMarkdown = (currentValue: any): string => {
    return `\n\n${currentValue}\n\n`;
}

const performFormatDate = (currentValue: any): string => {
    return formatDate(currentValue, true);
}

const performFormatMoney = (currentValue: any): string => {
    return formatMoney(currentValue);
}

const performNumberToWords = (currentValue: any): string => {
    return converter.toWords(currentValue);
}

const performJoin = (currentValue: any, func: string): string => {
    const joiner = func.slice(1, -1);
    return currentValue.join(joiner)
}

const performFunc = (currentValue: any, func: string): string | Array<string> => {
    const funcName = func.slice(0, func.indexOf('('));
    switch (funcName) {
        case 'formatMarkdown':
            return performFormatMarkdown(currentValue);
        case 'formatDate':
            return performFormatDate(currentValue);
        case 'formatMoney':
            return performFormatMoney(currentValue);
        case 'numberToWords':
            return performNumberToWords(currentValue);
        case 'map':
            return performMap(currentValue, func.slice(func.indexOf('(') + 1).slice(0, -1))
        case 'join':
            return performJoin(currentValue, func.slice(func.indexOf('(') + 1).slice(0, -1))
        default:
            return currentValue
    }
}

const navigateSnippetChain = (codeSnippet: CodeSnippet, associatedSnippetData: any | undefined): CodeSnippet => {
    let value: any | Array<any>;
    const splitChain: SplitChain = splitSnippetChain(codeSnippet.chain);
    if (splitChain.key !== undefined) {
        value = getNextValue(associatedSnippetData ? associatedSnippetData : codeSnippet.value, splitChain.key)
    }
    if (splitChain.func !== undefined) {
        value = performFunc(codeSnippet.value, splitChain.func);
    }
    const remainingChain: string = splitChain.chain;
    let currentSnippet = {
        ...codeSnippet,
        value: value,
        chain: remainingChain
    }
    if (canContinueNavigation(currentSnippet)) {
        currentSnippet = navigateSnippetChain(currentSnippet, undefined);
    }
    return currentSnippet
}

const getSnippetValues = (codeSnippets: Array<CodeSnippet>, associatedSnippetData: any): Array<CodeSnippet> => {
    return codeSnippets.map(codeSnippet => {
        return navigateSnippetChain(codeSnippet, associatedSnippetData)
    })
}

const getAllCodeSnippets = (content: string, associatedSnippetData: any) => {
    return getSnippetValues(getCodeSnippets(content), associatedSnippetData)
}

export default getAllCodeSnippets
