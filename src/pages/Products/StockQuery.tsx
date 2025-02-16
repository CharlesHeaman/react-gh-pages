import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ActionButton from "../../components/form/ActionButton/ActionButton";
import ListWrapper from "../../components/ui/Containers/ListWrapper/ListWrapper";
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import NoneFound from "../../components/ui/General/NoneFound/NoneFound";
import Skeleton from "../../components/ui/General/Skeleton/Skeleton";
import PaginationNavigation from "../../components/ui/PaginationNavigation/PaginationNavigation";
import Header from "../../components/ui/Structure/Header/Header";
import { ProductQueryResponseData } from "../../types/productQuery.types";
import { ProductCollectionResponse } from "../../types/products.types";
import formatMoney from "../../utils/formatMoney";
import getAPI from "../../utils/getAPI";
import XLSX from 'sheetjs-style'
var FileSaver = require('file-saver'); 

const StockQuery = () => {
    const { productQueryID } = useParams();

    const [searchParams, setSearchParams] = useSearchParams();
    const [showAll, setShowAll] = useState(false);
    const perPage = 50;
    const [isProductQueryLoading, setIsProductQueryLoading] = useState(true);
    const [productQueryData, setProductQueryData] = useState<ProductQueryResponseData>();
    const [productData, setProductData] = useState<ProductCollectionResponse>();
    const [isProductsLoading, setIsProductsLoading] = useState(false);

    useEffect(() => {
        getProductQuery();
    }, [productQueryID, searchParams.get('offset'), showAll])

    const currentOffset = searchParams.get('offset');

    const exportToExcel = async () => {
        const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
        const ws = XLSX.utils.json_to_sheet(productData ? productData.data.map(product => {
            return {
                'Description': product.data.description,
                'Size/Model': product.data.size_or_model,
                'Unit': product.data.unit,
                'Price': product.data.price,
                'Sell Price': product.data.selling_price,
                'Stock Level': product.data.stock_level,
                'Discount': product.data.percentage_discount,
                'Markup': product.data.percentage_markup,
            }
        }) : []);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, 'test.xlsx')
    }

    const getProductQuery = () => {
        getAPI(`product_queries/${productQueryID}`, {}, (response: any) => {
            const productQueryData: ProductQueryResponseData = response.data;
            setProductQueryData(productQueryData);
            queryStock(productQueryData)
        }, setIsProductQueryLoading)
    }

    const queryStock = (productQuery: ProductQueryResponseData) => {
        getAPI('products', {
            perPage: showAll ? 10000 : perPage,
            offset: currentOffset,
            is_sundry: productQuery.data.is_sundry,
            is_active: productQuery.data.is_active,
            is_stock: productQuery.data.is_stock,
            description_like: productQuery.data.description_like,
            unit_like: productQuery.data.unit_like,
            size_or_model_like: productQuery.data.size_or_model_like,
            price_greater_than: productQuery.data.price_greater_than,
            price_less_than: productQuery.data.price_less_than,
            selling_price_greater_than: productQuery.data.selling_price_greater_than,
            selling_price_less_than: productQuery.data.selling_price_less_than,
            stock_level_greater_than: productQuery.data.stock_level_greater_than,
            stock_level_less_than: productQuery.data.stock_level_less_than,
            percentage_discount_greater_than: productQuery.data.percentage_discount_greater_than,
            percentage_discount_less_than: productQuery.data.percentage_discount_less_than,
            percentage_markup_greater_than: productQuery.data.percentage_markup_greater_than,
            percentage_markup_less_than: productQuery.data.percentage_markup_less_than,
        }, (response: any) => {
            const productData: ProductCollectionResponse = response.data;
            setProductData(productData)
        }, setIsProductsLoading)
    }

    const headerText = productQueryData && productQueryData.data.description;

    const isLoading = (
        isProductsLoading || 
        isProductQueryLoading
    )

    const headerLoading = (
        isProductQueryLoading
    )

    return (
        <>
            <OuterContainer
                title='Stock Query'
                id={productQueryID}
                headerContent={!headerLoading ?
                    headerText :
                    <Skeleton type="text" width={500}/>
                }
                maxWidth={1400}
            >
                <div className="page-grid no-side">
                    <div className="page-main">
                        {!isLoading && productData ?
                            productData.data.length > 0 ?
                                <>
                                    <div style={{ 
                                        display: 'flex',
                                        gap: 'var(--normal-gap)',
                                        marginBottom: 'var(--normal-gap)',
                                        justifyContent: 'flex-end'
                                    }}>
                                        {!showAll ? 
                                            <ActionButton
                                                text="Show All"
                                                color="no-color"
                                                iconFont="public"
                                                clickFunc={() => setShowAll(true)}
                                            /> : 
                                            <ActionButton
                                                text="Limit 50"
                                                color="no-color"
                                                iconFont="public_off"
                                                clickFunc={() => setShowAll(false)}
                                            />
                                        }
                                        <ActionButton
                                            text="Export Result"
                                            color="no-color"
                                            iconFont="file_download"
                                            clickFunc={exportToExcel}
                                        />
                                    </div>
                                    <div style={{ 
                                        display: 'flex',
                                        justifyContent: 'space-around',
                                        marginBottom: 'var(--normal-gap)'
                                    }}>
                                        <p style={{ fontWeight: 600 }}>Showing {showAll ? 'all' : `${currentOffset ? currentOffset : '0'}-${Math.min((currentOffset ? parseInt(currentOffset) : 0) + perPage, productData.total_count)} of`} {productData.total_count.toLocaleString()} products found.</p>
                                    </div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Description</th>
                                                <th>Size/Model</th>
                                                <th>Unit</th>
                                                <th>Price</th>
                                                <th>Sell Price</th>
                                                <th>Stock Level</th>
                                                <th>Discount</th>
                                                <th>Markup</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {productData.data.map((product, index) => 
                                                <tr
                                                    key={index}
                                                >
                                                    <td style={{ textAlign: 'left'}}>{product.data.description}</td>
                                                    <td style={{ textAlign: 'left'}}>{product.data.size_or_model}</td>
                                                    <td style={{ textAlign: 'left'}}>{product.data.unit}</td>
                                                    <td>{formatMoney(product.data.price)}</td>
                                                    <td>{formatMoney(product.data.selling_price)}</td>
                                                    <td>{product.data.stock_level}</td>
                                                    <td>{product.data.percentage_discount}%</td>
                                                    <td>{product.data.percentage_markup}%</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table> 
                                </> : 
                                <ListWrapper>
                                    <NoneFound
                                        text="No products found."
                                        iconFont="query_stats"
                                    />
                                </ListWrapper>
                            :
                            <>
                                <div style={{ 
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    marginBottom: 'var(--normal-gap)'
                                }}>
                                    <Skeleton type="small-title"/>
                                </div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Description</th>
                                            <th>Size/Model</th>
                                            <th>Unit</th>
                                            <th>Price</th>
                                            <th>Sell Price</th>
                                            <th>Stock Level</th>
                                            <th>Discount</th>
                                            <th>Markup</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[...Array(perPage)].map((_, index) => 
                                            <tr key={index}>                                                                                                                
                                                <td style={{ textAlign: 'left'}}><Skeleton type="text"/></td>
                                                <td style={{ textAlign: 'left'}}><Skeleton type="text"/></td>
                                                <td style={{ textAlign: 'left'}}><Skeleton type="text"/></td>
                                                <td><Skeleton type="text"/></td>
                                                <td><Skeleton type="text"/></td>
                                                <td><Skeleton type="text"/></td>
                                                <td><Skeleton type="text"/></td>
                                                <td><Skeleton type="text"/></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>    
                            </>
                        }                        
                        {<div style={{ marginTop: 'var(--normal-gap)'}}>
                            {(!isLoading && productData) && <PaginationNavigation
                                data={productData.data}
                                totalCount={productData.total_count}
                                perPage={productData.pages.per_page}
                            />}
                        </div>}
                    </div>
                </div>
            </OuterContainer>
        </>
    )
}

export default StockQuery