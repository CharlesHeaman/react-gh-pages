import styles from "./ComparisonBoxSkeleton.module.css"

const ComparisonBoxSkeleton = (props: {
    height?: number
}) => {
    return (
        <div 
            className={styles['comparison-box']}
            style={{ 
                height: `${props.height}px`, 
            }}
        ></div>
    )
}

export default ComparisonBoxSkeleton