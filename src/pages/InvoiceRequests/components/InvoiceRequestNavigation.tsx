import styles from "../../CustomerAdmin/components/CustomerAdminNavigation.module.css"

const InvoiceRequestNavigation = (props: {
    location: string
}) => {
    return (
        <div className={styles['navigation']}>
            <nav>
                <ul>
                    <li>
                        <a href="#/ticket_invoice_requests" className={props.location === 'tickets' ? styles['focus'] : ''}>
                            <span className="material-icons">confirmation_number</span>
                            Ticket Invoice Requests
                        </a>
                    </li>
                    <li>
                        <a href="#/job_invoice_requests" className={props.location === 'jobs' ? styles['focus'] : ''}>
                            <span className="material-icons">dataset_linked</span>
                            Job Invoice Requests
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default InvoiceRequestNavigation