import styles from '../CreateButton/CreateButton.module.css'

const ShowCreateButton = (props: {
    text: string,
    clickFunc: () => void,
    isUpload?: boolean,
    iconFont?: string,
}) => {
    return (
        <button 
            className={`
                ${styles['create-button']} 
            `} 
            type='button'
            onClick={props.clickFunc}
        >
            <span className='material-icons'>{!props.iconFont ? !props.isUpload ? 'add' : 'file_upload' : props.iconFont}</span>
            {props.text}
        </button>
    )
}

export default ShowCreateButton