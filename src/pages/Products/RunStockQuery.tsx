import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SubmitButton from "../../components/form/SubmitButton/SubmitButton";
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import PaginationNavigation from "../../components/ui/PaginationNavigation/PaginationNavigation";
import Header from "../../components/ui/Structure/Header/Header";
import { ProductCollectionResponse } from "../../types/products.types";
import formatMoney from "../../utils/formatMoney";
import getAPI from "../../utils/getAPI";
import StockQueryEditor, { StockQueryParameters } from "./components/StockQueryEditor";
import ActionButton from "../../components/form/ActionButton/ActionButton";
import WindowOverlay from "../../components/ui/Containers/WindowOverlay/WindowOverlay";
import GridItem from "../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../components/ui/Containers/InfoGrid/InfoGrid";
import TextareaAutosize from "react-textarea-autosize";
import ContainerFooter from "../../components/ui/Containers/ContainerFooter/ContainerFooter";
import postAPI from "../../utils/postAPI";
import Skeleton from "../../components/ui/General/Skeleton/Skeleton";
import { ProductQueryResponseData } from "../../types/productQuery.types";
import ListWrapper from "../../components/ui/Containers/ListWrapper/ListWrapper";
import NoneFound from "../../components/ui/General/NoneFound/NoneFound";

const RunStockQuery = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const perPage = 50;

    const [parameters, setParameters] = useState<StockQueryParameters>({
        is_active: true
    });
    const [showSaveQuery, setShowSaveQuery] = useState(false);
    const [productData, setProductData] = useState<ProductCollectionResponse>();
    const [isProductsLoading, setIsProductsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        hasSearched && queryStock();
    }, [searchParams.get('offset')])


    const updateParameters = (name: string, value: any) => {
        setParameters(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const currentOffset = searchParams.get('offset');

    const createStockQuery = () => {
        postAPI('product_queries/create', {}, {
            name: name,
            description: description,
            ...parameters
        }, (response: any) => {
            const productQueryData: ProductQueryResponseData = response.data;
            navigate(`../${productQueryData.id}`)
        }, setIsSubmitting)
    }

    const runQueryStock = () => {
        let updatedSearchParams = new URLSearchParams(searchParams.toString());
        updatedSearchParams.set('offset', '0');
        setSearchParams(updatedSearchParams);
        setHasSearched(true);
        queryStock();
    }

    const queryStock = () => {
        getAPI('products', {
            is_sundry: parameters.is_sundry,
            is_active: parameters.is_active,
            is_stock: parameters.is_stock,
            description_like: parameters.description_like,
            unit_like: parameters.unit_like,
            size_or_model_like: parameters.size_or_model_like,
            price_greater_than: parameters.price_greater_than,
            price_less_than: parameters.price_less_than,
            selling_price_greater_than: parameters.selling_price_greater_than,
            selling_price_less_than: parameters.selling_price_less_than,
            stock_level_greater_than: parameters.stock_level_greater_than,
            stock_level_less_than: parameters.stock_level_less_than,
            percentage_discount_greater_than: parameters.percentage_discount_greater_than,
            percentage_discount_less_than: parameters.percentage_discount_less_than,
            percentage_markup_greater_than: parameters.percentage_markup_greater_than,
            percentage_markup_less_than: parameters.percentage_markup_less_than,
            perPage: perPage,
            offset: currentOffset
        }, (response: any) => {
            const productData: ProductCollectionResponse = response.data;
            setProductData(productData)
        }, setIsProductsLoading)
    }

    const headerText = !hasSearched ? `Run a stock query. Empty fields will be ignored.` : 'Query result.'

    const isDisabled = !(name.length > 0);

    const isLoading = (
        isProductsLoading
    )

    return (
        <>
            <Header
                links={[
                    {
                        to: 'stock',
                        text: 'Stock'
                    },
                    {
                        to: 'queries',
                        text: 'Queries'
                    },
                    {
                        to: 'run',
                        text: 'Run'
                    }
                ]}
            />
            <OuterContainer
                title='Run Stock Query'
                headerContent={headerText}
                stickyHeaderContent={<p style={{ fontSize: '0.85em' }}>{headerText}</p>}
                maxWidth={hasSearched ? 1400 : 600}
            >
                <div className="page-grid no-side">
                    <div className="page-main">
                        {!hasSearched ?
                            <>
                                <section>
                                    <StockQueryEditor
                                        startParameters={parameters}
                                        updateParameters={updateParameters}
                                    />
                                </section>
                                <div style={{ width: '100%', margin: 'var(--big-gap) 0 var(--big-gap)', borderBottom: '1px solid var(--high-contrast)'}}></div>
                                <section>
                                    <SubmitButton
                                        text='Run Query'
                                        clickFunc={runQueryStock}
                                    />
                                </section>
                            </> :
                            <>
                                <div style={{ 
                                    display: 'flex',
                                    gap: 'var(--normal-gap)',
                                    marginBottom: 'var(--normal-gap)',
                                    justifyContent: 'space-between'
                                }}>
                                    <ActionButton
                                        text='New Query'
                                        iconFont='arrow_back_ios'
                                        color='grey'
                                        clickFunc={() => {
                                            setHasSearched(false);
                                            setParameters({
                                                is_active: true
                                            });
                                        }}
                                    />
                                    <div style={{ 
                                        display: 'flex',
                                        gap: 'var(--normal-gap)',
                                        justifyContent: 'flex-end'
                                    }}>
                                        <ActionButton
                                            text='Save Query'
                                            iconFont='bookmark'
                                            color='light-green'
                                            clickFunc={() => setShowSaveQuery(true)}
                                        />
                                        <ActionButton
                                            text='Edit Query'
                                            iconFont='edit'
                                            color="orange"
                                            clickFunc={() => setHasSearched(false)}
                                        />
                                    </div>
                                </div>
                                {!isLoading && productData ?
                                    productData.data.length > 0 ?
                                        <>
                                            <div style={{ 
                                                display: 'flex',
                                                justifyContent: 'space-around',
                                                marginBottom: 'var(--normal-gap)'
                                            }}>
                                                <p style={{ fontWeight: 600 }}>Showing {currentOffset ? currentOffset : '0'}-{Math.min((currentOffset ? parseInt(currentOffset) : 0) + perPage, productData.total_count)} of {productData.total_count.toLocaleString()} products found.</p>
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
                            </>
                        }
                        {hasSearched && <div style={{ marginTop: 'var(--normal-gap)'}}>
                            {(!isLoading && productData) && <PaginationNavigation
                                data={productData.data}
                                totalCount={productData.total_count}
                                perPage={productData.pages.per_page}
                            />}
                        </div>}
                    </div>
                </div>
            </OuterContainer>

            <WindowOverlay
                title="Save Query"
                show={showSaveQuery}
                hideFunc={() => setShowSaveQuery(false)}
                maxWidth={600}
            >
                <InfoGrid>
                    <GridItem title='Query Name'>
                        <input 
                            type='text'
                            placeholder='Name...'
                            onChange={(e) => setName(e.target.value)}
                        />
                    </GridItem>
                    <GridItem title='Query Description'>
                        <TextareaAutosize
                            placeholder='Description...'
                            minRows={2}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </GridItem>
                </InfoGrid>
                <ContainerFooter>
                    <SubmitButton 
                        text="Save Query"
                        disabled={isDisabled}
                        submittingText="Saving..."
                        submitting={isSubmitting}
                        clickFunc={createStockQuery}
                    />
                </ContainerFooter>
            </WindowOverlay>
        </>
    )
}

export default RunStockQuery