import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import InnerContainer from "../../../components/ui/Containers/InnerContainer/InnerContainer"
import NoneFound from "../../../components/ui/General/NoneFound/NoneFound"
import { CreditNoteResponseData } from "../../../types/creditNote.types"
import formatDate from "../../../utils/formatDate"
import formatMoney from "../../../utils/formatMoney"
import reduceCreditNoteValue from "../../Jobs/utils/reduceCreditNoteValue"

const CreditNotes = (props: {
    creditNotes: Array<CreditNoteResponseData>,
}) => {
    return (
        <section>
            <h2>Credit Notes</h2>
            {props.creditNotes.length > 0 ?
                <InfoGrid>
                    <GridItem title='Total Credit Note Value'>
                        <p><span style={{ fontSize: '1.75em', fontWeight: '600'}}>{formatMoney(reduceCreditNoteValue(props.creditNotes))}</span></p>
                    </GridItem>
                    <GridItem>
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Number</th>
                                        <th>Value</th>
                                        <th>Credit Note Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.creditNotes.map((creditNote, index) => 
                                        <tr key={index}>
                                            <td>{creditNote.data.credit_note_number}</td>
                                            <td className="text-right">{formatMoney(creditNote.data.credit_note_value)}</td>
                                            <td>{formatDate(creditNote.data.credit_note_date)}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </GridItem>
                </InfoGrid>
                :
                <InnerContainer>
                    <NoneFound
                        text="No credit notes found"
                        iconFont="redeem"
                        small                            
                    />
                </InnerContainer>
            }
        </section>
    )
}

export default CreditNotes