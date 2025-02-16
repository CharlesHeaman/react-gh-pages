import BooleanLabel from "../../../../../components/ui/BooleanLabel/BooleanLabel";
import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import DepartmentLabel from "../../../../../components/ui/Department/DepartmentLabel";
import ExpiryDateLabel from "../../../../../components/ui/ExpiryDateLabel/ExpiryDateLabel";
import Label from "../../../../../components/ui/General/Label/Label";
import { Contract } from "../../../../../types/contract.types";
import { DepartmentResponseData } from "../../../../../types/department.types";
import formatMoney from "../../../../../utils/formatMoney";

const ContractInformationDetails = (props: {
    contractData: Contract,
    department: DepartmentResponseData,
    isPreview?: boolean
}) => {
    return (
        <section>
            <h2>Contract Details</h2>
            <InfoGrid>
                {props.isPreview && <GridItem title='Reference Number' span={4}>
                    <p><span style={{ fontSize: '1.75em', fontWeight: '600'}}>#{props.contractData.reference_number.toLocaleUpperCase()}</span></p>
                </GridItem>}
                <GridItem title="Contract Value">
                    <p><span style={{ fontSize: '1.75em', fontWeight: '600'}}>{formatMoney(props.contractData.contract_value)}</span><span style={{ fontSize: '1.5em'}}> ({props.contractData.service_per_year} visits @ {formatMoney(props.contractData.contract_value / props.contractData.service_per_year)})</span></p>
                </GridItem>
                <GridItem title='Department' span={2}>
                    <DepartmentLabel department={props.department}/>
                </GridItem>
                <GridItem title='Type' span={4}>
                    {props.contractData.invoice_type === 2 ? 
                        <Label 
                            text='A-Type'
                            color="dark-blue"
                            iconFont="history_edu"
                        /> : 
                        <Label
                            text="B-Type"
                            color="purple"
                            iconFont="history_edu"
                        />
                    }
                </GridItem>
                <GridItem title='Contract Start' span={2}>
                    <p><ExpiryDateLabel date={props.contractData.start_at} startDate/></p>
                </GridItem>
                <GridItem title='Contract End' span={2}>
                    <p><ExpiryDateLabel date={props.contractData.end_at}/></p>
                </GridItem>
                <GridItem title='Fixed Three Year' span={2}>
                    <BooleanLabel true={props.contractData.is_fixed_three_year}/>
                </GridItem>
                <GridItem title='Notes'>
                    <p>{props.contractData.notes ? props.contractData.notes : 'None'}</p>
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default ContractInformationDetails;