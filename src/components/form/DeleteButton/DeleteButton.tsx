import styles from './DeleteButton.module.css'

const DeleteButton = (props: {
    text: string,
    clickFunc: () => void,
    submitting?: boolean,
    submittingText?: string,
})  => {
    return (
        <button 
            className={`
                ${styles['delete-button']} 
            `} 
            type='submit'
            onClick={props.clickFunc}
            disabled={props.submitting}
        >

            <span className='material-icons'>delete</span>
            {!props.submitting ? 
                props.text : 
                (props.submittingText ? 
                    props.submittingText : 
                    'Submitting...'
                )
            }
        </button>
    )
}

export default DeleteButton