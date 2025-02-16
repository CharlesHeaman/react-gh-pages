import DisabledLabel from "../../../../components/ui/DisabledLabel/DisabledLabel"
import getCostCentreURL from "../../utils/getCostsCentreURL"

const CostCentreLink = (props: {
    costCentreID: number,
    name: string,
    inactive?: boolean,
}) => {
    return (
        <a 
            href={getCostCentreURL(props.costCentreID)}
            className="icon-link"
        >
            {!props.inactive ?
                <span className="material-icons">point_of_sale</span>:
                <DisabledLabel hideText/>
            }   
            <span>{props.name}</span>
        </a>
    )
}

export default CostCentreLink