import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import styles from './MarkdownDisplay.module.css';


const MarkdownDisplay = (props: {
    markdown: string,
    isPrint?: boolean
}) => {
    return (
        <div className={`${styles['html-wrapper']} ${props.isPrint ? styles['print'] : ''}`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {props.markdown.length > 0 ?
                    props.markdown :
                    "Nothing to display."
                }
            </ReactMarkdown>
        </div>
    )
}

export default MarkdownDisplay