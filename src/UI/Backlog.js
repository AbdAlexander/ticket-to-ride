const Backlog = () => {
    const backlogStyle = {
        height:180,
        width:350,
        backgroundColor: "#e6e6e6", 
        borderRadius:50,
        opacity: 0.9
    }
    const backlogStringStyle = {
        paddingLeft: 25,
        paddingTop: 10,
    }
    return (
        <div style={backlogStyle}>
            <div style={backlogStringStyle}>
                <h5>Játéktörténet</h5>
                <ul>
                    <li>Lépés 1</li>
                    <li>Lépés 2</li>
                    <li>Lépés 3</li>
                    <li>Lépés 4</li>
                    <li>Lépés 5</li>    
                </ul>
            </div>
        </div>
    )
}
export default Backlog;