import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useExport } from "../../../auth/export";
import ActionButton from "../../form/ActionButton/ActionButton";
import ExportTableData from "./ExportTableData";
import styles from "./PaginationNavigation.module.css";
import PerPageSelect from "./PerPageSelect";

const PaginationNavigation = (props: {
    data: Array<any>,
    totalCount: number,
    perPage: number,
    prefix: string,
    resourceName: string,
}) => {
    const exportFunc = useExport();

    const [showExport, setShowExport] = useState(false);
    const [queuedPDF, setQueuedPDF] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const offsetParameter = searchParams.get(`${props.prefix}_offset`);
    const currentOffset = offsetParameter ? parseInt(offsetParameter) : 0;
    const perPageParameter = searchParams.get(`${props.prefix}_per_page`);
    const currentPerPage = perPageParameter ? parseInt(perPageParameter) : 25;
    const noOfPages = Math.ceil(props.totalCount / props.perPage);
    const currentPage = Math.floor(currentOffset / props.perPage);

    useEffect(() => {
        if (!queuedPDF) return;
        if (exportFunc) {
            exportFunc.exportToPDF(props.resourceName);
        }
        setQueuedPDF(false);
    }, [showExport]);

    const canGoPrevious = () => {
        return currentOffset > 0
    }

    const canGoNext = () => {
        return currentOffset < props.totalCount - props.perPage
    }

    const showPageNav = (pageNumber: number) => {
        return (
            (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2) ||
            pageNumber <= 1 || 
            pageNumber >= noOfPages - 2
        )
    }

    const showGap = (pageNumber: number) => {
        return showPageNav(pageNumber - 1)
    }

    const updateOffset = (newOffset: string) => {
        let updatedSearchParams = new URLSearchParams(searchParams.toString());
        updatedSearchParams.set(`${props.prefix}_offset`, newOffset);
        setSearchParams(updatedSearchParams);
    }

    const updatePerPage = (newPerPage: string) => {
        let updatedSearchParams = new URLSearchParams(searchParams.toString());
        updatedSearchParams.set(`${props.prefix}_per_page`, newPerPage);
        setSearchParams(updatedSearchParams);
    }

    return (
        <>
            {props.totalCount > 0 ? <div className={styles['pagination-navigation']}>
                <div className={styles['per-page-count-wrapper']}>
                    <div style={{ display: 'flex', gap: 'var(--large-gap)' }}>
                        <div className={styles['count-wrapper']}>
                            <p>
                                Displaying {
                                    props.totalCount <= currentPerPage ?
                                        'all' 
                                        :
                                        <>
                                            <b>{`${currentOffset ? currentOffset + 1 : '1'}-${Math.min((currentOffset ? currentOffset : 0) + currentPerPage, props.totalCount)}`}</b> of
                                        </>
                                } <b>{props.totalCount.toLocaleString()}</b> {props.resourceName}</p>
                        </div>
                        {props.totalCount > 25 ? <div className={styles['per-page-selection-wrapper']}>
                            <PerPageSelect
                                selectedPerPage={props.perPage}
                                setSelectedPerPage={(perPage: number) => updatePerPage(perPage.toString())}
                            />
                        </div> : null}
                    </div>
                    <div>
                        <ActionButton 
                            text={"Export"} 
                            color={"no-color"} 
                            iconFont="file_download"
                            clickFunc={() => setShowExport(true)}
                        />
                    </div>
                </div>
                {props.totalCount > props.perPage ? <div className={styles['page-selection']}>
                    <button 
                        onClick={() => {
                            canGoPrevious() && updateOffset(Math.max(currentOffset - props.perPage, 0).toString())
                        }}
                        className={`
                            ${styles['previous-page']} 
                            ${styles['nav-item']}
                            ${!canGoPrevious() && styles['disabled']}
                        `}
                    >
                        <span className="material-icons">navigate_before</span> 
                        Previous
                    </button>
                    {[...Array(noOfPages)].map((_, index) => 
                        showPageNav(index) ?
                            <button 
                                onClick={() => updateOffset((index * props.perPage).toString())}
                                className={`
                                    ${currentPage === index && styles['active']}
                                    ${styles['nav-item']}
                                `}
                                key={index}
                            >
                                {index + 1}
                            </button> :
                            showGap(index) ? 
                                <span className={`${styles['gap']} material-icons`} key={index}>...</span> : 
                                null
                        
                    )}
                    <button 
                        onClick={() => {
                            canGoNext() && updateOffset(Math.min(currentOffset + props.perPage, props.totalCount - 1).toString())
                        }}
                        className={`
                            ${styles['next-page']} 
                            ${styles['nav-item']}
                            ${!canGoNext() && styles['disabled']}
                        `}
                    >
                        Next 
                        <span className="material-icons">navigate_next</span> 
                    </button>
                </div> : null}
            </div> : null}

            {exportFunc && (
                <ExportTableData
                    show={showExport}
                    hideFunc={() => setShowExport(false)}
                    exportToExcel={() => exportFunc.exportTableToExcel(props.data, props.resourceName)}
                    exportToJSON={() => exportFunc.exportTableToJSON(props.data, props.resourceName)}
                    exportToPDF={() => setQueuedPDF(true)}
                />
            )}
        </>
    )
}

export default PaginationNavigation