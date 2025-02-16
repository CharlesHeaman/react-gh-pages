import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import { ProductCategory } from "../../../types/productCategory.types"
import InactiveStatus from "../../Vehicles/VehiclePage/components/InactiveStatus"

const ProductCategoryInformation = (props: {
    productCategoryData: ProductCategory,
    lastDeactivate: Date | undefined,
}) => {
    return (
        <>
            {!props.productCategoryData.is_active ? <InactiveStatus resourceName='Product Category' inactiveDate={props.lastDeactivate}/> : null}
            <section>
                <h2>Product Category Details</h2>
                <InfoGrid>
                    <GridItem title='Name'>
                        <p>{props.productCategoryData.name}</p>
                    </GridItem>
                    <GridItem title='Description'>
                        <p>{props.productCategoryData.description ? props.productCategoryData.description : 'None'}</p>
                    </GridItem>
                </InfoGrid>
            </section>
        </>
    )
}

export default ProductCategoryInformation