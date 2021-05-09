import gameTable from "../Utilities/Images/gametable.png"

const MAX_WIDTH = 1050;
const MAX_HEIGHT = 600;

const GameTable = (props) => {
    const cities = props.cities;

    const clickHandlerer = (e) => {
        const x = Math.round((e.nativeEvent.offsetX / MAX_WIDTH)*100);
        const y = Math.round((e.nativeEvent.offsetY / MAX_HEIGHT)*100);

        for(const city in cities) {
            const cityX = (Math.round(cities[city].x));
            const cityY = (Math.round(cities[city].y))
            if((cityX === x || (cityX >= x-3 && cityX <= x+3)) && (cityY === y || (cityY >= y-3 && cityY <= y+3))) {
                console.log("TALÁLAT " + cities[city].city);
                break;
            }
        }
    }
    return (
        <div>
            <img src={gameTable} width={MAX_WIDTH} height={MAX_HEIGHT} alt="Játéktábla" onClick={clickHandlerer}></img>
        </div>
    )
};

export default GameTable;

