import DisabledLabel from "../../../components/ui/DisabledLabel/DisabledLabel"
import getDepartmentURL from "./utils/getDepartmentURL"

const DepartmentLink = (props: {
    departmentID: number,
    name: string,
    inactive?: boolean,
}) => {
    return (
        <a 
            href={getDepartmentURL(props.departmentID)}
            className="icon-link"
        >
            {!props.inactive ?
                <span className="material-icons">dashboard</span> :
                <DisabledLabel hideText/>
            }  
            <span>{props.name}</span>
        </a>
    )
}

export default DepartmentLink