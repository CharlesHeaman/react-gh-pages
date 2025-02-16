import { FormEvent, useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";
import AdvancedSearchFooter from "../../../components/ui/AdvancedSearchFooter/AdvancedSearchFooter";
import WindowOverlay from "../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import getObjectHasValue from "../../../utils/getObjectHasValue";
import updateAdvancedSearchParam from "../../../utils/setAdvancedSearchParams";
import { AdvancedCustomerSearchForm } from "../../CustomerAdmin/Customers/components/CustomerAdvancedSearchForm";
import clearCustomerAdvancedSearchParams from "../../CustomerAdmin/Customers/utils/clearCustomerAdvancedSearchParams";
import getProductAdvancedSearchParams from "../utils/getProductAdvancedSearchParams";
import ProductAdvancedSearchForm, { AdvancedProductSearchForm } from "./ProductAdvancedSearchForm";
import { ProductCategoryResponseData } from "../../../types/productCategory.types";
import { SupplierManufacturerResponseData } from "../../../types/supplierManufacturer.types";

const ProductAdvancedSearch = (props: {
    show: boolean,
    hideFunc: () => void
}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const prefix = "products";
    const advancedParams = getProductAdvancedSearchParams(searchParams);
    const hasAdvancedSearch = getObjectHasValue(advancedParams);

    const currentSearchParams = {
        category_id: advancedParams.category_id ? parseInt(advancedParams.category_id) : 0,
        supplier_id: advancedParams.supplier_id ? parseInt(advancedParams.supplier_id) : 0,
        manufacturer_id: advancedParams.manufacturer_id ? parseInt(advancedParams.manufacturer_id) : 0,
        size_or_model_like: advancedParams.size_or_model_like ? advancedParams.size_or_model_like : '',
        part_number_like: advancedParams.part_number_like ? advancedParams.part_number_like : '',
        catalogue_number_like: advancedParams.catalogue_number_like ? advancedParams.catalogue_number_like : '',
    }
    const [productCategoryData, setProductCategoryData] = useState<ProductCategoryResponseData>();
    const [supplierData, setSupplierData] = useState<SupplierManufacturerResponseData>();
    const [manufacturerData, setManufacturerData] = useState<SupplierManufacturerResponseData>();

    // Search States
    const [advancedSearchParams, setAdvancedSearchParams] = useState<AdvancedProductSearchForm>(currentSearchParams);

    useEffect(() => {
        setAdvancedSearchParams((prevState: any) => {
            return {
                ...prevState, 
                category_id: productCategoryData?.id
            }
        })
    }, [productCategoryData]);

    useEffect(() => {
        if (currentSearchParams.category_id === 0) {
            setProductCategoryData(undefined);
        }
    }, [currentSearchParams.category_id]);

    useEffect(() => {
        setAdvancedSearchParams((prevState: any) => {
            return {
                ...prevState, 
                supplier_id: supplierData?.id
            }
        })
    }, [supplierData]);

    useEffect(() => {
        if (currentSearchParams.supplier_id === 0) {
            setSupplierData(undefined);
        }
    }, [currentSearchParams.supplier_id]);

    useEffect(() => {
        setAdvancedSearchParams((prevState: any) => {
            return {
                ...prevState, 
                manufacturer_id: manufacturerData?.id
            }
        })
    }, [manufacturerData]);

    useEffect(() => {
        if (currentSearchParams.manufacturer_id === 0) {
            setManufacturerData(undefined);
        }
    }, [currentSearchParams.manufacturer_id]);

    useEffect(() => {
        setAdvancedSearchParams(currentSearchParams)
    }, [JSON.stringify(advancedParams)])

    const doSearch = (event?: FormEvent<HTMLFormElement>) => {
        event && event.preventDefault();
        updateAdvancedSearchParam(prefix, advancedSearchParams, searchParams, setSearchParams)
        props.hideFunc();
    }

    return (
        <WindowOverlay 
            title="Product Advanced Search"
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={500}
            footer={<AdvancedSearchFooter 
                resourceName="Products"
                hasAdvancedSearch={hasAdvancedSearch} 
                searchFunc={doSearch} 
                clearFunc={() => clearCustomerAdvancedSearchParams(searchParams, (searchParams) => setSearchParams(searchParams))}
            />}
        >
            <form
                onSubmit={doSearch}
            >
                <ProductAdvancedSearchForm
                    advancedSearchParams={advancedSearchParams}
                    setAdvancedSearchParams={setAdvancedSearchParams}
                    selectedProductCategory={productCategoryData}
                    setSelectedProductCategory={setProductCategoryData}    
                    selectedSupplier={supplierData}
                    setSelectedSupplier={setSupplierData}
                    selectedManufacturer={manufacturerData}
                    setSelectedManufacturer={setManufacturerData}
                />
                
            </form>
        </WindowOverlay>
        
    )
}

export default ProductAdvancedSearch