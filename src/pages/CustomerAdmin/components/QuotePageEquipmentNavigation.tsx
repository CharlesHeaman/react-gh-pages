import { useSearchParams } from "react-router-dom";
import { EquipmentResponseData } from "../../../types/equipment.types";
import { QuotedEquipmentResponseData } from "../../../types/quotedEquipment.types";
import findEquipment from "../../../utils/findEquipment";
import styles from "./CustomerAdminNavigation.module.css";
import QuotePageEquipmentNavigationLink from "./QuotePageEquipmentNavigationLink";
import Skeleton from "../../../components/ui/General/Skeleton/Skeleton";

const QuotePageEquipmentNavigation = (props: {
    quotedEquipment: Array<QuotedEquipmentResponseData>,
    equipment: Array<EquipmentResponseData>,
    isLoading: boolean,
}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const currentEquipment = searchParams.get('quoted_equipment_id');

    const updateLocation = (quotedEquipmentID: number | null) => {
        if (quotedEquipmentID) {
            searchParams.set('quoted_equipment_id', quotedEquipmentID.toString());
        } else {
            searchParams.delete('quoted_equipment_id');
        }
        setSearchParams(searchParams);
    } 

    return (
        <div className={styles['navigation']}>
            <nav>
                <ul>
                    {!props.isLoading ? <>
                        <li>
                            <a 
                                href="#" 
                                className={currentEquipment === null ? styles['focus'] : ''}
                                onClick={(event) => {
                                    event.preventDefault()
                                    updateLocation(null)
                                }}
                                >
                                <span className="material-icons">request_quote</span>
                                Home Page
                            </a>
                        </li>
                        {props.quotedEquipment.map((quotedEquipment, index) =>
                            <QuotePageEquipmentNavigationLink
                                quotedEquipment={quotedEquipment}
                                currentEquipment={currentEquipment}
                                equipment={quotedEquipment.data.equipment_id ? findEquipment(props.equipment, quotedEquipment.data.equipment_id) : undefined}
                                updateLocation={updateLocation}
                                key={index}
                            />
                        )}
                    </> :
                    [...Array(3)].map((_, index) => 
                        <li key={index}>
                            <Skeleton type="navigation-tab"/>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    )
}

export default QuotePageEquipmentNavigation