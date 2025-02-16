import { ChangeEvent, Dispatch, SetStateAction } from "react";
import DepartmentSelect from "../../../../components/form/DepartmentSelect/DepartmentSelect";
import IntegerInput from "../../../../components/form/IntegerInput/IntegerInput";
import ProductCategorySelect from "../../../../components/form/ProductCategorySelect/ProductCategorySelect";
import TextInput from "../../../../components/form/TextInput/TextInput";
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid";
import { DepartmentResponseData } from "../../../../types/department.types";
import { ProductCategoryResponseData } from "../../../../types/productCategory.types";
import { CreateProductAttributes } from "../../../../types/products.types";
import PercentageInput from "../../../../components/form/PercentageInput/PercentageInput";

const ProductDetailsForm = (props: {
    productDetails: CreateProductAttributes,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    selectedDepartment: DepartmentResponseData | undefined,
    setSelectedDepartment: Dispatch<SetStateAction<DepartmentResponseData | undefined>>
    selectedProductCategory: ProductCategoryResponseData | undefined,
    setSelectedProductCategory: Dispatch<SetStateAction<ProductCategoryResponseData | undefined>>
    showErrors: boolean,
    isSundry?: boolean,
    isEdit?: boolean,
}) => {
    return (
        <section>
            {props.isEdit && <h2>Product Details</h2>}
            <InfoGrid>                
                <GridItem title='Description'>
                    <TextInput
                        name="description"
                        label="Description"
                        value={props.productDetails.description}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        autoFocus
                        required
                    />
                </GridItem>
                <GridItem title='Size or Model' span={3}>
                    <TextInput
                        name="size_or_model"
                        label="Size or model"
                        value={props.productDetails.size_or_model}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        required
                    />
                </GridItem>
                <GridItem title='Unit' span={3}>
                    <TextInput
                        name="unit"
                        label="Unit"
                        value={props.productDetails.unit}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        required
                    />
                </GridItem>
                {!props.isSundry && <>
                    <GridItem title='Category' span={3}>
                        <ProductCategorySelect 
                            selectedProductCategory={props.selectedProductCategory}
                            setSelectedProductCategory={props.setSelectedProductCategory}
                            required
                            hasSubmitted={props.showErrors}                    
                        />
                    </GridItem>
                    <GridItem title='Primary Department' span={3} secondaryTitle="(optional)">
                        <DepartmentSelect 
                            selectedDepartment={props.selectedDepartment}
                            setSelectedDepartment={props.setSelectedDepartment}
                            hasSubmitted={props.showErrors}                    
                        />
                    </GridItem>
                </>}
                {/* {props.isSundry ? <GridItem title='Price Percentage'>
                    <PercentageInput
                        name="parent_price_percentage"
                        label="Price percentage"
                        value={props.productDetails.parent_price_percentage}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        required
                    />
                </GridItem> : null} */}
            </InfoGrid>
        </section>
    )
}

export default ProductDetailsForm