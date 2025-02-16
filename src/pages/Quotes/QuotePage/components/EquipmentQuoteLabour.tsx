import { Fragment } from "react"
import BooleanLabel from "../../../../components/ui/BooleanLabel/BooleanLabel"
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer"
import NoneFound from "../../../../components/ui/General/NoneFound/NoneFound"
import { QuotedEquipmentResponseData } from "../../../../types/quotedEquipment.types"
import formatMoney from "../../../../utils/formatMoney"
import getQuotedEquipmentLabourRate from "../utils/getDepartmentLabourRate"
import reduceQuoteLabourHours from "../utils/reduceQuoteLabourHours"
import reduceQuoteLabourTotal from "../utils/reduceQuoteLabourTotal"
import EquipmentQuoteLabourRow from "./EquipmentQuoteLabourRow"
import { QuotedSiteResponseData } from "../../../../types/quotedSites.types"

const EquipmentQuoteLabour = (props: {
    equipmentQuoteDetails: QuotedEquipmentResponseData | QuotedSiteResponseData,
}) => {
    return (
        <section>
            <h2>Labour</h2>
            <InfoGrid columnCount={4}>
                <GridItem title='No. of Engineers' span={1}>
                    <div className="flex">
                        <span className="material-icons">person</span>
                        {props.equipmentQuoteDetails.data.number_of_engineers}
                    </div>
                </GridItem>
                <GridItem title='No. of Mates' span={1}>
                    <div className="flex">
                        <span className="material-icons">person_add</span>
                        {props.equipmentQuoteDetails.data.number_of_mates}
                    </div>
                </GridItem>
                <GridItem title='Out of Hours' span={1}>
                    <BooleanLabel true={props.equipmentQuoteDetails.data.is_out_of_hours}/>
                </GridItem>
                <GridItem title='Double Time' span={1}>
                    <BooleanLabel true={props.equipmentQuoteDetails.data.is_double_time}/>
                </GridItem>
                <GridItem>
                    {(props.equipmentQuoteDetails.data.number_of_engineers + props.equipmentQuoteDetails.data.number_of_mates) > 0 ? 
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <th>Labour Type</th>
                                    <th>Rate</th>
                                    <th>Total Hours</th>
                                    <th>Total</th>
                                </thead>
                                <tbody>
                                    {[...Array(props.equipmentQuoteDetails.data.number_of_engineers)].map((_, index) => 
                                        <Fragment key={index}>
                                            <EquipmentQuoteLabourRow
                                                quoteLabour={props.equipmentQuoteDetails.data.labour[0 + (index * 3)]}
                                                rate={getQuotedEquipmentLabourRate(props.equipmentQuoteDetails, false, false, false)}
                                            />
                                            {props.equipmentQuoteDetails.data.is_out_of_hours && <EquipmentQuoteLabourRow
                                                quoteLabour={props.equipmentQuoteDetails.data.labour[1 + (index * 3)]}
                                                rate={getQuotedEquipmentLabourRate(props.equipmentQuoteDetails, false, true, false)}
                                            />}
                                            {props.equipmentQuoteDetails.data.is_double_time && <EquipmentQuoteLabourRow
                                                quoteLabour={props.equipmentQuoteDetails.data.labour[2 + (index * 3)]}
                                                rate={getQuotedEquipmentLabourRate(props.equipmentQuoteDetails, false, false, true)}
                                            />}
                                        </Fragment>
                                    )}
                                    {[...Array(props.equipmentQuoteDetails.data.number_of_mates)].map((_, index) => 
                                        <Fragment key={index}>
                                            <EquipmentQuoteLabourRow
                                                quoteLabour={props.equipmentQuoteDetails.data.labour[12 + (index * 3)]}
                                                rate={getQuotedEquipmentLabourRate(props.equipmentQuoteDetails, true, false, false)}
                                            />
                                            {props.equipmentQuoteDetails.data.is_out_of_hours && <EquipmentQuoteLabourRow
                                                quoteLabour={props.equipmentQuoteDetails.data.labour[13 + (index * 3)]}
                                                rate={getQuotedEquipmentLabourRate(props.equipmentQuoteDetails, true, true, false)}
                                            />}
                                            {props.equipmentQuoteDetails.data.is_double_time && <EquipmentQuoteLabourRow
                                                quoteLabour={props.equipmentQuoteDetails.data.labour[14 + (index * 3)]}
                                                rate={getQuotedEquipmentLabourRate(props.equipmentQuoteDetails, true, false, true)}
                                            />}
                                        </Fragment>
                                    )}
                                </tbody>
                                <tfoot>
                                    <td></td>
                                    <td></td>
                                    <th>{reduceQuoteLabourHours(props.equipmentQuoteDetails)} hrs</th>
                                    <th>{formatMoney(reduceQuoteLabourTotal(props.equipmentQuoteDetails))}</th>
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

export default EquipmentQuoteLabour