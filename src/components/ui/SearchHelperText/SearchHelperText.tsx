const SearchHelperText = (props: {
    iconFont: string,
    text: string,
    showAdvanced?: () => void
}) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', padding: 'var(--large-gap)'}}>
            <span className="material-icons" style={{ fontSize: '96px'}}>{props.iconFont}</span>
            <h2 style={{ textAlign: 'center'}}>
                {props.text} 
                {props.showAdvanced ? <> or use the <a onClick={props.showAdvanced}>advanced search</a></> : null}
            </h2>
        </div>
    )
}

export default SearchHelperText