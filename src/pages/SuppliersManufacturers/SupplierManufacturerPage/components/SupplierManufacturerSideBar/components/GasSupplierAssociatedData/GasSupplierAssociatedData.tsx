import { useState } from "react";
import SideBarButton from "../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import GasSupplierGasBottlesList from "./components/GasSupplierGasBottlesList"

const GasSupplierAssociatedData = (props: {
    supplierID: number,
    gasBottleCount: number,
}) => {
    const [showBottles, setShowBottles] = useState(false);
    return (
        <>
             <SideBarModule title="Gas Supplier">
                <SideBarButton
                    text={`Gas Bottles (${props.gasBottleCount})`}
                    iconFont="propane_tank"
                    color="no-color"
                    clickEvent={() => setShowBottles(true)}
                />
            </SideBarModule>

            <GasSupplierGasBottlesList 
                supplierID={props.supplierID} 
                totalCount={props.gasBottleCount} 
                show={showBottles} 
                hideFunc={() => setShowBottles(false)}
            />
        </>
    )
}

export default GasSupplierAssociatedData