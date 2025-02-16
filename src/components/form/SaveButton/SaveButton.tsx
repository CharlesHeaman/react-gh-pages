import styles from '../CreateButton/CreateButton.module.css'

const SaveButton = (props: {
    clickFunc: () => void,
})  => {
    return (
        <button 
            className={`
                ${styles['create-button']} 
            `} 
            type='submit'
            onClick={props.clickFunc}
        >

            <span className='material-icons'>save</span>
            Save Changes
        </button>
    )
}

export default SaveButton