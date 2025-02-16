import { Dispatch, SetStateAction, useState } from "react"
import SideBarButton from "../../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import { ProductResponseData } from "../../../../../../types/products.types"
import RefrigerantSelectProduct from "./RefrigerantSelectProduct"
import { RefrigerantResponseData } from "../../../../../../types/refrigerant.types"

const RefrigerantActions = (props: {
    refrigerantID: number,
    product: ProductResponseData | undefined,
    setIsEditMode: Dispatch<SetStateAction<boolean>>,
    setRefrigerantData: Dispatch<SetStateAction<RefrigerantResponseData | undefined>>,
}) => {
    const [showSelectProduct, setShowSelectProduct] = useState(false);
    return (
        <>
            <SideBarModule title="Actions">
                <SideBarButton
                    text="Edit Refrigerant, Gas/Air"
                    iconFont="edit"
                    color="orange"
                    clickEvent={() => props.setIsEditMode(true)}
                />
                <SideBarButton
                    text="Select Associated Product"
                    iconFont="inventory_2"
                    color={props.product ? '' : 'light-green'}
                    clickEvent={() => setShowSelectProduct(true)}
                />
            </SideBarModule>

            <RefrigerantSelectProduct
                refrigerantID={props.refrigerantID}
                product={props.product}
                setRefrigerantData={props.setRefrigerantData}
                show={showSelectProduct}
                hideFunc={() => setShowSelectProduct(false)}
            />
        </>
    )
}

export default RefrigerantActions