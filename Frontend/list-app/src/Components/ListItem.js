function ListItem({item}) {
    const launchYear = new Date(item.date_utc).getFullYear();
    return(
        <div className="list-item">
            
            <img 
                src={item.links.patch.small} 
                alt={item.name}
                className="image"
            />
            <div className="item-details">
                <span className="item-name">
                    Flight {item.flight_number}: {item.name} ({launchYear})
                </span>
                {
                    item.details ? 
                    <p className="item-description">
                        Details: {item.details}
                    </p> : 
                    <p className="item-description">
                        No description available
                    </p>
                }
            </div>
            
            
        </div>
    );
}

export default ListItem;