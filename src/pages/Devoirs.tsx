import { IonButton, IonButtons, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonNote, IonPage, IonRadio, IonRadioGroup, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import React, { useEffect, useState } from 'react';
import { Http, HttpResponse } from '@capacitor-community/http';
import { reload } from 'ionicons/icons';


function sortByDtstart(o: any, o2: any) {
  let dateO = Date.parse(o.date.toString());
  let dateO2 = Date.parse(o2.date.toString());
  return dateO - dateO2;
}


const Devoirs: React.FC = () => {
  const [stringDevoirs, setDevoirs] = useState<string>('');
  let link = "http://api.adzerty.fr/devoirs/";


  useEffect(() => {

    // Example of a GET request
    const doGet = async () => {

      const options = {
        url: link
      };

      const response: HttpResponse = await Http.get(options);
      setDevoirs(response.data);

    };

    doGet();
  }, []);


  //let parsedDevoirs = JSON.parse(stringDevoirs);
  let events = new Array();
  for(let i = 0; i<stringDevoirs.length; i++){
    events.push(stringDevoirs[i]);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
            <IonButton onClick={() => { window.location.reload() }}>
              <IonIcon icon={reload}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Dates de rendus</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>


        {events.length !== 0 &&
          <IonGrid className="eventLaterContainer">

            {events.sort(sortByDtstart).map((event: any) =>
              <IonRow className="eventLater">
                <IonRow>
                  <IonLabel className="label_event"> Intitulé : </IonLabel>
                  <IonLabel className="label_event_now"> {event.title}</IonLabel>
                </IonRow>
                <IonRow>
                  <IonLabel className="label_event"> Date de rendu : </IonLabel>
                  <IonLabel className="label_event_now">{new Date(event.date.toString()).toLocaleString("fr-FR", { weekday: 'long' })} {new Date(event.date.toString().slice(0,19)).toLocaleString()}</IonLabel>
                </IonRow>

                <IonRow>
                  <IonLabel className="label_event"> Tags : </IonLabel>
                {event.tags.map((tag: any)=>
                  <IonLabel className="label_event_now">{tag}</IonLabel>
                )
                }                  
                </IonRow>
              </IonRow>
            )}



          </IonGrid>

        }
      </IonContent>
    </IonPage>
  );
};

export default Devoirs;
