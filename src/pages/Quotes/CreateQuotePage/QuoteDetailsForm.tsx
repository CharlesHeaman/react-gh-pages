import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { CreateQuoteAttributes } from "../../../types/quote.types";
import TextareaInput from "../../../components/form/TextareaInput/TextareaInput";
import GridItem from "../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid";
import FilterSelect, { FilterSelection } from "../../../components/ui/FilterSelect/FilterSelect";


const QuoteDetailsForm = (props: {
    quoteDetails: CreateQuoteAttributes,
    selectOptions: Array<FilterSelection>,
    setSelectOptions: Dispatch<SetStateAction<Array<FilterSelection>>>,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    showErrors: boolean,
}) => {
    return (
        <section>
            <InfoGrid>  
                <GridItem title='Quote Type' span={3}>
                    <FilterSelect
                        selections={props.selectOptions}
                        selectionSetter={props.setSelectOptions}
                    />
                </GridItem>
                <GridItem title='Quote Description'>
                    <TextareaInput
                        name="description"
                        label="Description"
                        value={props.quoteDetails.description}
                        updateFunc={props.updateParams} 
                        hasSubmitted={props.showErrors}
                        required
                    />
                </GridItem>                  
                <GridItem title='Notes' secondaryTitle="(optional)">
                    <TextareaInput
                        name="notes"
                        value={props.quoteDetails.notes}
                        updateFunc={props.updateParams} 
                        hasSubmitted={props.showErrors}
                    />
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default QuoteDetailsForm