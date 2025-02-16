import { useState } from "react";
import SideBarButton from "../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import ManufacturerPlantEquipment from "./components/ManufacturerPlantEquipment";
import ManufacturerEquipmentList from "./components/ManufacturerEquipment";
import ManufacturerProductsList from "./components/ManufacturerProductList";

const SupplierAssociatedData = (props: {
    manufacturerID: number,
    plantEquipmentCount: number,
    equipmentCount: number,
    productCount: number
}) => {
    const [showPlantEquipment, setShowPlantEquipment] = useState(false);
    const [showProducts, setShowProducts] = useState(false);
    const [showEquipment, setShowEquipment] = useState(false);

    return (
        <>
            <SideBarModule title="Manufacturer">
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
                <SideBarButton
                    text={`Plant/Tools (${props.plantEquipmentCount})`}
                    iconFont="handyman"
                    color="no-color"
                    clickEvent={() => setShowPlantEquipment(true)}
                />
            </SideBarModule>

            <ManufacturerPlantEquipment
                manufacturerID={props.manufacturerID}
                totalCount={props.plantEquipmentCount}
                show={showPlantEquipment}
                hideFunc={() => setShowPlantEquipment(false)}
            />

            <ManufacturerEquipmentList 
                manufacturerID={props.manufacturerID} 
                totalCount={props.equipmentCount} 
                show={showEquipment} 
                hideFunc={() => setShowEquipment(false)}
            />

            <ManufacturerProductsList 
                manufacturerID={props.manufacturerID} 
                totalCount={props.equipmentCount} 
                show={showProducts} 
                hideFunc={() => setShowProducts(false)}
            />
        </>
    )
}

export default SupplierAssociatedData