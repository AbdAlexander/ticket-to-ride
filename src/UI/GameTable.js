import { Button } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import gametablepng from "../Utilities/Images/gametable.png"
import {    finishBuilding,
            startBuilding,
            finishBuildingPeriod, 
            failedBuild, 
            changeLocomotiveToRailwayCarrigeCard } from "../Redux/Actions/gamestateAction";

const MAX_WIDTH = 1050;
const MAX_HEIGHT = 600;

const GameTable = (props) => {
    const gamedata = useSelector((state) => state.gamestate.gamedata);
    const cities = useSelector((state) => state.gamestate.gamedata.cities);
    const connections = useSelector((state) => state.gamestate.gamedata.connections);
    const ldPair = useSelector((state) => state.gamestate?.ldPair);
    const players = useSelector((state) => state.gamestate.onlinePlayers);
    const gamestate = useSelector((state) => state.gamestate);
    const backlog = useSelector((state) => state.gamestate.backlog);
    const clientName = useSelector((state) => state.clientname.name);

    const canvas = useRef(null);
    const [image, setImage] = useState(null);
    const [trigger, setTrigger] = useState(null);
    const [stopRerender, setSR] = useState(false);
    const [chosedCityFrom, setCCF] = useState(null);
    const [chosedCityTo, setCCT] = useState(null);
    const [display, setDisplay] = useState('none');
    const dispatch = useDispatch();

    let [totalConnectionsFromCity, setTCFC] = useState([]);

    let actualPlayer = gamestate.players.player1;
    for(const playerIndex in players) {
        if(players[playerIndex].name === clientName) {
            actualPlayer = players[playerIndex];
            break;
        }
    }
    
    useEffect(() => {
        const tableimg = new Image();
        tableimg.src = gametablepng;
        tableimg.onload = () => setImage(tableimg);
    }, []);

    useEffect(() => {
        if(image && canvas) {
            const ctx = canvas.current.getContext("2d");
            ctx.drawImage(image, 0, 0);
        }
        if(ldPair) {
            let from;
            let to;
            
            for(const city in cities) {
                if(city === ldPair[0]) {
                    from = cities[city];
                }
                if(city === ldPair[1]) {
                    to = cities[city];
                }
            }

            
            const fromX = (from?.x * MAX_WIDTH)/100;
            const fromY = (from?.y * MAX_HEIGHT)/100;
            const toX = (to?.x * MAX_WIDTH)/100;
            const toY = (to?.y * MAX_HEIGHT)/100;
            
            const ctxFrom = canvas.current.getContext("2d");
            ctxFrom.beginPath();
            ctxFrom.arc(fromX,fromY,15,0, 2 * Math.PI);
            ctxFrom.fillStyle = "red";
            ctxFrom.fill();
            ctxFrom.stroke();
            const ctxTo = canvas.current.getContext("2d");
            ctxTo.beginPath();
            ctxTo.arc(toX,toY,15,0, 2 * Math.PI);
            ctxTo.fillStyle = "blue";
            ctxTo.fill();
            ctxTo.stroke();
            //setSR(true);
        }
        if(trigger) {
            setSR(false);
            setTrigger(false);
            setSR(true);
            setCCT(null);
            setCCF(null)
        }
        if(gamestate.onlinePlayers) {
            for(const p in gamestate.onlinePlayers) {
                for(const c in gamestate.onlinePlayers[p]?.doneConnections) {
                    gamestate.onlinePlayers[p].doneConnections[c].map((e) => {
                        for(const element in e.elements) {
                            const x = (e.elements[element].x * MAX_WIDTH) / 100;
                            const y = (e.elements[element].y * MAX_HEIGHT) / 100;
                            const ctx = canvas.current.getContext("2d");
                            ctx.beginPath();
                            ctx.arc(x,y,8,0, 2 * Math.PI);
                            ctx.fillStyle = gamestate.onlinePlayers[p].color;
                            ctx.fill();
                            ctx.stroke()
                        }
                    });
                }
            }
        }
    }, [image,canvas,ldPair,cities,trigger, totalConnectionsFromCity, stopRerender, actualPlayer, gamestate.onlinePlayers]);


    const clickHandlerer = (e) => {
        if(!actualPlayer.isSelected) {
            alert("Most nem a te köröd van, így nem építkezhetsz!");
            return;
        }

        if(actualPlayer.drawCount > 0) {
            alert("Már húztál egy lapot, nem kezdhetsz neki építkezésnek!");
            return;
        }
        if(gamestate.state === "INITAL") {
            alert("A játék még nem kezdődött el, így építeni sem lehet!");
            return;
        }

        const x = Math.round((e.nativeEvent.offsetX / MAX_WIDTH)*100);
        const y = Math.round((e.nativeEvent.offsetY / MAX_HEIGHT)*100);

        if(chosedCityFrom == null && chosedCityTo == null) {
            for(const city in cities) {
                const cityX = (Math.round(cities[city].x));
                const cityY = (Math.round(cities[city].y))
                if((cityX === x || (cityX >= x-3 && cityX <= x+3)) && (cityY === y || (cityY >= y-3 && cityY <= y+3))) {
                    setCCF(cities[city]);
                    dispatch(startBuilding({actualPlayer}));
                    break;
                }
            }
        } else if(chosedCityFrom != null && chosedCityTo == null) {
            for(const city in cities) {
                const cityX = (Math.round(cities[city].x));
                const cityY = (Math.round(cities[city].y))
                if((cityX === x || (cityX >= x-3 && cityX <= x+3)) && (cityY === y || (cityY >= y-3 && cityY <= y+3))) {
                    setCCT(cities[city]);
                    setDisplay("block");
                    dispatch(finishBuilding({actualPlayer}))
                    break;
                }
            }
        }

    }
    const finishBuildingState = () => {
        if(!actualPlayer.isSelected) {
            alert("Most nem a te köröd van, így nem húzhatsz építkezhetsz vagy fejezheted be az építési fázist!");
            return;
        }
        
        if(chosedCityFrom != null && chosedCityTo != null) {
            let TMPtotalConnectionsFromCity = [];
            for(const c in connections) {
                if((connections[c].from === chosedCityFrom?.id && connections[c].to === chosedCityTo?.id)
                || (connections[c].from === chosedCityTo?.id && connections[c].to === chosedCityFrom?.id)) {
                    TMPtotalConnectionsFromCity.push(connections[c]);
                }
            }
            if(TMPtotalConnectionsFromCity.length === 0) {
                dispatch(failedBuild({backlog,actualPlayer}));
                alert(`HIBA: Csak szomszédos városokat lehet összekötni!`);
                setDisplay("none");
                setCCT(null); setCCF(null)
                return;
            }
            if(TMPtotalConnectionsFromCity[0].done) {
                dispatch(failedBuild({backlog,actualPlayer}));
                alert("Ez az útvonal már elkészült!");
                setDisplay("none");
                setCCT(null); setCCF(null);
                return;
            }
 
            let neededVagons = 0;
            let neededColor = "";
            let neededLocomotives = 0;
            for(const c in TMPtotalConnectionsFromCity) {
                neededColor = TMPtotalConnectionsFromCity[c].color;
                neededLocomotives = TMPtotalConnectionsFromCity[c].locomotive;
                for(const e in TMPtotalConnectionsFromCity[c].elements) {
                    console.log(e);
                    neededVagons++;
                }
            }

            if(neededVagons > actualPlayer.vagons) {
                dispatch(failedBuild({backlog,actualPlayer}));
                alert(`HIBA: Ez az út ${neededVagons} vagont igényel, neked ${actualPlayer.vagons} van!`);
                setDisplay("none");
                setCCT(null); setCCF(null)
                return;
            }
        
            if(neededColor === "gray") {
                let answer = prompt(`Ez az út ${neededVagons} db szürke vagont igényel. Melyik színű vonatkocsi-kártyákat használod el?\nBeírható színek: purple, white, blue, yellow, orange, black, red, green`);
                if(answer === null || answer === "" 
                    || (answer !== "purple" && answer !== "white" && answer !== "white" && answer !== "blue" && answer !== "yellow" 
                        && answer !== "orange" && answer !== "black" && answer !== "red" && answer !== "green")) {

                    dispatch(failedBuild({backlog,actualPlayer}));
                    alert(`HIBA: Téves szín!\nBeírt szín: ${answer}\nBeírható színek: purple, white, blue, yellow, orange, black, red, green`);
                    setDisplay("none");
                    setCCT(null); setCCF(null)
                    return;

                } else {
                    neededColor = answer;
                }
            }
            let cardsCount = {
                purple:0,
                white:0,
                blue:0,
                yellow:0,
                orange:0,
                black:0,
                red:0,
                green:0,
                joker:0
            }
            for(const c in actualPlayer.cards) {
                for(const n in cardsCount) {
                    if(actualPlayer.cards[c].color === n) {
                        cardsCount[n]++;
                    }
                }
            }

            if(neededLocomotives > cardsCount.joker) {
                dispatch(failedBuild({backlog,actualPlayer}));
                alert(`HIBA: Ez az út ${neededLocomotives} mozdonyt igényel, neked ${cardsCount.joker} van!`);
                setDisplay("none");
                setCCT(null); setCCF(null)
                return;
            }
            for(const color in cardsCount) {
                if(color === neededColor && neededVagons > cardsCount[color]) {
                    if(cardsCount.joker > 0) {
                        if(window.confirm("Neked ehhez az út megépítéséhez, nincs elég vasútkocsi-kártyád, de megpróbálhatod felhaszálni a mozdonyaidat az út megépítésére.\nSzeretnél használni mozdonyokat az út megépítéséhez?")) {
                            let answer = prompt(`Neked összesesen ${cardsCount.joker} mozdonyod van.\nHány mozdonykártyát változtatsz át ${color} típusú vasútkocsi-kártyává?`);
                            if(answer !== null && answer !== "" && parseInt(answer) <= cardsCount.joker) {
                                alert(`Sikeresen átváltoztattad ${answer} mozdonyodat ${color} típusú vasútkocsi-kártyára`);
                                cardsCount.joker -= answer; 
                                cardsCount[color] += answer;
                                dispatch(changeLocomotiveToRailwayCarrigeCard({color,actualPlayer,answer}));
                                //Számosság megváltozik, illetve a kártyák is a dispatch hatására, majd a program futása folytatódik az utolsó if-nél
    
                            } else {
                                dispatch(failedBuild({backlog,actualPlayer}));
                                alert(`Hibásan válaszoltál, kérlek próbáld meg újra az építést!\nVálaszként egy számot írhatsz, és az nem lehet nagyobb, mint mozdonyaid száma`);
                                setDisplay("none");
                                setCCT(null); setCCF(null)
                                return;
                            }
                        } else {
                            dispatch(failedBuild({backlog,actualPlayer}));
                            alert(`HIBA: Ez az út ${neededVagons} db ${neededColor} színű vasútkocsi-kártyát igényel, neked ${cardsCount[color]} db ${color} színűd van!`);
                            setDisplay("none");
                            setCCT(null); setCCF(null)
                            return;
                        }

                    } else {
                        dispatch(failedBuild({backlog,actualPlayer}));
                        alert(`HIBA: Ez az út ${neededVagons} db ${neededColor} színű vasútkocsi-kártyát igényel, neked ${cardsCount[color]} db ${color} színűd van!`);
                        setDisplay("none");
                        setCCT(null); setCCF(null);
                        return;
                    }
                }
                if(color === neededColor && neededVagons <= cardsCount[color] && neededLocomotives <= cardsCount.joker) { 
                    setTCFC(TMPtotalConnectionsFromCity);
                    setTrigger(true);
                    setDisplay("none");
                    dispatch(finishBuildingPeriod({
                        players,
                        actualPlayer, 
                        backlog, 
                        TMPtotalConnectionsFromCity, 
                        neededColor, 
                        neededVagons, 
                        neededLocomotives, 
                        gamedata
                    }));
                    break;
                }
            }
        }

    }

    return (
        <div>
            <Button variant="success" size="lg" block onClick={finishBuildingState} style={{display: display}}>Építés befejezés</Button>
            <canvas ref={canvas} width={MAX_WIDTH} height={MAX_HEIGHT} onClick={clickHandlerer}/>
        </div>
    )
};

export default GameTable;

