import { DepartmentResponseData } from "../../../types/department.types"
import { TicketResponseData } from "../../../types/tickets.types"
import getYearRelativeDate from "../../../utils/getYearRelativeDate"
import filterYearStartContracts from "../utils/filterYearStartContracts"
import CalloutPerformanceRowYear from "./CalloutPerformanceRowYear"
import reduceContractValue from "./../utils/reduceContractValue"
import formatMoney from "./../../../utils/formatMoney"

const ContractValueRowYear = (props: {
    contracts: Array<ContractResponseData>
}) => {
    return (
        <>
            {formatMoney(reduceContractValue(props.contracts))} ({props.contracts.length})
        </>
    )
}

export default ContractValueRowYear