import styles from './CreateButton.module.css'

const CreateButton = (props: {
    text: string,
    to: string,
    collection?: boolean,
    iconFont?: string,
}) => {
    return (
        <a 
            href={`/#/${props.to}`}
            className={`
                ${styles['create-button']} 
            `} 
            type='button'
        >
            <span className='material-icons'>{!props.iconFont ? !props.collection ? 'add' : 'playlist_add' : props.iconFont}</span>
            {props.text}
        </a>
    )
}

export default CreateButton