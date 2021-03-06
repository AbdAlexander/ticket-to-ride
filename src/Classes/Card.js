import yellow from "../Utilities/Railway_Carrrige_Cards/yellow.png"
import red from "../Utilities/Railway_Carrrige_Cards/red.png"
import white from "../Utilities/Railway_Carrrige_Cards/white.png"
import purple from "../Utilities/Railway_Carrrige_Cards/purple.png"
import orange from "../Utilities/Railway_Carrrige_Cards/orange.png"
import green from "../Utilities/Railway_Carrrige_Cards/green.png"
import blue from "../Utilities/Railway_Carrrige_Cards/blue.png"
import black from "../Utilities/Railway_Carrrige_Cards/black.png"
import locomotive from "../Utilities/Railway_Carrrige_Cards/locomotive.png"

class Card { 
    constructor(type) {
        this.type = type;
        
        if(this.type===0)            {this.image = <img src={yellow} height="90" width="200" alt="Sárga vasútkocsi"></img>; this.color="yellow"}
        else if(this.type===1)       {this.image = <img src={red} height="90" width="200" alt="Piros vasútkocsi"></img>; this.color="red"}
        else if(this.type===2)       {this.image = <img src={white} height="90" width="200" alt="Fehér vasútkocsi"></img>; this.color="white"}
        else if(this.type===3)       {this.image = <img src={purple} height="90" width="200" alt="Lila vasútkocsi"></img>; this.color="purple"}
        else if(this.type===4)       {this.image = <img src={orange} height="90" width="200" alt="Narancssárga vasútkocsi"></img>; this.color="orange"}
        else if(this.type===5)       {this.image = <img src={green} height="90" width="200" alt="Zöld vasútkocsi"></img>; this.color="green"}
        else if(this.type===6)       {this.image = <img src={blue} height="90" width="200" alt="Kék vasútkocsi"></img>; this.color="blue"}
        else if(this.type===7)       {this.image = <img src={black} height="90" width="200" alt="Fekete vasútkocsi"></img>; this.color="black"}
        else if(this.type===8)       {this.image = <img src={locomotive} height="90" width="195" alt="Mozdony"></img>; this.color="joker"}
    }
    getSrc(type) { 
        if(type===0)            return <img src={yellow} height="135" width="160" alt="Sárga vasútkocsi"></img>
        else if(type===1)       return <img src={red} height="135" width="160" alt="Piros vasútkocsi"></img>
        else if(type===2)       return <img src={white} height="135" width="160" alt="Fehér vasútkocsi"></img>
        else if(type===3)       return <img src={purple} height="135" width="160" alt="Lila vasútkocsi"></img>
        else if(type===4)       return <img src={orange} height="135" width="160" alt="Narancssárga vasútkocsi"></img>
        else if(type===5)       return <img src={green} height="135" width="160" alt="Zöld vasútkocsi"></img>
        else if(type===6)       return <img src={blue} height="135" width="160" alt="Kék vasútkocsi"></img>
        else if(type===7)       return <img src={black} height="135" width="160" alt="Fekete vasútkocsi"></img>
        else if(type===8)       return <img src={locomotive} height="135" width="160" alt="Mozdony"></img> 
    }
}

export default Card;