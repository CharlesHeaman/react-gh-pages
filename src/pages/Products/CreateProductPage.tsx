import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import postAPI from "../../utils/postAPI";
import FormWizardFlex, { FormStep } from "../../components/form/FormWizardFlex";
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import Header from "../../components/ui/Structure/Header/Header";
import { DepartmentResponseData } from "../../types/department.types";
import { ProductCategoryResponseData } from "../../types/productCategory.types";
import { CreateProductAttributes, ProductResponseData } from "../../types/products.types";
import { SupplierManufacturerResponseData } from "../../types/supplierManufacturer.types";
import updateStateParams from "../../utils/updateStateParams/updateStateParams";
import ProductDetailsForm from "./CreateProduct/components/ProductDetailsForm";
import ProductOrderInformationForm from "./CreateProduct/components/ProductOrderInformationForm";
import ProductPriceForm from "./CreateProduct/components/ProductPriceForm";
import ProductStoresInformationForm from "./CreateProduct/components/ProductStoresInformationForm";
import isProductDetailsFormValid from "./CreateProduct/utils/isProductDetailsFormValid";
import isProductOrderInformationFormValid from "./CreateProduct/utils/isProductOrderInformationFormValid";
import isProductPriceFormValid from "./CreateProduct/utils/isProductPriceFormValid";
import ProductInformation from "./ProductPage/components/ProductInformation";
import ProductInformationSkeleton from "./ProductPage/components/ProductInformationSkeleton";
import getAPI from "../../utils/getAPI";

const CreateProductPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Form States
    const [isCreating, setIsCreating] = useState(false);
    const [maxStepSubmitted, setMaxStepSubmitted] = useState(0);
    const [productDetails, setProductDetails] = useState<CreateProductAttributes>({
        description: '',
        size_or_model: '',
        unit: '',
        catalogue_number: '',
        part_number: '',
        price: '0',
        percentage_discount: '0',
        percentage_markup: '0',
    });
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();
    const [productCategoryData, setProductCategoryData] = useState<ProductCategoryResponseData>();
    const [isSupplierLoading, setIsSupplierLoading] = useState(false);
    const [supplierData, setSupplierData] = useState<SupplierManufacturerResponseData>();
    const [isManufacturerLoading, setIsManufacturerLoading] = useState(false);
    const [manufacturerData, setManufacturerData] = useState<SupplierManufacturerResponseData>();

    const supplierIDParam = searchParams.get('supplier_id');
    const manufacturerIDParam = searchParams.get('manufacturer_id');

    useEffect(() => {
        supplierIDParam && getSupplier(parseInt(supplierIDParam));
    }, [supplierIDParam]);

    useEffect(() => {
        manufacturerIDParam && getManufacturer(parseInt(manufacturerIDParam));
    }, [manufacturerIDParam]);

    const getSupplier = (supplierID: number) => {
        getAPI(`suppliers_manufacturers/${supplierID}`, {}, (response: any) => {
            const supplierData: SupplierManufacturerResponseData = response.data;
            setSupplierData(supplierData);
        }, setIsSupplierLoading);
    }

    const getManufacturer = (manufacturerID: number) => {
        getAPI(`suppliers_manufacturers/${manufacturerID}`, {}, (response: any) => {
            const manufacturerData: SupplierManufacturerResponseData = response.data;
            setManufacturerData(manufacturerData);
        }, setIsManufacturerLoading);
    }

    const updateParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setProductDetails)
    }

    const createProduct = () => {
        postAPI('products/create', {}, {
            ...productDetails,
            supplier_id: supplierData?.id,
            manufacturer_id: manufacturerData?.id,
            department_id: departmentData?.id,
            category_id: productCategoryData?.id,
        }, (response: any) => {
            const productData: ProductResponseData = response.data;
            navigate(`../${productData.id}`, { relative: 'path' })
        }, setIsCreating)
    }

    const formSteps: Array<FormStep> = [
        {
            header: 'Product Details',
            form: <ProductDetailsForm 
                productDetails={productDetails} 
                updateParams={updateParams} 
                selectedDepartment={departmentData}
                setSelectedDepartment={setDepartmentData}
                selectedProductCategory={productCategoryData}
                setSelectedProductCategory={setProductCategoryData}
                showErrors={maxStepSubmitted > 0}
            />,
            isComplete: isProductDetailsFormValid(productDetails, productCategoryData?.id)
        },
        {
            header: 'Order Information',
            form: <ProductOrderInformationForm 
                productDetails={productDetails} 
                updateParams={updateParams} 
                selectedSupplier={supplierData}
                setSelectedSupplier={setSupplierData}
                selectedManufacturer={manufacturerData}
                setSelectedManufacturer={setManufacturerData}
                showErrors={maxStepSubmitted > 1}
            />,
            isComplete: isProductOrderInformationFormValid(productDetails, supplierData?.id, manufacturerData?.id)
        },
        {
            header: 'Pricing',
            form: <ProductPriceForm 
                productDetails={productDetails} 
                updateParams={updateParams} 
                showErrors={maxStepSubmitted > 2}
            />,
            isComplete: isProductPriceFormValid(productDetails)
        },
        {
            header: 'Review Information',
            form: productCategoryData && supplierData && manufacturerData ? <ProductInformation 
                productData={{
                    ...productDetails,
                    image_file_name: '',
                    is_sundry: false,
                    is_active: true,
                    supplier_id: supplierData.id,
                    manufacturer_id: manufacturerData.id,
                    category_id: productCategoryData.id,
                    department_id: departmentData ? departmentData.id : null,
                    stock_level: 0,
                    order_threshold: null,
                    is_stock: false,
                    parent_product_id: null,
                    price: parseFloat(productDetails.price),
                    selling_price: 0,
                    percentage_discount: parseFloat(productDetails.percentage_discount),
                    percentage_markup: parseFloat(productDetails.percentage_markup),
                    parent_price_percentage: 100,
                    stores_area: null,
                    stores_bin: null,
                    stores_rack: null,
                    alternative_stores_location: null
                }} 
                department={departmentData} 
                supplier={supplierData} 
                manufacturer={manufacturerData}
                parentProduct={undefined} 
                category={productCategoryData}        
                lastDeactivate={undefined}
                isPreview    
            /> :
            <ProductInformationSkeleton/>,            
            isComplete: true
        },        
    ];

    return (
        <>
            <OuterContainer
                title='Create Product'
                description="Complete this form to create a product."
                maxWidth={850}
            >
                <FormWizardFlex
                    steps={formSteps}
                    maxStepSubmitted={maxStepSubmitted}
                    setMaxStepSubmitted={setMaxStepSubmitted}
                    resourceName="Product"
                    isCreating={isCreating}
                    createFunc={createProduct}
                />
            </OuterContainer>
        </>
    )
}

export default CreateProductPage