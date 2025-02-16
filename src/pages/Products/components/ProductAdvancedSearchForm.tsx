import { Dispatch, SetStateAction, ChangeEvent } from "react"
import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import updateStateParams from "../../../utils/updateStateParams/updateStateParams"
import TextInput from "../../../components/form/TextInput/TextInput"
import { ProductCategoryResponseData } from "../../../types/productCategory.types"
import ProductCategorySelect from "../../../components/form/ProductCategorySelect/ProductCategorySelect"
import { SupplierManufacturerResponseData } from "../../../types/supplierManufacturer.types"
import SupplierSelect from "../../../components/form/SupplierSelect/SupplierSelect"

export interface AdvancedProductSearchForm {
    size_or_model_like: string,
    category_id: number,
    supplier_id: number,
    manufacturer_id: number,
    catalogue_number_like: string,
    part_number_like: string,
}

const ProductAdvancedSearchForm = (props: {
    advancedSearchParams: AdvancedProductSearchForm,
    setAdvancedSearchParams: Dispatch<SetStateAction<AdvancedProductSearchForm>>,
    selectedProductCategory: ProductCategoryResponseData | undefined,
    setSelectedProductCategory: Dispatch<SetStateAction<ProductCategoryResponseData | undefined>>,
    selectedSupplier: SupplierManufacturerResponseData | undefined,
    setSelectedSupplier: Dispatch<SetStateAction<SupplierManufacturerResponseData | undefined>>
    selectedManufacturer: SupplierManufacturerResponseData | undefined,
    setSelectedManufacturer: Dispatch<SetStateAction<SupplierManufacturerResponseData | undefined>>
}) => {

    const updateParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, props.setAdvancedSearchParams)
    }
    
    return (
        <>
            <section>
                <InfoGrid>
                    <GridItem title='Category' span={3}>
                        <ProductCategorySelect 
                            selectedProductCategory={props.selectedProductCategory}
                            setSelectedProductCategory={props.setSelectedProductCategory}
                            hasSubmitted={false}
                        />
                    </GridItem>
                    <GridItem title='Size Or Model' span={3}>
                        <TextInput
                            name="size_or_model_like"
                            value={props.advancedSearchParams.size_or_model_like}
                            updateFunc={updateParams}                           
                        />
                    </GridItem>
                </InfoGrid>
            </section>
            <hr/>
            <section>
                <InfoGrid>
                    <GridItem title='Supplier' span={3}>
                        <SupplierSelect 
                            selectedSupplier={props.selectedSupplier} 
                            setSelectedSupplier={props.setSelectedSupplier} 
                            isSupplier
                            hasSubmitted={false}  
                        />
                    </GridItem>
                    <GridItem title='Manufacturer' span={3}>
                        <SupplierSelect 
                            selectedSupplier={props.selectedManufacturer} 
                            setSelectedSupplier={props.setSelectedManufacturer} 
                            isManufacturer
                            hasSubmitted={false}  
                        />
                    </GridItem>
                    <GridItem title='Catalogue Number' span={3}>
                         <TextInput
                            name="catalogue_number_like"
                            value={props.advancedSearchParams.catalogue_number_like}
                            updateFunc={updateParams}                           
                        />
                    </GridItem>
                    <GridItem title='Manufacturer Part Number' span={3}>
                         <TextInput
                            name="part_number_like"
                            value={props.advancedSearchParams.part_number_like}
                            updateFunc={updateParams}                           
                        />
                    </GridItem>
                </InfoGrid>
            </section>
            {/* <hr/>
            <section>
                <InfoGrid>
                    <GridItem title='Stores Area' span={2}>
                        <input type="text"/>
                    </GridItem>
                    <GridItem title='Stores Rack' span={2}>
                        <input type="text"/>
                    </GridItem>
                    <GridItem title='Stores Bin' span={2}>
                        <input type="text"/>
                    </GridItem>
                </InfoGrid>
            </section> */}
        </>
    )
}

export default ProductAdvancedSearchForm