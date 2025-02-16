import styles from "../../../CustomerAdmin/components/CustomerAdminNavigation.module.css"

const SupplierManufacturerNavigation = (props: {
    location: string
}) => {
    return (
        <div className={styles['navigation']}>
            <nav>
                <ul>
                    <li>
                        <a href="#/suppliers_manufacturers" className={props.location === 'suppliers_manufacturers' ? styles['focus'] : ''}>
                            <span className="material-icons">warehouse</span>
                            Suppliers/Manufacturers
                        </a>
                    </li>
                    <li>
                        <a href="#/supplier_contacts" className={props.location === 'supplier_contacts' ? styles['focus'] : ''}>
                            <span className="material-icons">contact_phone</span>
                            Contacts
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default SupplierManufacturerNavigation