import styles from './Footer.module.css'

const Footer = () => {
    return (
        <div id={styles['footer']}>
            <nav>
                <ul>
                    <li>
                        <a href={process.env.REACT_APP_MOBILE_CLIENT_URL}>Mobile Client</a>
                    </li>
                    <li>
                        <a href={`${process.env.REACT_APP_MOBILE_CLIENT_URL}/docs.html`}>Mobile Docs</a>
                    </li>
                    <li>
                        <a href={`${process.env.REACT_APP_ADMIN_CLIENT_URL}/docs.html`}>Admin Docs</a>
                    </li>
                    <li>
                        <a href={`${process.env.REACT_APP_API_URL}/docs.html`}>API Docs</a>
                    </li>
                    <li>
                        <a href={`mailto: ${process.env.REACT_APP_DEV_EMAIL}`}>Contact Dev Team</a>
                    </li>
                    <li>
                        <a href={`${process.env.REACT_APP_ADMIN_CLIENT_URL}/#/changelog`}>Changelog</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Footer