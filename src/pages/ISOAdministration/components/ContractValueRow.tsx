import { DepartmentResponseData } from "../../../types/department.types"
import { TicketResponseData } from "../../../types/tickets.types"
import getYearRelativeDate from "../../../utils/getYearRelativeDate"
import filterYearStartContracts from "../utils/filterYearStartContracts"
import CalloutPerformanceRowYear from "./CalloutPerformanceRowYear"
import ContractValueRowYear from "./ContractValueRowYear"

const ContractValueRow = (props: {
    department: DepartmentResponseData,
    contracts: Array<ContractResponseData>
}) => {
    return (
        <tr>
            <td>{props.department.data.name}</td>
            <td>
                <ContractValueRowYear
                    contracts={filterYearStartContracts(props.contracts, getYearRelativeDate(new Date(), -3).getFullYear())}
                />
            </td>
            <td>
                <ContractValueRowYear
                    contracts={filterYearStartContracts(props.contracts, getYearRelativeDate(new Date(), -2).getFullYear())}
                />
            </td>
            <td>
                <ContractValueRowYear
                    contracts={filterYearStartContracts(props.contracts, getYearRelativeDate(new Date(), -1).getFullYear())}
                />
            </td>
        </tr>
    )
}

export default ContractValueRow