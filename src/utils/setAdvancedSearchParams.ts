const updateAdvancedSearchParam = (
    prefix: string,
    advancedSearchParams: object,
    searchParams: URLSearchParams, 
    setSearchParams: (searchParams: URLSearchParams) => void
) => {
    searchParams.delete(`${prefix}_offset`);
    searchParams.delete(`${prefix}_per_page`);
    searchParams.set(`${prefix}_has_searched`, "true");
    for (const [key, value] of Object.entries(advancedSearchParams)) {
        value ?
            searchParams.set(`${prefix}_${key}`, value) :
            searchParams.delete(`${prefix}_${key}`);
        }
    setSearchParams(searchParams);
}

export default updateAdvancedSearchParam