function Spinner(){

    return(
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
    );
}

export default Spinner;