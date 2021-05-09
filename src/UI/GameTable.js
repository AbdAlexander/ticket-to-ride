import gameTable from "../Utilities/Images/gametable.png"

const GameTable = () => {

    const clickHandlerer = (e) => {
        console.log(e);
    }
    return (
        <div>
            <img src={gameTable} height="600" width="1050" alt="Játéktábla" onClick={clickHandlerer}></img>
        </div>
    )
};

export default GameTable;

