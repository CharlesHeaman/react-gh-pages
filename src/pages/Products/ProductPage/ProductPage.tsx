import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer"
import DepartmentLabel from "../../../components/ui/Department/DepartmentLabel"
import Label from "../../../components/ui/General/Label/Label"
import Skeleton from "../../../components/ui/General/Skeleton/Skeleton"
import InactiveLabel from "../../../components/ui/InactiveLabel/InactiveLabel"
import { DepartmentResponseData } from "../../../types/department.types"
import { ProductActivityCollectionResponse, ProductActivityResponseData } from "../../../types/productActivity.types"
import { ProductCategoryResponseData } from "../../../types/productCategory.types"
import { ProductResponseData } from "../../../types/products.types"
import { SupplierManufacturerResponseData } from "../../../types/supplierManufacturer.types"
import getAPI from "../../../utils/getAPI"
import StockLevelLabel from "../components/StockLevelLabel"
import EditProductForm from "./components/EditProductForm"
import ProductInformation from "./components/ProductInformation"
import ProductInformationSkeleton from "./components/ProductInformationSkeleton"
import ProductSideBar from "./components/ProductSideBar/ProductSideBar"

const ProductPage = () => {
    const { productID } = useParams();

    // Data States
    const [isProductLoading, setIsProductLoading] = useState(true);
    const [productData, setProductData] = useState<ProductResponseData>();
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(false);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();
    const [isSupplierLoading, setIsSupplierLoading] = useState(false);
    const [supplierData, setSupplierData] = useState<SupplierManufacturerResponseData>();
    const [isManufacturerLoading, setIsManufacturerLoading] = useState(false);
    const [manufacturerData, setManufacturerData] = useState<SupplierManufacturerResponseData>();
    const [isParentProductLoading, setIsParentProductLoading] = useState(false);
    const [parentProductData, setParentProductData] = useState<ProductResponseData>();
    const [isCategoryLoading, setIsCategoryLoading] = useState(false);
    const [categoryData, setCategoryData] = useState<ProductCategoryResponseData>();
    const [isInactiveActivityLoading, setIsInactiveActivityLoading] = useState(false);
    const [inactiveActivityData, setInactiveActivityData] = useState<ProductActivityResponseData>();

    // Edit States
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        getProduct();
    }, [productID]);

    useEffect(() => {
        if (!productData) return;
        if (productData.data.department_id) {
            getDepartment(productData.data.department_id);
        } else {
            setDepartmentData(undefined);
        }
    }, [productData?.data.department_id]);

    useEffect(() => {
        if (!productData) return;
        if (productData.data.supplier_id) {
            getSupplierData(productData.data.supplier_id);
        } else {
            setSupplierData(undefined);
        }
    }, [productData?.data.supplier_id]);

    useEffect(() => {
        if (!productData) return;
        if (productData.data.manufacturer_id) {
            getManufacturerData(productData.data.manufacturer_id);
        } else {
            setManufacturerData(undefined);
        }
    }, [productData?.data.manufacturer_id]);

    useEffect(() => {
        if (!productData) return;
        getCategory(productData.data.category_id);
    }, [productData?.data.category_id]);

    useEffect(() => {
        if (productData === undefined) return;
        if (!productData.data.is_active) getInactiveActivity(productData.id);
    }, [JSON.stringify(productData)]);


    const getProduct = () => {
        getAPI(`products/${productID}`, {}, (response: any) => {
            const productData: ProductResponseData = response.data;
            setProductData(productData);
            if (productData.data.parent_product_id) {
                getParentProduct(productData.data.parent_product_id);
            } else {
                setParentProductData(undefined);
            }
        }, setIsProductLoading)
    }

    const getDepartment = (departmentID: number) => {
        getAPI(`departments/${departmentID}`, {}, (response: any) => {
            const departmentData: DepartmentResponseData = response.data;
            setDepartmentData(departmentData);
        }, setIsDepartmentLoading);
    }

    const getSupplierData = (supplierID: number) => {
        getAPI(`suppliers_manufacturers/${supplierID}`, {}, (response: any) => {
            const supplierData: SupplierManufacturerResponseData = response.data;
            setSupplierData(supplierData);
        }, setIsSupplierLoading);
    }

    const getManufacturerData = (manufacturerID: number) => {
        getAPI(`suppliers_manufacturers/${manufacturerID}`, {}, (response: any) => {
            const manufacturerData: SupplierManufacturerResponseData = response.data;
            setManufacturerData(manufacturerData);
        }, setIsManufacturerLoading);
    }

    const getParentProduct = (parentProductID: number) => {
        getAPI(`products/${parentProductID}`, {}, (response: any) => {
            const productData: ProductResponseData = response.data;
            setParentProductData(productData);
        }, setIsParentProductLoading)
    }

    const getCategory = (productCategoryID: number) => {
        getAPI(`product_categories/${productCategoryID}`, {}, (response: any) => {
            const categoryData: ProductCategoryResponseData = response.data;
            setCategoryData(categoryData);
        }, setIsCategoryLoading)
    }

    const getInactiveActivity = (productID: number) => {
        getAPI(`product_activity`, {
            product_id: productID,
            type: 2,
            perPage: 1
        }, (response: any) => {
            const productActivityData: ProductActivityCollectionResponse = response.data;
            setInactiveActivityData(productActivityData.data[0]);
        }, setIsInactiveActivityLoading)    
    } 

    const isLoading = (
        isProductLoading || 
        isDepartmentLoading ||
        isParentProductLoading || 
        isSupplierLoading || 
        isManufacturerLoading || 
        isCategoryLoading ||
        isInactiveActivityLoading
    )

    const isHeaderLoading = (
        isProductLoading || 
        isDepartmentLoading
    )

    return (
        <OuterContainer
            title='Product'
            id={productID}
            headerContent={!isHeaderLoading && productData && categoryData ?
                <div className="flex">                    
                    {!productData.data.is_active ? <InactiveLabel/> : null}
                    {productData.data.is_stock ? <Label text="Stock" iconFont="inbox" color="purple"/> : null}
                    {productData.data.is_sundry ? <Label text="Sundry" iconFont="donut_small" color="no-color"/> : null}
                    <Label text={categoryData.data.name} iconFont="inventory_2" color="no-color"/>
                    {departmentData ? <DepartmentLabel department={departmentData}/> : null}
                    {productData.data.order_threshold ? <StockLevelLabel stockLevel={productData.data.stock_level} orderThreshold={productData.data.order_threshold} showTitle/> : null}
                </div> :
                <div className="flex">
                    <Skeleton type="label" width={100}/>
                    <Skeleton type="label" width={100}/>
                    <Skeleton type="label" width={100}/>
                </div>
            }
            maxWidth={900}
            bigID
        >
            <div className="page-grid">
                <div className="page-main">
                    {!isLoading && productData && categoryData ?
                        !isEditMode ? 
                            <ProductInformation
                                productData={productData.data}
                                department={departmentData}
                                supplier={supplierData}
                                manufacturer={manufacturerData}
                                parentProduct={parentProductData}
                                category={categoryData}
                                lastDeactivate={inactiveActivityData?.data.created_at}
                            /> :
                            <EditProductForm
                                product={productData}
                                parentProduct={parentProductData}
                                setProductData={setProductData}
                                department={departmentData}
                                supplier={supplierData}
                                manufacturer={manufacturerData}
                                category={categoryData}
                                disabledEdit={() => setIsEditMode(false)}
                            />
                        :
                        <ProductInformationSkeleton/>
                    }
                </div>
                <div className="page-side">
                    <ProductSideBar
                        product={productData}
                        setProductData={setProductData}
                        isEditMode={isEditMode}
                        setIsEditMode={setIsEditMode}
                    />
                </div>
            </div>
        </OuterContainer>
    )
}

export default ProductPage