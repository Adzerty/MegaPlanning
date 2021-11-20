import { IonButton, IonContent, IonGrid, IonHeader, IonInput, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import { useEffect, useState } from 'react';
import { Http, HttpResponse } from '@capacitor-community/http';

const Home: React.FC = () => {

  const ical = require('cal-parser');
  const axios = require('axios');

  const [link, setLink] = useState(""+localStorage.getItem("calendarLink"));



  // Example of a GET request
    const doGet = async () => {
      const options = {
        url: link,
        headers: { 'X-Fake-Header': 'Max was here' },
        params: { size: 'XL' },
      };

      const response: HttpResponse = await Http.get(options);

      console.log(response.data);

      // or...
      // const response = await Http.request({ ...options, method: 'GET' })
    };

    doGet();
    
  
  //console.log(myCalendarString);

  let parsedCal = ical.parseString("");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mega Planning</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
          <IonGrid className="container">
            <IonRow>
              <IonLabel className="label_ftc"> Lien </IonLabel>
              <IonInput className="input_ftc" 
                        placeholder="Lien du calendrier..."  
                        onIonChange={e => setLink(e.detail.value!)}>

              </IonInput>
            </IonRow>
            <IonRow>
              <IonButton onClick={()=>{
                if(link !== "null")
                {
                  localStorage.setItem("calendarLink", link);
                }
              }}>Charger le calendrier</IonButton>
              <IonButton className="secondary">Tutoriel</IonButton>
            </IonRow>
          </IonGrid> 
      </IonContent>
    </IonPage>
  );
};

export default Home;
