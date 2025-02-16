import styles from "./../../../CustomerAdmin/components/CustomerAdminNavigation.module.css"

const PlantToolsNavigation = (props: {
    location: string
}) => {
    return (
        <div className={styles['navigation']}>
            <nav>
                <ul>
                    <li>
                        <a href="#/plant_and_equipment" className={props.location === 'all' ? styles['focus'] : ''}>
                            <span className="material-icons">handyman</span>
                            All Plant/Tools
                        </a>
                    </li>
                    <li>
                        <a href="#/plant_and_equipment/pa_testing" className={props.location === 'pat' ? styles['focus'] : ''}>
                            <span className="material-icons">domain_verification</span>
                            PA Testing
                        </a>
                    </li>
                    <li>
                        <a href="#/plant_and_equipment/calibration" className={props.location === 'calibration' ? styles['focus'] : ''}>
                            <span className="material-icons">compass_calibration</span>
                            Calibration
                        </a>
                    </li>
                    <li>
                        <a href="#/plant_and_equipment/inspection" className={props.location === 'inspection' ? styles['focus'] : ''}>
                            <span className="material-icons">assignment_turned_in</span>
                            Inspection
                        </a>
                    </li>
                    <li>
                        <a href="#/plant_and_equipment/maintenance" className={props.location === 'maintenance' ? styles['focus'] : ''}>
                            <span className="material-icons">home_repair_service</span>
                            Maintenance
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default PlantToolsNavigation