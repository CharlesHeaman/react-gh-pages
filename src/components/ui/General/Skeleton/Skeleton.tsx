import styles from './Skeleton.module.css'

function Skeleton(props: {
    type: string,
    align?: string,
    width?: number,
    height?: number,
    marginRight?: boolean,
    grow?: boolean
}) {
    return (
        <div 
            className={`
                ${styles[`skeleton-${props.type}`]} 
                ${props.align ? styles[props.align] : ''}
            `} 
            style={{ 
                width: props.grow ? '100%' : `${props.width}px`, 
                height: `${props.height}px`, 
                marginRight: `${props.marginRight ? 'auto' : ''}`}
            }>
        </div>
    )
}

export default Skeleton