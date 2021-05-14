const PlayerHandDestinations = (props) => {
    const long = props.longD;
    const normal = props.normalD;
    
    return (
        <div>
            <ul>
                <li><strong>Hosszú: </strong>{long[0]?.fromCity} - {long[0]?.toCity} ({long[0]?.value}) [<strong> {long[0]?.done ? "Teljesítve" : "Teljesítetlen"} </strong>]</li>
                {normal.map((d,i) =>
                    <li key={i}>
                        <strong>Rövid: </strong> {d.fromCity} - {d.toCity} ({d.value})  [<strong> {d.done ? "Teljesítve" : "Teljesítetlen"} </strong>]
                    </li>)
                }
            </ul>
        </div>
    )
}
export default PlayerHandDestinations;