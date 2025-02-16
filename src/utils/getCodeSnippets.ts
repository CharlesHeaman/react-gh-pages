import { CodeSnippet } from "./getAllCodeSnippets";

const getCodeSnippets = (content: string): Array<CodeSnippet> => {
    const openTags = content.split('<code>');
    let codeSnippets: Array<CodeSnippet> = []
    for (let i = 1; i < openTags?.length; i++) {
        let snippetText = openTags[i].split('</code>')[0]
        codeSnippets.push({
            snippet: snippetText,
            value: undefined,
            chain: snippetText
        })
    }
    return codeSnippets
}

export default getCodeSnippets