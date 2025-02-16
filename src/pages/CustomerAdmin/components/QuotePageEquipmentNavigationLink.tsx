import { EquipmentResponseData } from "../../../types/equipment.types";
import { QuotedEquipmentResponseData } from "../../../types/quotedEquipment.types";
import QuotedEquipmentStatusLabel from "../../Quotes/components/QuotedEquipmentStatusLabel";
import styles from "./CustomerAdminNavigation.module.css";

const QuotePageEquipmentNavigationLink = (props: {
    quotedEquipment: QuotedEquipmentResponseData,
    currentEquipment: string | null,
    equipment: EquipmentResponseData | undefined,
    updateLocation: (quotedEquipmentID: number | null) => void
}) => {
    return (
        <li>
            <a
                href="#" 
                className={parseInt(props.currentEquipment ? props.currentEquipment : '-1') === props.quotedEquipment.id ? styles['focus'] : ''}
                onClick={(event) => {
                    event.preventDefault()
                    props.updateLocation(props.quotedEquipment.id)
                }}
            >
                <QuotedEquipmentStatusLabel 
                    status={props.quotedEquipment.data.status}
                    noBackground
                    hideText
                />
                {props.equipment ? props.equipment.data.code : 'Unknown'}
            </a>
        </li>
    )
}

export default QuotePageEquipmentNavigationLink