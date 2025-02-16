import styles from "./../../CustomerAdmin/components/CustomerAdminNavigation.module.css"

const BottleAdminNavigation = (props: {
    location: string
}) => {
    return (
        <div className={styles['navigation']}>
            <nav>
                <ul>
                    <li>
                        <a href="#/refrigerant_bottles" className={props.location === 'refrigerant' ? styles['focus'] : ''}>
                            <span className="material-icons">propane</span>
                            Refrigerant
                        </a>
                    </li>
                    <li>
                        <a href="#/gas_air_bottles" className={props.location === 'gas_air' ? styles['focus'] : ''}>
                            <span className="material-icons">co2</span>
                            Gas/Air
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default BottleAdminNavigation