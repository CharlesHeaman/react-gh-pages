import { ChangeEvent, Fragment } from "react"
import CheckboxInput from "../../../../components/form/CheckboxInput/CheckboxInput"
import IntegerInput from "../../../../components/form/IntegerInput/IntegerInput"
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import formatMoney from "../../../../utils/formatMoney"
import getEditQuoteEngineerCount from "../utils/getQuoteEngineerCount"
import getQuoteMateCount from "../utils/getQuoteMateCount"
import reduceEditQuoteLabourHours from "../utils/reduceEditQuoteLabourHours"
import reduceEditQuoteLabourTotal from "../utils/reduceEditQuoteLabourTotal"
import EditEquipmentQuoteLabourRow from "./EditEquipmentQuoteLabourRow"
import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer"
import NoneFound from "../../../../components/ui/General/NoneFound/NoneFound"
import { EditEquipmentQuoteDetails, EditQuoteLabour } from "../../../../types/quotedEquipment.types"

const EditEquipmentQuoteLabour = (props: {
    equipmentQuoteDetails: EditEquipmentQuoteDetails,
    quoteLabour: Array<EditQuoteLabour>,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    updateCheckboxParams: (event: ChangeEvent<HTMLInputElement>) => void,
    updateQuoteLabour: (quoteLabour: EditQuoteLabour | undefined, event: ChangeEvent<HTMLInputElement>) => void,
}) => {
    return (
        <section>
            <h2>Labour</h2>
            <InfoGrid columnCount={4}>
                <GridItem title='No. of Engineers' span={1}>
                    <IntegerInput   
                        name="number_of_engineers"
                        value={props.equipmentQuoteDetails.number_of_engineers} 
                        label={"Number of engineers"} 
                        updateFunc={props.updateParams} 
                        prefixIcon="person"
                        required
                        hasSubmitted={true}
                        maxWidth={65}
                    /> 
                </GridItem>
                <GridItem title='No. of Mates' span={1}>
                    <IntegerInput   
                        name="number_of_mates"
                        value={props.equipmentQuoteDetails.number_of_mates} 
                        label={"Number of mates"} 
                        updateFunc={props.updateParams} 
                        prefixIcon="person_add"
                        required
                        hasSubmitted={true}
                        maxWidth={65}
                    /> 
                </GridItem>
                <GridItem title='Out of Hours' span={1}>
                    <CheckboxInput 
                        name={"is_out_of_hours"} 
                        checked={props.equipmentQuoteDetails.is_out_of_hours} 
                        updateFunc={props.updateCheckboxParams}
                    /> 
                </GridItem>
                <GridItem title='Double Time' span={1}>
                    <CheckboxInput 
                        name={"is_double_time"} 
                        checked={props.equipmentQuoteDetails.is_double_time} 
                        updateFunc={props.updateCheckboxParams}
                    />                     
                </GridItem>
                <GridItem>
                    {(getEditQuoteEngineerCount(props.equipmentQuoteDetails) + getQuoteMateCount(props.equipmentQuoteDetails)) > 0 ? 
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <th>Labour Type</th>
                                    <th>Rate</th>
                                    <th>Total Hours</th>
                                    <th>Total</th>
                                </thead>
                                <tbody>
                                    {[...Array(getEditQuoteEngineerCount(props.equipmentQuoteDetails))].map((_, index) => 
                                        <Fragment key={index}>
                                            <EditEquipmentQuoteLabourRow
                                                quoteLabour={props.quoteLabour[0 + (index * 3)]}
                                                updateQuoteLabour={props.updateQuoteLabour}
                                            />
                                            {props.equipmentQuoteDetails.is_out_of_hours && <EditEquipmentQuoteLabourRow
                                                quoteLabour={props.quoteLabour[1 + (index * 3)]}
                                                updateQuoteLabour={props.updateQuoteLabour}
                                            />}
                                            {props.equipmentQuoteDetails.is_double_time && <EditEquipmentQuoteLabourRow
                                                quoteLabour={props.quoteLabour[2 + (index * 3)]}
                                                updateQuoteLabour={props.updateQuoteLabour}
                                            />}
                                        </Fragment>
                                    )}
                                    {[...Array(getQuoteMateCount(props.equipmentQuoteDetails))].map((_, index) => 
                                        <Fragment key={index}>
                                            <EditEquipmentQuoteLabourRow
                                                quoteLabour={props.quoteLabour[12 + (index * 3)]}
                                                updateQuoteLabour={props.updateQuoteLabour}
                                            />
                                            {props.equipmentQuoteDetails.is_out_of_hours && <EditEquipmentQuoteLabourRow
                                                quoteLabour={props.quoteLabour[13 + (index * 3)]}
                                                updateQuoteLabour={props.updateQuoteLabour}
                                            />}
                                            {props.equipmentQuoteDetails.is_double_time && <EditEquipmentQuoteLabourRow
                                                quoteLabour={props.quoteLabour[14 + (index * 3)]}
                                                updateQuoteLabour={props.updateQuoteLabour}
                                            />}
                                        </Fragment>
                                    )}
                                </tbody>
                                <tfoot>
                                    <td></td>
                                    <td></td>
                                    <th>{reduceEditQuoteLabourHours(props.equipmentQuoteDetails, props.quoteLabour)} hrs</th>
                                    <th>{formatMoney(reduceEditQuoteLabourTotal(props.equipmentQuoteDetails, props.quoteLabour))}</th>
                                </tfoot>
                            </table>
                            </div> :
                        <InnerContainer>
                            <NoneFound
                                iconFont="person"
                                text="No labour found"
                                small
                            />
                        </InnerContainer>
                    }
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default EditEquipmentQuoteLabour