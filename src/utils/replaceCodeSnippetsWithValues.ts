import { CodeSnippet } from "./getAllCodeSnippets";

const replaceCodeSnippetsWithValues = (content: string, codeSnippets: Array<CodeSnippet>): string => {
    let markdown: string = content;
    for (let i = 0; i < codeSnippets.length; i++) {
        let currentSnippet = codeSnippets[i];
        if (currentSnippet.value !== undefined) {
            markdown = markdown.replace(`<code>${currentSnippet.snippet}</code>`, currentSnippet.value);
        }
    }
    return markdown
}

export default replaceCodeSnippetsWithValues