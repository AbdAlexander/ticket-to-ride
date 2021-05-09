import yellow from "../Utilities/Railway_Carrrige_Cards/yellow.png"
import red from "../Utilities/Railway_Carrrige_Cards/red.png"
import white from "../Utilities/Railway_Carrrige_Cards/white.png"
import purple from "../Utilities/Railway_Carrrige_Cards/purple.png"
import orange from "../Utilities/Railway_Carrrige_Cards/orange.png"
import green from "../Utilities/Railway_Carrrige_Cards/green.png"
import blue from "../Utilities/Railway_Carrrige_Cards/blue.png"
import black from "../Utilities/Railway_Carrrige_Cards/black.png"

class Card { 
    constructor(type) {
        this.type = type;
        if(this.type===0)            this.image = <img src={yellow} height="90" width="200" alt="Sárga vasútkocsi"></img>
        else if(this.type===1)       this.image = <img src={red} height="90" width="200" alt="Piros vasútkocsi"></img>
        else if(this.type===2)       this.image = <img src={white} height="90" width="200" alt="Fehér vasútkocsi"></img>
        else if(this.type===3)       this.image = <img src={purple} height="90" width="200" alt="Lila vasútkocsi"></img>
        else if(this.type===4)       this.image = <img src={orange} height="90" width="200" alt="Narancssárga vasútkocsi"></img>
        else if(this.type===5)       this.image = <img src={green} height="90" width="200" alt="Zold vasútkocsi"></img>
        else if(this.type===6)       this.image = <img src={blue} height="90" width="200" alt="Kék vasútkocsi"></img>
        else if(this.type===7)       this.image = <img src={black} height="90" width="200" alt="Fekete vasútkocsi"></img>
    }
}

export default Card;