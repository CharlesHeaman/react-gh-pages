import { useEffect, useState } from "react";
import FormWizardFlex, { FormStep } from "../../../components/form/FormWizardFlex";
import GridItem from "../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import { GasBottleCollectionResponse } from "../../../types/gasBottle.types";
import formatDate from "../../../utils/formatDate";
import getAPI from "../../../utils/getAPI";
import BottleAdminNavigation from "./BottleAdminNavigation";
import BottleReturnDetailsForm from "./BottleReturnDetailsForm";
import BottleReturnQueued from "./BottleReturnQueued";
import putAPI from "../../../utils/putAPI";
import { useNavigate } from "react-router-dom";

const ReturnBottlesPage = (props: {
    isConsumable?: boolean,
})  => {
    const navigate = useNavigate();

    // Form States
    const [isCreating, setIsCreating] = useState(false);
    const [maxStepSubmitted, setMaxStepSubmitted] = useState(0);
    const [returnDate, setReturnDate] = useState(new Date());

    // Data States
    const [isGasBottleLoading, setIsGasBottleLoading] = useState(false);
    const [gasBottleData, setGasBottleData] = useState<GasBottleCollectionResponse>();

    useEffect(() => {
        getBottles();
    }, []);


    const getBottles = () => {
        getAPI('gas_bottles', {
            is_consumable: props.isConsumable ? true : false,
            is_queued: true,
            is_active: true
        }, (response: any) => {
            const gasBottleData: GasBottleCollectionResponse = response.data;
            setGasBottleData(gasBottleData);
        }, setIsGasBottleLoading);
    }

    const returnBottles = () => {
        putAPI('gas_bottles/return_collection', {}, {
            supplier_returned_date: returnDate,
            bottle_ids: gasBottleData?.data.map(bottle => bottle.id)
        }, (response: any) => {
            navigate(`../returns/${response.data.return_reference_number}`, { relative: 'path' })
        }, setIsCreating)
    }

    const formSteps: Array<FormStep> = [
        {
            header: 'Queued Bottles',
            form: <BottleReturnQueued
                isGasBottlesLoading={isGasBottleLoading}
                gasBottles={gasBottleData}
                isConsumable={props.isConsumable}
            />,
            isComplete: true
        },
        {
            header: 'Return Details',
            form:  <BottleReturnDetailsForm
                returnDate={returnDate}
                setReturnDate={setReturnDate}
                showErrors={maxStepSubmitted > 1}
            />,
            isComplete: true,
        },
        {
            header: 'Review Return',
            form: <>
                <section>
                    <h2>Return Details</h2>
                    <InfoGrid>
                        {/* <GridItem title='Return Reference Number' span={2}>
                            <p>{referenceNumber}</p>
                        </GridItem> */}
                        <GridItem title='Return Date' span={2}>
                            <p>{formatDate(returnDate, true)}</p>
                        </GridItem>
                    </InfoGrid>
                </section>
                <hr/>
                <BottleReturnQueued
                    isGasBottlesLoading={isGasBottleLoading}
                    gasBottles={gasBottleData}
                    isPreview
                />
            </>,
            isComplete: true
        }     
    ]
    
    return (
        <>
            <BottleAdminNavigation location={props.isConsumable ? 'gas_air' : 'refrigerant'}/>
            <OuterContainer
                title={`Return ${props.isConsumable ? 'Gas/Air' : 'Refrigerant'} Bottles`}
                maxWidth={1350}
                description="Complete this form to return queued bottles."
            >
                <FormWizardFlex
                    steps={formSteps}
                    maxStepSubmitted={maxStepSubmitted}
                    setMaxStepSubmitted={setMaxStepSubmitted}
                    resourceName="Bottles"
                    actionName="Return"
                    iconFont="assignment_return"
                    isCreating={isCreating}
                    createFunc={returnBottles}
                />            
            </OuterContainer>
        </>
    )
}

export default ReturnBottlesPage