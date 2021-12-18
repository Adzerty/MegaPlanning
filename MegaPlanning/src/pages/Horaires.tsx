import { IonButton, IonButtons, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonNote, IonPage, IonRadio, IonRadioGroup, IonRow, IonTitle, IonToolbar, useIonPicker } from '@ionic/react';
import './Horaires.css';
import React, { useEffect, useState } from 'react';
import { Http, HttpResponse } from '@capacitor-community/http';
import { reload } from 'ionicons/icons';


const Horaires: React.FC = () => {
  const axios = require('axios');


  const[AGH, setAGH] = useState("");
  const[ALP, setALP] = useState("");
  const[BPF, setBPF] = useState("");
  const[BLP, setBLP] = useState("");

  // Send a POST request
  axios.post(
    'https://www.transports-lia.fr/fr/NextDeparture/PhysicalStop', 
    'destinations=%5B%7B%22JourneyIds%22%3A%5B17115%5D%2C%22CssClass%22%3A%22colorDest_0%22%2C%22Name%22%3A%22Grand+Hameau%22%2C%22Hide%22%3Afalse%7D%5D&physicalId=3999&lineId=419&sens=2', 
    {
        headers: { 
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8' 
        }
    }
  ).then((res:any)=>{
    setAGH(res.data);
  })

  // Send a POST request
  axios.post(
    'https://www.transports-lia.fr/fr/NextDeparture/PhysicalStop', 
    'destinations=%5B%7B%22JourneyIds%22%3A%5B17114%5D%2C%22CssClass%22%3A%22colorDest_0%22%2C%22Name%22%3A%22La+Plage%22%2C%22Hide%22%3Afalse%7D%5D&physicalId=4000&lineId=419&sens=1',
    {
        headers: { 
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8' 
        }
    }
  ).then((res:any)=>{
    setALP(res.data);
  })

   // Send a POST request
   axios.post(
    'https://www.transports-lia.fr/fr/NextDeparture/PhysicalStop', 
    'destinations=%5B%7B%22JourneyIds%22%3A%5B17119%5D%2C%22CssClass%22%3A%22colorDest_0%22%2C%22Name%22%3A%22Pr%C3%A9+Fleuri%22%2C%22Hide%22%3Afalse%7D%5D&physicalId=3999&lineId=425&sens=2',
    {
        headers: { 
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8' 
        }
    }
  ).then((res:any)=>{
    setBPF(res.data);
  })

   // Send a POST request
   axios.post(
    'https://www.transports-lia.fr/fr/NextDeparture/PhysicalStop', 
    'destinations=%5B%7B%22JourneyIds%22%3A%5B17118%5D%2C%22CssClass%22%3A%22colorDest_0%22%2C%22Name%22%3A%22La+Plage%22%2C%22Hide%22%3Afalse%7D%5D&physicalId=4000&lineId=425&sens=1',
    {
        headers: { 
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8' 
        }
    }
  ).then((res:any)=>{
    setBLP(res.data);
  })

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
          <IonTitle>Horaires</IonTitle>
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
