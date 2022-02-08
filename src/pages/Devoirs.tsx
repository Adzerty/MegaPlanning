import { IonButton, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonNote, IonPage, IonRadio, IonRadioGroup, IonRefresher, IonRefresherContent, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import React, { useEffect, useState } from 'react';
import { Http, HttpResponse } from '@capacitor-community/http';
import { reload } from 'ionicons/icons';
import { Header } from '../components/Header';
import { RefresherEventDetail } from '@ionic/core';


function sortByDtstart(o: any, o2: any) {
  let dateO = Date.parse(o.date.toString());
  let dateO2 = Date.parse(o2.date.toString());
  return dateO - dateO2;
}



const Devoirs: React.FC = () => {
  const [stringDevoirs, setDevoirs] = useState<string>('');
  const [events, setEvents]         = useState<string[]>([]);
  let link = "http://api.adzerty.fr/devoirs/";
  let reload = false;
  
  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    reload = !reload;
    setTimeout(() => {
      console.log('Async operation has ended');
      event.detail.complete();
    }, 2000);
  }
  
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
    setEvents(stringDevoirs.);
  }, [reload]);


  //let parsedDevoirs = JSON.parse(stringDevoirs);


  return (
    <IonPage>
      <Header>
        Dates de rendus
      </Header>
      
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonCard color='primary'>
          <IonCardHeader>
            <IonCardTitle>
              Devoirs
            </IonCardTitle>
          </IonCardHeader>
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
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Devoirs;
