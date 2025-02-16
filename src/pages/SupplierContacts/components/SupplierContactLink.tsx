import DisabledLabel from "../../../components/ui/DisabledLabel/DisabledLabel"
import getSupplierContactURL from "../utils/getSupplierContactURL"

const SupplierContactLink = (props: {
    supplierContactID: number,
    name: string,
    inactive?: boolean,
}) => {
    return (
        <a 
            href={getSupplierContactURL(props.supplierContactID)}
            className="icon-link"
        >
            {!props.inactive ?
                <span className="material-icons">contact_phone</span> :
                <DisabledLabel hideText/>
            }   
            <span>{props.name}</span>
        </a>
    )
}

export default SupplierContactLink