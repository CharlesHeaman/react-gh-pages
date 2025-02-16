import styles from './BreadCrumbs.module.css'

function BreadCrumbs(props) {
    return (
        <div className={styles['bread-crumbs']}>
            {props.crumbs.map((item, index) =>
                props.step >= index ? 
                    <>
                        <span 
                            className={props.step === index ? styles['active'] : ''} 
                            onClick={() => props.setStep(index)}
                            key={index}>
                            <a>{item.text}</a>
                        </span>
                        {props.step >= index + 1 ? <span>/</span> : null}
                    </> : null
            )}
        </div>
    )
}

export default BreadCrumbs