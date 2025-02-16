import { useState } from 'react';
import styles from './CopyText.module.css'

const CopyText = (props: {
    text: string
}) => {
    const [clicked, setClicked] = useState(false);
    return (
        <button 
            className={`${styles['copy-button']} ${clicked ? styles['clicked'] : ''}`}
            onClick={() => {
                setClicked(true);
                navigator.clipboard.writeText(props.text);
                setTimeout(() => {
                    setClicked(false);
                }, 2000)
            }}
        >
            <span className="material-icons">{clicked ? 'done' : 'content_copy'}</span>
        </button>
    )
}

export default CopyText