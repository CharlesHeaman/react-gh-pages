import { Fragment, ReactNode } from "react"
import InnerContainer from "../Containers/InnerContainer/InnerContainer"
import NoneFound from "../General/NoneFound/NoneFound"

const SearchTable = (props: {
    headers: Array<string>,
    isLoading?: boolean,
    skeletonRow: ReactNode,
    skeletonCount: number,
    body: ReactNode,
    footer?: ReactNode,
    count: number,
    selectTable?: boolean,
    resourceName: string,
    resourceIconFont: string,
    smallNoneFound?: boolean,
    noOutline?: boolean,
}) => {

    const tableHeader = <thead>
        <tr>
            {props.headers.map((header, index) => 
                <th key={index}>{header}</th>
            )}
        </tr>
    </thead>

    return (
        <div className="table-wrapper">
            {!props.isLoading ? 
                props.count > 0 ?
                    <table className={props.selectTable ? `selectTable` : ''}>
                        {tableHeader}
                        <tbody>
                            {props.body}
                        </tbody>
                        {props.footer ? 
                            <tfoot>
                                {props.footer}
                            </tfoot> :
                            null
                        }
                    </table>
                    : 
                    !props.smallNoneFound ?
                        <NoneFound
                            iconFont={props.resourceIconFont}
                            text={`No ${props.resourceName} found`}
                        /> :
                        !props.noOutline ?
                            <InnerContainer>
                                <NoneFound
                                    iconFont={props.resourceIconFont}
                                    text={`No ${props.resourceName} found`}
                                    small
                                />
                            </InnerContainer> : 
                            <NoneFound
                                iconFont={props.resourceIconFont}
                                text={`No ${props.resourceName} found`}
                                small
                            />
            :
            <table>
                {tableHeader}
                <tbody>
                    {[...Array(Math.min(props.skeletonCount, 25))].map((_, index) => 
                        <Fragment key={index}>{props.skeletonRow}</Fragment>
                    )}
                </tbody>
            </table>}
        </div>
    )
}

export default SearchTable