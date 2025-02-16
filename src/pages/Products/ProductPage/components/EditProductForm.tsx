import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton";
import ContainerFooter from "../../../../components/ui/Containers/ContainerFooter/ContainerFooter";
import { DepartmentResponseData } from "../../../../types/department.types";
import { ProductCategoryResponseData } from "../../../../types/productCategory.types";
import { CreateProductAttributes, ProductResponseData } from "../../../../types/products.types";
import { SupplierManufacturerResponseData } from "../../../../types/supplierManufacturer.types";
import putAPI from "../../../../utils/putAPI";
import updateStateParams from "../../../../utils/updateStateParams/updateStateParams";
import ProductDetailsForm from "../../CreateProduct/components/ProductDetailsForm";
import ProductOrderInformationForm from "../../CreateProduct/components/ProductOrderInformationForm";
import ProductStoresInformationForm from "../../CreateProduct/components/ProductStoresInformationForm";
import isProductDetailsFormValid from "../../CreateProduct/utils/isProductDetailsFormValid";
import isProductOrderInformationFormValid from "../../CreateProduct/utils/isProductOrderInformationFormValid";
import isProductPriceFormValid from "../../CreateProduct/utils/isProductPriceFormValid";
import isProductSundryDetailsFormValid from "../../CreateProduct/utils/isProductSundryDetailsFormValid";

const EditProductForm = (props: {
    product: ProductResponseData,
    parentProduct: ProductResponseData | undefined,
    setProductData: Dispatch<SetStateAction<ProductResponseData | undefined>>
    disabledEdit: () => void,
    department: DepartmentResponseData | undefined,
    supplier: SupplierManufacturerResponseData | undefined,
    manufacturer: SupplierManufacturerResponseData | undefined,
    category: ProductCategoryResponseData
}) => {  
    // Form States
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [productDetails, setProductDetails] = useState<CreateProductAttributes>({
        description: props.product.data.description,
        size_or_model: props.product.data.size_or_model,
        unit: props.product.data.unit,
        catalogue_number: props.product.data.catalogue_number,
        part_number: props.product.data.part_number,
        stores_area: props.product.data.stores_area ? props.product.data.stores_area : '',
        stores_rack: props.product.data.stores_rack ? props.product.data.stores_rack : '',
        stores_bin: props.product.data.stores_bin ? props.product.data.stores_bin : '',
        alternative_stores_location: props.product.data.alternative_stores_location ? props.product.data.alternative_stores_location : '',
        price: props.product.data.price.toString(),
        percentage_discount: props.product.data.percentage_discount.toString(),
        selling_price: props.product.data.selling_price ? props.product.data.selling_price.toString() : '0',
        percentage_markup: props.product.data.percentage_markup.toString(),
        stock_level: props.product.data.stock_level.toString(),
        parent_price_percentage: props.product.data.parent_price_percentage ? props.product.data.parent_price_percentage.toString() : '100'
    });
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData | undefined>(props.department);
    const [productCategoryData, setProductCategoryData] = useState<ProductCategoryResponseData | undefined>(props.category);
    const [supplierData, setSupplierData] = useState<SupplierManufacturerResponseData | undefined>(props.supplier);
    const [manufacturerData, setManufacturerData] = useState<SupplierManufacturerResponseData | undefined>(props.manufacturer);

    const formComplete = (
        (
            isProductDetailsFormValid(productDetails, productCategoryData?.id, departmentData?.id) && 
            isProductOrderInformationFormValid(productDetails, supplierData?.id, manufacturerData?.id) &&   
            isProductPriceFormValid(productDetails)
        ) || (props.product.data.is_sundry && isProductSundryDetailsFormValid({
            description: productDetails.description,
            unit: productDetails.unit,
            size_or_model: productDetails.size_or_model,
            parent_price_percentage: productDetails.parent_price_percentage,
        }))
    )

    const updateParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setProductDetails)
    }

    const updateSite = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        putAPI(`products/${props.product.id}/update`, {}, {
            ...productDetails,
            supplier_id: supplierData?.id,
            manufacturer_id: manufacturerData?.id,
            department_id: departmentData?.id,
            category_id: productCategoryData?.id,
            price: props.parentProduct ? props.parentProduct.data.price * (parseFloat(productDetails.parent_price_percentage) / 100) : props.product.data.price,
        }, (response: any) => {
            const productData: ProductResponseData = response.data;
            props.setProductData(productData);
            props.disabledEdit();
        }, setIsUpdating)
    }

    return (
        <>
            <ProductDetailsForm 
                productDetails={productDetails} 
                updateParams={updateParams} 
                selectedDepartment={departmentData}
                setSelectedDepartment={setDepartmentData}
                selectedProductCategory={productCategoryData}
                setSelectedProductCategory={setProductCategoryData}
                showErrors
                isSundry={props.product.data.is_sundry}
                isEdit
            />
            {!props.product.data.is_sundry && <>
                <hr/>
                <ProductOrderInformationForm 
                    productDetails={productDetails} 
                    updateParams={updateParams} 
                    selectedSupplier={supplierData}
                    setSelectedSupplier={setSupplierData}
                    selectedManufacturer={manufacturerData}
                    setSelectedManufacturer={setManufacturerData}
                    showErrors
                    isEdit
                />
            </>} 
            <ContainerFooter>
                <SubmitButton 
                    text="Save Changes" 
                    iconFont="save"
                    clickFunc={updateSite}                
                    submitting={isUpdating}
                    submittingText="Saving..."
                    disabled={hasSubmitted && !formComplete}
                />
            </ContainerFooter>
        </>
    )
}

export default EditProductForm