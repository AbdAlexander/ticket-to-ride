import { useDispatch } from "react-redux";
import { destinationMouseEnter, destinationMouseLeave } from "../Redux/Actions/gamestateAction";

const PlayerHandDestinations = (props) => {
    const dispatch = useDispatch();
    //const connections = useSelector((state) => state.gamedata.connections);

    const long = props.longD;
    const normal = props.normalD;

    const longMouseEnter = () => {
        const dest = long[0];
        dispatch(destinationMouseEnter({dest}));
    };
    const normMouseEnter = (e) => {
        const dest = normal[e._targetInst.key];
        dispatch(destinationMouseEnter({dest}))
    }
    const MouseLeave = (e) => {
        dispatch(destinationMouseLeave())
    }
    const destinationClickHandlerer = (e) => {
        if(e.target.tagName === "STRONG") {
            e.target.parentElement.style.border = e.target.parentElement.style.border === "" ? "1px solid" : "";
        } else if(e.target.tagName === "LI") {
            e.target.style.border = e.target.style.border === "" ? "1px solid" : "";
        }
    }

    return (
        <div>
            <ul onClick={destinationClickHandlerer}>
                <li key={-1} onMouseEnter={longMouseEnter} onMouseLeave={MouseLeave}><strong>Hosszú: </strong>{long[0]?.fromCity} - {long[0]?.toCity} ({long[0]?.value}) [<strong> {long[0]?.done ? "Teljesítve" : "Teljesítetlen"} </strong>]</li>
                <div onMouseEnter={normMouseEnter} onMouseLeave={MouseLeave}>
                    {normal.map((d,i) =>
                        <li key={i}>
                            <strong>Rövid: </strong> {d.fromCity} - {d.toCity} ({d.value})  [<strong> {d.done ? "Teljesítve" : "Teljesítetlen"} </strong>]
                        </li>)
                    }
                </div>
            </ul>
        </div>
    )
}
export default PlayerHandDestinations;