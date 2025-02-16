import InputLabelWrap from "../../../components/form/InputLabelWrap/InputLabelWrap";
import GridItem from "../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid";
import InnerContainer from "../../../components/ui/Containers/InnerContainer/InnerContainer";

export interface StockQueryParameters {
    is_active?: boolean,
    is_sundry?: boolean,
    is_stock?: boolean,
    description_like?: string,
    unit_like?: string,
    size_or_model_like?: string,
    price_greater_than?: number,
    price_less_than?: number,
    selling_price_greater_than?: number,
    selling_price_less_than?: number,
    percentage_discount_greater_than?: number,
    percentage_discount_less_than?: number,
    percentage_markup_greater_than?: number,
    percentage_markup_less_than?: number,
    days_since_last_requisition_greater_than?: number,
    days_since_last_requisition_less_than?: number,
    stock_level_greater_than?: number,
    stock_level_less_than?: number,
}

const StockQueryEditor = (props: {
    startParameters: StockQueryParameters,
    updateParameters: (name: string, value: any) => void
}) => {
    return (
        <>
            <InnerContainer title='Product Details' smallHeader collapsible startCollapsed={!(
                props.startParameters.is_active !== undefined || 
                props.startParameters.is_sundry !== undefined || 
                props.startParameters.description_like || 
                props.startParameters.unit_like || 
                props.startParameters.size_or_model_like
            )}>
                <InfoGrid>
                    <GridItem title='Activity Status' span={3}>
                        <select 
                            style={{ maxWidth: '180px'}}
                            onChange={(e) => props.updateParameters('is_active', e.target.value !== '-1' ? e.target.value === '1' : undefined)}
                        >
                            <option value={1} selected={props.startParameters.is_active}>Active</option>
                            <option value={0} selected={!props.startParameters.is_active}>Inactive</option>
                            <option value={-1} selected={props.startParameters.is_active === undefined}>Active/Inactive</option>
                        </select>
                    </GridItem>
                    <GridItem title='Sundry Item' span={3}>
                        <select 
                            style={{ maxWidth: '180px'}}
                            onChange={(e) => props.updateParameters('is_sundry', e.target.value !== '-1' ? e.target.value === '1' : undefined)}
                        >
                            <option value={1} selected={props.startParameters.is_sundry}>Sundry</option>
                            <option value={0} selected={!props.startParameters.is_sundry}>Not Sundry</option>
                            <option value={-1} selected={props.startParameters.is_sundry === undefined}>Sundry/Not Sundry</option>
                        </select>
                    </GridItem>
                    <GridItem title='Stock Item' span={3}>
                        <select 
                            style={{ maxWidth: '180px'}}
                            onChange={(e) => props.updateParameters('is_stock', e.target.value !== '-1' ? e.target.value === '1' : undefined)}
                        >
                            <option value={1} selected={props.startParameters.is_stock}>Stock</option>
                            <option value={0} selected={!props.startParameters.is_stock}>Not Stock</option>
                            <option value={-1} selected={props.startParameters.is_stock === undefined}>Stock/Not Stock</option>
                        </select>
                    </GridItem>
                    <GridItem title='Description Like'>
                        <input 
                            type='text' 
                            placeholder="Description..."
                            value={props.startParameters.description_like}
                            onChange={(e) => props.updateParameters('description_like', e.target.value.length > 0 ? e.target.value : undefined)}
                        />
                    </GridItem>
                    <GridItem title='Unit Like'>
                        <input 
                            type='text' 
                            placeholder="Unit..."
                            value={props.startParameters.unit_like}
                            onChange={(e) => props.updateParameters('unit_like', e.target.value.length > 0 ? e.target.value : undefined)}
                        />
                    </GridItem>
                    <GridItem title='Size or Model Like'>
                        <input 
                            type='text' 
                            placeholder="Size or Model..."
                            value={props.startParameters.size_or_model_like}
                            onChange={(e) => props.updateParameters('size_or_model_like', e.target.value.length > 0 ? e.target.value : undefined)}
                        />
                    </GridItem>
                </InfoGrid>
            </InnerContainer>
            <InnerContainer title='Stock Level' smallHeader collapsible startCollapsed={!(
                props.startParameters.stock_level_greater_than !== undefined || 
                props.startParameters.stock_level_less_than !== undefined
            )}>
                <InfoGrid>
                    <GridItem title='Stock Level Greater Than' span={3}>
                        <input 
                            style={{ maxWidth: '180px'}}
                            type='number' 
                            value={props.startParameters.stock_level_greater_than}
                            onChange={(e) => props.updateParameters('stock_level_greater_than', e.target.value.length > 0 ? parseFloat(e.target.value) : undefined)} 
                        />   
                    </GridItem>
                    <GridItem title='Stock Level Less Than' span={3}>
                        <input 
                            style={{ maxWidth: '180px'}}
                            type='number' 
                            value={props.startParameters.stock_level_less_than}
                            onChange={(e) => props.updateParameters('stock_level_less_than', e.target.value.length > 0 ? parseFloat(e.target.value) : undefined)} 
                        />  
                    </GridItem>
                </InfoGrid>
            </InnerContainer>
            <InnerContainer title='Product Price' smallHeader collapsible startCollapsed={!(
                props.startParameters.price_greater_than !== undefined ||
                props.startParameters.price_less_than !== undefined ||
                props.startParameters.selling_price_greater_than !== undefined || 
                props.startParameters.selling_price_less_than !== undefined
            )}>
                <InfoGrid>
                    <GridItem title='Price Greater Than' span={3}>
                        <InputLabelWrap
                            prefix='£'
                            maxWidth={180}
                        >
                            <input 
                                type='number'
                                value={props.startParameters.price_greater_than}
                                onChange={(e) => props.updateParameters('price_greater_than', e.target.value.length > 0 ? parseFloat(e.target.value) : undefined)} 
                            />
                        </InputLabelWrap>

                    </GridItem>
                    <GridItem title='Price Less Than' span={3}>
                        <InputLabelWrap
                            prefix='£'
                            maxWidth={180}
                        >
                            <input 
                                type='number'
                                value={props.startParameters.price_less_than}
                                onChange={(e) => props.updateParameters('price_less_than', e.target.value.length > 0 ? parseFloat(e.target.value) : undefined)} 
                            />
                        </InputLabelWrap>

                    </GridItem>
                    <GridItem title='Selling Price Greater Than' span={3}>
                        <InputLabelWrap
                            prefix='£'
                            maxWidth={180}
                        >
                            <input 
                                type='number'
                                value={props.startParameters.selling_price_greater_than}
                                onChange={(e) => props.updateParameters('selling_price_greater_than', e.target.value.length > 0 ? parseFloat(e.target.value) : undefined)} 
                            />
                        </InputLabelWrap>

                    </GridItem>
                    <GridItem title='Selling Price Less Than' span={3}>
                        <InputLabelWrap
                            prefix='£'
                            maxWidth={180}
                        >
                            <input 
                                type='number'
                                value={props.startParameters.selling_price_less_than}
                                onChange={(e) => props.updateParameters('selling_price_less_than', e.target.value.length > 0 ? parseFloat(e.target.value) : undefined)} 
                            />
                        </InputLabelWrap>

                    </GridItem>
                </InfoGrid>
            </InnerContainer>
            <InnerContainer title='Product Discount and Markup' smallHeader collapsible startCollapsed={!(
                props.startParameters.percentage_discount_greater_than !== undefined || 
                props.startParameters.percentage_discount_less_than !== undefined || 
                props.startParameters.percentage_markup_greater_than !== undefined || 
                props.startParameters.percentage_markup_less_than !== undefined
            )}>
                <InfoGrid>
                    <GridItem title='Percentage Discount Greater Than' span={3}>
                        <InputLabelWrap
                            suffix="%"
                            maxWidth={180}
                        >
                            <input 
                                type='number' 
                                value={props.startParameters.percentage_discount_greater_than}
                                onChange={(e) => props.updateParameters('percentage_discount_greater_than', e.target.value.length > 0 ? parseFloat(e.target.value) : undefined)} 
                            />
                        </InputLabelWrap>

                    </GridItem>
                    <GridItem title='Percentage Discount Less Than' span={3}>
                        <InputLabelWrap
                            suffix="%"
                            maxWidth={180}
                        >
                            <input 
                                type='number' 
                                value={props.startParameters.percentage_discount_less_than}
                                onChange={(e) => props.updateParameters('percentage_discount_less_than', e.target.value.length > 0 ? parseFloat(e.target.value) : undefined)} 
                            />
                        </InputLabelWrap>

                    </GridItem>
                    <GridItem title='Percentage Markup Greater Than' span={3}>
                        <InputLabelWrap
                            suffix="%"
                            maxWidth={180}
                        >
                            <input 
                                type='number' 
                                value={props.startParameters.percentage_markup_greater_than}
                                onChange={(e) => props.updateParameters('percentage_markup_greater_than', e.target.value.length > 0 ? parseFloat(e.target.value) : undefined)} 
                            />
                        </InputLabelWrap>

                    </GridItem>
                    <GridItem title='Percentage Markup Less Than' span={3}>
                        <InputLabelWrap
                            suffix="%"
                            maxWidth={180}
                        >
                            <input 
                                type='number' 
                                value={props.startParameters.percentage_markup_less_than}
                                onChange={(e) => props.updateParameters('percentage_markup_less_than', e.target.value.length > 0 ? parseFloat(e.target.value) : undefined)} 
                            />
                        </InputLabelWrap>

                    </GridItem>
                </InfoGrid>
            </InnerContainer>
            <InnerContainer title='Requisitions' smallHeader collapsible startCollapsed>
                <InfoGrid>
                    <GridItem title='Days Since Last Requisition Greater Than' span={3}>
                        <InputLabelWrap
                            suffix="days"
                            maxWidth={180}
                        >
                            <input 
                                type='number' 
                                value={props.startParameters.days_since_last_requisition_greater_than}
                                onChange={(e) => props.updateParameters('days_since_last_requisition_greater_than', e.target.value.length > 0 ? parseFloat(e.target.value) : undefined)}
                            />
                        </InputLabelWrap>
                    </GridItem>
                    <GridItem title='Days Since Last Requisition Less Than' span={3}>
                        <InputLabelWrap
                            suffix="days"
                            maxWidth={180}
                        >
                            <input 
                                type='number' 
                                value={props.startParameters.days_since_last_requisition_less_than}
                                onChange={(e) => props.updateParameters('days_since_last_requisition_less_than', e.target.value.length > 0 ? parseFloat(e.target.value) : undefined)}
                                />
                        </InputLabelWrap>
                    </GridItem>
                </InfoGrid>
            </InnerContainer>
        </>
    )
}

export default StockQueryEditor