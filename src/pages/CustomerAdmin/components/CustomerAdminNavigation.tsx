import styles from "./CustomerAdminNavigation.module.css"

const CustomerAdminNavigation = (props: {
    location: string
}) => {
    return (
        <div className={styles['navigation']}>
            <nav>
                <ul>
                    <li>
                        <a href="#/customers" className={props.location === 'customers' ? styles['focus'] : ''}>
                            <span className="material-icons">groups</span>
                            Customers
                        </a>
                    </li>
                    <li>
                        <a href="#/sites" className={props.location === 'sites' ? styles['focus'] : ''}>
                            <span className="material-icons">business</span>
                            Sites
                        </a>
                    </li>
                    <li>
                        <a href="#/equipment" className={props.location === 'equipment' ? styles['focus'] : ''}>
                            <span className="material-icons">local_laundry_service</span>
                            Equipment
                        </a>
                    </li>
                    <li>
                        <a href="#/contracts" className={props.location === 'contracts' ? styles['focus'] : ''}>
                            <span className="material-icons">history_edu</span>
                            Contracts
                        </a>
                    </li>
                    <li>
                        <a href="#/contacts" className={props.location === 'contacts' ? styles['focus'] : ''}>
                            <span className="material-icons">contact_phone</span>
                            Contacts
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default CustomerAdminNavigation