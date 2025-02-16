import SideBarButton from "../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../components/ui/Containers/SideBarModule/SideBarModule";

const SupplierManufacturerActions = (props: {
    setIsEditMode: () => void,
}) => {

    return (
        <>
            <SideBarModule title="Actions">
                <SideBarButton
                    text="Edit Supplier/Manufacturer"
                    iconFont="edit"
                    color="orange"
                    clickEvent={props.setIsEditMode}
                />
            </SideBarModule>
        </>
    )
}

export default SupplierManufacturerActions