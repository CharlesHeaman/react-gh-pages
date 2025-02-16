import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormWizardFlex, { FormStep } from "../../../components/form/FormWizardFlex";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import { GasBottleResponseData } from "../../../types/gasBottle.types";
import putAPI from "../../../utils/putAPI";
import BottleAdminNavigation from "../GasBottlesListPage/BottleAdminNavigation";
import SelectReturningBottles from "./SelectReturningBottles";

const QueueBottlesForReturnPage = (props: {
    isConsumable?: boolean
}) => {
    const navigate = useNavigate();

    // Form States
    const [isCreating, setIsCreating] = useState(false);
    const [maxStepSubmitted, setMaxStepSubmitted] = useState(0);
    const [queuedBottles, setQueuedBottles] = useState<Array<GasBottleResponseData>>([]);

    const createGasBottle = () => {
        putAPI('gas_bottles/queue_collection_for_return', {}, {
            gas_bottle_ids: queuedBottles.map(bottle => bottle.id)
        }, () => {
            navigate('../', { relative: 'path' })
        }, setIsCreating);
    }

    const isFormValid = (
        queuedBottles.length > 0
    )

    const formSteps: Array<FormStep> = [
        {
            header: 'Select Bottles',
            form: <SelectReturningBottles
                queuedBottles={queuedBottles}
                setQueuedBottles={setQueuedBottles}
                isConsumable={props.isConsumable !== undefined ? props.isConsumable : false}
            />,
            isComplete: isFormValid
        },
        {
            header: 'Review Information',
            form: <SelectReturningBottles
                queuedBottles={queuedBottles}
                setQueuedBottles={setQueuedBottles}
                isConsumable={props.isConsumable !== undefined ? props.isConsumable : false}
                isPreview
            />,
            isComplete: true
        }     
    ]

    return (
        <>
            <BottleAdminNavigation location={props.isConsumable ? 'gas_air' : 'refrigerant'}/>
            <OuterContainer
                title={`Queue ${props.isConsumable ? 'Gas/Air' : 'Refrigerant'} Bottles for Return`}
                description={`Complete this form to queue ${props.isConsumable ? 'gas/air' : 'refrigerant'} bottles for return.`}
                maxWidth={900}
            >
                <FormWizardFlex
                    steps={formSteps}
                    maxStepSubmitted={maxStepSubmitted}
                    setMaxStepSubmitted={setMaxStepSubmitted}
                    iconFont="playlist_add"
                    actionName="Queue"
                    resourceName={`${props.isConsumable ? 'Gas/Air' : 'Refrigerant'} Bottles`}
                    isCreating={isCreating}
                    createFunc={createGasBottle}
                />
            </OuterContainer>
        </>
    )
}

export default QueueBottlesForReturnPage