import { Dispatch, SetStateAction } from "react"
import DateInput from "../../../components/form/DateInput/DateInput"
import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"

const BottleReturnDetailsForm = (props: {
    returnDate: Date,
    setReturnDate: Dispatch<SetStateAction<Date>>,
    showErrors: boolean,
}) => {
    return (
        <section>
            <InfoGrid>
                <GridItem title='Return Date'>
                    <DateInput
                        name="supplier_returned_date"
                        value={props.returnDate}
                        updateFunc={(date: Date) => props.setReturnDate(date)} 
                        label="Return date"
                        hasSubmitted
                        required
                    />
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default BottleReturnDetailsForm