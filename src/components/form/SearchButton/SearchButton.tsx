import styles from '../CreateButton/CreateButton.module.css'

const SearchButton = (props: {
    text: string,
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

            <span className='material-icons'>search</span>
            {props.text}
        </button>
    )
}

export default SearchButton