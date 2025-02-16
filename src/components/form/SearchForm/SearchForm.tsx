import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from './SearchForm.module.css';
const SearchForm = (props: {
    placeHolder: string,
    showAdvancedSearch?: () => void,
    prefix: string,
    hasAdvancedSearch?: boolean,
}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchParam = searchParams.get(`${props.prefix}_search`)
    const [searchTerm, setSearchTerm] = useState(searchParam ? searchParam : '');

    useEffect(() => {
        setSearchTerm(searchParam ? searchParam : '')
    }, [searchParam])

    const doSearch = (event?: FormEvent<HTMLFormElement>) => {
        event && event.preventDefault();
        searchParams.delete(`${props.prefix}_offset`);
        searchParams.delete(`${props.prefix}_per_page`);
        searchParams.set(`${props.prefix}_search`, searchTerm);
        searchParams.set(`${props.prefix}_has_searched`, "true")
        setSearchParams(searchParams, { replace: true });
    }

    return (
        <div className={`${styles['formWrapper']} ${props.showAdvancedSearch ? '' : styles['no-advanced']}`}>
            <form 
                onSubmit={doSearch} 
                style={{ 
                    display: 'flex',
                    width: '100%'
                }}
            >
                <label className={styles['searchWrapper']}>
                    <span className={`material-icons ${styles['searchIcon']}`}>search</span>
                    <input 
                        type='text'
                        value={searchTerm}
                        placeholder={props.placeHolder}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        autoFocus
                    />
                </label>
                <button
                    type="button"
                    onClick={() => doSearch()}
                    className={styles['searchButton']}
                >
                    Search
                </button>
                {props.showAdvancedSearch !== undefined ? 
                    <button 
                        type="button" 
                        onClick={(e) => {
                            e.preventDefault();
                            props.showAdvancedSearch && props.showAdvancedSearch();
                        }} 
                        className={`${styles['advancedSearchButton']} ${props.hasAdvancedSearch ? styles['highlight'] : ''}`}
                    >
                        <span className="material-icons">tune</span>
                    </button> 
                    : null
                }
            </form>
        </div>
    )
}

export default SearchForm