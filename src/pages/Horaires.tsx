import { IonButton, IonButtons, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonNote, IonPage, IonRadio, IonRadioGroup, IonRow, IonTitle, IonToolbar, useIonPicker } from '@ionic/react';
import './Horaires.css';
import React, { useEffect, useState } from 'react';
import { Http, HttpResponse } from '@capacitor-community/http';
import { reload } from 'ionicons/icons';
import { Link } from 'react-router-dom';


const Horaires: React.FC = () => {
  const axios = require('axios');


  const[AGH, setAGH] = useState("");
  const[ALP, setALP] = useState("");
  const[BPF, setBPF] = useState("");
  const[BLP, setBLP] = useState("");

  useEffect(()=>{
    doPost('alp');
    doPost('agh');
    doPost('blp');
    doPost('bpf');
  },[])

  // Example of a GET request
  const doPost = async (arret:string) => {

    let link = "https://www.transports-lia.fr/fr/NextDeparture/PhysicalStop";
    let payload = "";

    switch(arret){
      case "alp": payload = "destinations=%5B%7B%22JourneyIds%22%3A%5B17114%5D%2C%22CssClass%22%3A%22colorDest_0%22%2C%22Name%22%3A%22La+Plage%22%2C%22Hide%22%3Afalse%7D%5D&physicalId=4000&lineId=419&sens=1";
                  break;
      case "agh": payload = 'destinations=%5B%7B%22JourneyIds%22%3A%5B17115%5D%2C%22CssClass%22%3A%22colorDest_0%22%2C%22Name%22%3A%22Grand+Hameau%22%2C%22Hide%22%3Afalse%7D%5D&physicalId=3999&lineId=419&sens=2'
                  break;
      case "blp": payload = "destinations=%5B%7B%22JourneyIds%22%3A%5B17118%5D%2C%22CssClass%22%3A%22colorDest_0%22%2C%22Name%22%3A%22La+Plage%22%2C%22Hide%22%3Afalse%7D%5D&physicalId=4000&lineId=425&sens=1"; 
                  break;
      case "bpf": payload = "destinations=%5B%7B%22JourneyIds%22%3A%5B17119%5D%2C%22CssClass%22%3A%22colorDest_0%22%2C%22Name%22%3A%22Pr%C3%A9+Fleuri%22%2C%22Hide%22%3Afalse%7D%5D&physicalId=3999&lineId=425&sens=2"; 
                  break;
    }
    const options = {
      url: link,
      data: new Object(payload),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
    };

    const response: HttpResponse = await Http.post(options);
    switch(arret){
      case "agh": setAGH(response.data); break;
      case "alp": setALP(response.data); break;
      case "bpf": setBPF(response.data); break;
      case "blp": setBLP(response.data); break;
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton/>
            <IonButton onClick={()=>{window.location.reload()}}>
              <IonIcon icon={reload}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Horaires à l'arrêt Université</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
          <div className="containerMenu">
            <h5> Tram A | vers Grand Hameau </h5>
            <div className="menu" dangerouslySetInnerHTML={{ __html: AGH }}/>
          </div>

          <div className="containerMenu">
            <h5> Tram A | vers La Plage </h5>
            <div className="menu" dangerouslySetInnerHTML={{ __html: ALP }}/>
          </div>

          <div className="containerMenu">
            <h5> Tram B | vers Pré Fleuri </h5>
            <div className="menu" dangerouslySetInnerHTML={{ __html: BPF }}/>
          </div>

          <div className="containerMenu">
            <h5> Tram B | vers La Plage </h5>
            <div className="menu" dangerouslySetInnerHTML={{ __html: BLP }}/>
          </div>
        
      </IonContent>
    </IonPage>
  );
};

export default Horaires;
