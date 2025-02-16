import { Dispatch, SetStateAction } from "react"
import DateInput from "../../../components/form/DateInput/DateInput"
import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import updateStateDateParams from "../../../utils/updateStateParams/updateStateDateParams"

export interface AdvancedVehicleSearchForm {
    mot_due_date_or_tax_due_date_before: Date | undefined,
}

const VehicleAdvancedSearchForm = (props: {
    advancedSearchParams: AdvancedVehicleSearchForm,
    setAdvancedSearchParams: Dispatch<SetStateAction<AdvancedVehicleSearchForm>>,
}) => {
    const updateDateParams = (date: Date, name: string) => {
        updateStateDateParams(date, name, props.setAdvancedSearchParams)
    }
    
    return (
        <section>
            <InfoGrid>
                <GridItem title='MOT/TAX Due Before' span={3}>
                    <DateInput
                        name="mot_due_date_or_tax_due_date_before"
                        value={props.advancedSearchParams.mot_due_date_or_tax_due_date_before}
                        updateFunc={updateDateParams}
                        hasSubmitted={false} 
                    />
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default VehicleAdvancedSearchForm