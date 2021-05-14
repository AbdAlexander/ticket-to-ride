import { useSelector } from "react-redux"

const Backlog = () => {
    const backlog = useSelector((state) => state.gamestate.backlog);
    if(backlog.length > 5) {
        backlog.reverse();
        backlog.pop();
        backlog.reverse();
    }
    //backlog.reverse(); //Legyen fent mindig a legutolsó lépés


    const backlogStyle = {
        height:190,
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
                <h5>Előző 5 lépés</h5>
                <ul>
                    {backlog.map((m,i) => <li key={i}>{m}</li>)} 
                </ul>
            </div>
        </div>
    )
}
export default Backlog;