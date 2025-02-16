import { CodeSnippet } from './getAllCodeSnippets';

const escapeHTML = (codeSnippet: CodeSnippet): CodeSnippet => {
    return {
        ...codeSnippet,
        value: `<code>${codeSnippet.snippet.replaceAll('<', '\\<')}</code>`
    }
}

const escapeCodeSnippetHTML = (codeSnippets: Array<CodeSnippet>): Array<CodeSnippet> => {
    return codeSnippets.map(codeSnippet => {
        return escapeHTML(codeSnippet)
    })
}

export default escapeCodeSnippetHTML