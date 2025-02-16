import { useState } from "react";
import SideBarButton from "../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import SupplierEquipmentList from "./components/SupplierEquipmentList";
import SupplierProductsList from "./components/SupplierProductsList";

const SupplierAssociatedData = (props: {
    supplierID: number,
    equipmentCount: number,
    productCount: number
}) => {
    const [showEquipment, setShowEquipment] = useState(false);
    const [showProducts, setShowProducts] = useState(false);
    return (
        <>
            <SideBarModule title="Supplier">
                <SideBarButton
                    text={`Equipment (${props.equipmentCount})`}
                    iconFont="local_laundry_service"
                    color="no-color"
                    clickEvent={() => setShowEquipment(true)}
                />
                <SideBarButton
                    text={`Products (${props.productCount})`}
                    iconFont="inventory_2"
                    color="no-color"
                    clickEvent={() => setShowProducts(true)}
                />
            </SideBarModule>

            <SupplierEquipmentList 
                supplierID={props.supplierID} 
                totalCount={props.equipmentCount} 
                show={showEquipment} 
                hideFunc={() => setShowEquipment(false)}
            />

            <SupplierProductsList 
                supplierID={props.supplierID} 
                totalCount={props.equipmentCount} 
                show={showProducts} 
                hideFunc={() => setShowProducts(false)}
            />
        </>
    )
}

export default SupplierAssociatedData