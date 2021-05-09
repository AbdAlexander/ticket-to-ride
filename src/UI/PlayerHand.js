import { Col, Row } from "react-bootstrap"
import PlayerHandDestinations from "./PlayerHandDestinations"

const PlayerHand = () => {
    const handStyle = {
        height:180,
        width:1050,
        backgroundColor: "#FF8D3E", 
        borderRadius:50,
    }
    const handDataStyle = {
        paddingLeft: 40,
        paddingTop: 10
    }

    return (
        <div style={handStyle}>
            <h3 style={handDataStyle}>Gabi asztala</h3>
            <Row>
                <Col style={{paddingLeft: 25}}> <PlayerHandDestinations/> </Col>
                <Col style={{paddingRight: 700}}>Vasútkocsikártyák</Col>
            </Row>
        </div>
    )
}
export default PlayerHand;