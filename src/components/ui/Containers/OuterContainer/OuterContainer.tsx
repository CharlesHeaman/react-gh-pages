import { ReactNode } from 'react'
import { Helmet } from 'react-helmet'
import Footer from '../../Structure/Footer/Footer'
import styles from './OuterContainer.module.css'
import { useExport } from '../../../../auth/export'

const OuterContainer = (props: {
    title: string,
    id?: string,
    bigID?: boolean,
    maxWidth: Number,
    children: ReactNode,
    headerContent?: ReactNode,
    tabs?: ReactNode,
    navigation?: ReactNode,
    noBorder?: boolean,
    hideHeaderOnPrint?: boolean,
    alerts?: ReactNode,
    description?: string,
}) => {
    const exportFunc = useExport();
    
    return (
        <div 
            style={{ "maxWidth": `${props.maxWidth}px` }}
            className={`${styles['outer-container-wrapper']} ${props.noBorder ? styles['no-border'] : ''} ${props.hideHeaderOnPrint ? styles['hide-header-on-print'] : ''}`}   
        >
            <Helmet>
                <title>{`${props.title} ${props.id ? `#${props.id}` : ''}`}</title>
            </Helmet>
            <div className={styles['outer-container']}
                ref={exportFunc?.targetRef}
            >   
                {props.alerts ? <div className={styles['header-alerts-wrapper']}>
                    {props.alerts}
                </div> : null}
                <div className={`${styles['header']} outer-container-header`}>
                    <div className='header-main-content'>
                        {props.navigation ? <div className={styles['navigation-wrapper']}>
                            {props.navigation}
                        </div> : null}
                        <h1>
                            {props.title}&nbsp;
                            <span style={{ color: 'var(--light-grey-text-color)', fontWeight: 500, fontSize: props.bigID ? '1em' : '0.625em' }}>{props.id ? `#${props.id}` : ''}</span>
                        </h1>
                        {props.description || props.headerContent ? <div  className={styles['header-secondary-content']}>
                            {props.description ? <p className={styles['page-description']}>{props.description}</p> : null}
                            {props.headerContent}
                        </div> : null}
                        {props.tabs ? <div className={styles['tabs-wrapper']}>
                            {props.tabs}
                        </div> : null}
                    </div>
                </div>
                <div className={styles['body']}>
                    {props.children}
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default OuterContainer