import { useState } from "react";
import MoneyInput from "../../../components/form/MoneyInput/MoneyInput";
import SubmitButton from "../../../components/form/SubmitButton/SubmitButton";
import TextInput from "../../../components/form/TextInput/TextInput";
import GridItem from "../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid";
import WindowOverlay from "../../../components/ui/Containers/WindowOverlay/WindowOverlay";

const AddFreeTextToRequisition = (props: {
    show: boolean,
    hideFunc: () => void,
    addFunc: (catalogueNumber: '', description: string, unit: string, price: string) => void
}) => {
    const [hasSubmitted, setHasSubmitted] = useState(false);
    // const [catalogueNumber, setCatalogueNumber] = useState('');
    const [description, setDescription] = useState('');
    const [unit, setUnit] = useState('');
    const [price, setPrice] = useState('0');

    const formComplete = (
        unit.length > 0 && 
        description.length > 0 &&
        price.length > 0 
    )
    
    const addFreeText = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        props.addFunc('', description, unit, price);
        resetForm();
    }

    const resetForm = () => {
        setUnit('');
        setDescription('');
        setPrice('0');
        setHasSubmitted(false);
    }

    return (
        <WindowOverlay 
            title={"Add Free Text to Requisition"} 
            maxWidth={300} 
            show={props.show}
            hideFunc={props.hideFunc}
            footer={<SubmitButton
                text="Add Free Text"
                iconFont="edit_note"
                clickFunc={addFreeText}
            />}
        >
            <InfoGrid>
                <GridItem title='Description'>
                    <TextInput 
                        name={"Description"} 
                        label="Description"
                        value={description} 
                        updateFunc={(event) => setDescription(event.target.value)}
                        required
                        hasSubmitted={hasSubmitted}
                    />
                </GridItem>
                <GridItem title='Unit'>
                    <TextInput 
                        name={"Unit"} 
                        label="Unit"
                        value={unit} 
                        updateFunc={(event) => setUnit(event.target.value)}
                        required
                        hasSubmitted={hasSubmitted}
                    />
                </GridItem>
                <GridItem title='Nett Price'>
                    <MoneyInput 
                        name={"Nett Price"}
                        label="Nett Price" 
                        value={price}
                        updateFunc={(event) => setPrice(event.target.value)} 
                        required
                        hasSubmitted={hasSubmitted}
                    />
                </GridItem>
            </InfoGrid>
        </WindowOverlay>
    )
}

export default AddFreeTextToRequisition