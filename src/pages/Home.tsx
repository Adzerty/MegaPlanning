import { IonButton, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonNote, IonPage, IonRadio, IonRadioGroup, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import React, { useEffect, useState } from 'react';
import { Http, HttpResponse } from '@capacitor-community/http';
import { reload } from 'ionicons/icons';
import { Header } from '../components/Header';


function sortByDtstart(o:any, o2:any){
  let dateO = Date.parse(o.dtstart.value.toString());
  let dateO2 = Date.parse(o2.dtend.value.toString());
  return dateO - dateO2;
}

function eventIsNow(o:any)
{
  let dateNow = Date.now();
  let dateStart = Date.parse(o.dtstart.value.toString());
  let dateEnd = Date.parse(o.dtend.value.toString());
  return dateStart <= dateNow && dateNow <= dateEnd;
}

function eventIsInGroupe(o:any)
{
  if(o.summary)
  {
    return o.summary.value.toString().includes("CM") 
          || o.summary.value.toString().includes("Gr"+localStorage.getItem("gpTP"))
          || o.summary.value.toString().includes("GL"+localStorage.getItem("gpTP")) 
          || o.summary.value.toString().includes("Gr"+localStorage.getItem("gpTD")) 
          || o.summary.value.toString().includes("EX") 
          || (""+localStorage.getItem("gpOpt") === "Prolog" ? o.summary.value.toString().includes("Programmation logique") : o.summary.value.toString().includes("Archit") ) ;
  } 
  else
  {
    return false;
  }
}

function eventIsLater(o:any)
{
  let dateNow = Date.now();
  let dateStart = Date.parse(o.dtstart.value.toString());
  let dateEnd = Date.parse(o.dtend.value.toString());
  return dateStart >= dateNow && dateEnd >= dateNow;
}



const Home: React.FC = () => {

  const ical = require('cal-parser');
  const [stringTmpCal, setCal] = useState<string>('');
  let link = "http://api.adzerty.fr/calendar/";
  

  useEffect(()=>{
      
      // Example of a GET request
      const doGet = async () => {

        const options = {
          url: link
        };

        const response: HttpResponse = await Http.get(options);
        setCal(response.data);

      };

      doGet();
  }, []);

  
  let parsedCal = ical.parseString(stringTmpCal);
  // console.log("CALENDRIER");
  // console.log(parsedCal)
  let eventNow = parsedCal.events.sort(sortByDtstart).filter(eventIsNow).filter(eventIsInGroupe);
  console.log(eventNow);
  let eventsAfter = parsedCal.events.sort(sortByDtstart).filter(eventIsLater).filter(eventIsInGroupe).slice(0,10);
  //console.log(parsedCal.calendarData);
  // console.log("EVENT NOW");
  // console.log(eventNow);

  // console.log("EVENT LATER");
  // console.log(eventsAfter);


  //hooks useState pour les radios
  const [selectedTP, setSelectedTP] = useState<string>('1');
  const [selectedTD, setSelectedTD] = useState<string>('A');
  const [selectedOption, setSelectedOption] = useState<string>('Archi');

  return (
    <IonPage>
    <Header>
      Dates de rendus
    </Header>
      <IonContent fullscreen>
      <IonCard color='primary'>
        {localStorage.getItem("gpTP") === null &&
          <IonGrid className="container">

            <IonRow>
              <IonLabel>Groupe de TP : </IonLabel>
              <IonRadioGroup value={selectedTP} onIonChange={e => setSelectedTP(e.detail.value)}>
                <IonItem>
      
                  <IonLabel>1</IonLabel>
                  <IonRadio slot="start" value="1" />
   
                </IonItem>
                <IonItem>
         
                  <IonLabel>2</IonLabel>
                  <IonRadio slot="start" value="2" />
     
                </IonItem>
                <IonItem>

                  <IonLabel>3</IonLabel>
                  <IonRadio slot="start" value="3" />
    
                </IonItem>
              </IonRadioGroup>
            </IonRow>

            <IonRow>
              <IonLabel>Groupe de TD : </IonLabel>
              <IonRadioGroup value={selectedTD} onIonChange={e => setSelectedTD(e.detail.value)}>
                <IonItem>
      
                  <IonLabel>A</IonLabel>
                  <IonRadio slot="start" value="A" />
   
                </IonItem>
                <IonItem>
         
                  <IonLabel>B</IonLabel>
                  <IonRadio slot="start" value="B" />
     
                </IonItem>

              </IonRadioGroup>
            </IonRow>

            <IonRow>
              <IonLabel>Option : </IonLabel>
              <IonRadioGroup value={selectedOption} onIonChange={e => setSelectedOption(e.detail.value)}>
                <IonItem>
      
                  <IonLabel>Archi</IonLabel>
                  <IonRadio slot="start" value="Archi" />
   
                </IonItem>
                <IonItem>
         
                  <IonLabel>Prolog</IonLabel>
                  <IonRadio slot="start" value="Prolog" />
     
                </IonItem>

              </IonRadioGroup>
            </IonRow>

            <IonRow>
              <IonButton onClick={()=>{
                if(link !== "null")
                {
                  localStorage.setItem("calendarLink", link);
                  localStorage.setItem("gpTP", selectedTP);
                  localStorage.setItem("gpTD", selectedTD);
                  localStorage.setItem("gpOpt", selectedOption);
                  window.location.reload();
                }
              }}>Charger le calendrier</IonButton>
            </IonRow>
          </IonGrid> 
        }

        {localStorage.getItem("gpTP") !== null && eventNow.length === 1 &&

         
          <IonGrid className="eventNowContainer">
            <IonRow>
              <IonLabel>
                Cours actuel
              </IonLabel>
            </IonRow>
            <IonRow className="eventNow">
              <IonRow>
                <IonLabel className="label_event"> Cours : </IonLabel>
                <IonLabel className="label_event_now"> {eventNow[0].summary.value}</IonLabel>
              </IonRow>
              <IonRow>
                <IonLabel className="label_event"> Salle : </IonLabel>
                <IonLabel className="label_event_now"> {eventNow[0].location.value}</IonLabel>
              </IonRow>
              <IonRow>
                <IonLabel className="label_event"> Horaires : </IonLabel>
                <IonLabel className="label_event_now"> De :{eventNow[0].dtstart.value.toLocaleString("fr-FR", { weekday: 'long' })} {eventNow[0].dtstart.value.toLocaleString()}</IonLabel>
                <IonLabel className="label_event_now"> A : {eventNow[0].dtend.value.toLocaleString("fr-FR", { weekday: 'long' })} {eventNow[0].dtend.value.toLocaleString()} </IonLabel>
              </IonRow>
            </IonRow>
          </IonGrid> 
        }

        {localStorage.getItem("gpTP") !== null && eventNow.length >= 2 &&

                
          <IonGrid className="eventNowContainer">
            <IonRow>
              <IonLabel>
                Cours actuel
              </IonLabel>
            </IonRow>
            {eventNow.map((event:any) => 
            <IonRow className="eventNow">
              <IonRow>
                <IonLabel className="label_event"> Cours : </IonLabel>
                <IonLabel className="label_event_now"> {eventNow[0].summary.value}</IonLabel>
              </IonRow>
              <IonRow>
                <IonLabel className="label_event"> Salle : </IonLabel>
                <IonLabel className="label_event_now"> {eventNow[0].location.value}</IonLabel>
              </IonRow>
              <IonRow>
                <IonLabel className="label_event"> Horaires : </IonLabel>
                <IonLabel className="label_event_now"> De : {eventNow[0].dtstart.value.toLocaleString("fr-FR", { weekday: 'long' })} {eventNow[0].dtstart.value.toLocaleString()}</IonLabel>
                <IonLabel className="label_event_now"> A : {eventNow[0].dtend.value.toLocaleString("fr-FR", { weekday: 'long' })} {eventNow[0].dtend.value.toLocaleString()} </IonLabel>
              </IonRow>
            </IonRow>
            )}
          </IonGrid> 
        }


          {localStorage.getItem("gpTP") !== null &&  eventsAfter.length !== 0 && 
          <div>
            <IonCardHeader>
              <IonCardTitle>Prochains cours</IonCardTitle>
            </IonCardHeader>

        
            <IonGrid className="eventLaterContainer">
                {eventsAfter.map((event:any) => 
                <IonRow className="eventLater">
                    <IonRow>
                      <IonLabel className="label_event"> Cours : </IonLabel>
                      <IonLabel className="label_event_now"> {event.summary.value}</IonLabel>
                    </IonRow>
                    <IonRow>
                      <IonLabel className="label_event"> Salle : </IonLabel>
                      <IonLabel className="label_event_now"> {event.location.value}</IonLabel>
                    </IonRow>
                    <IonRow>
                      <IonLabel className="label_event"> Horaires : </IonLabel>
                      <IonLabel className="label_event_now"> De : {event.dtstart.value.toLocaleString("fr-FR", { weekday: 'long' })} {event.dtstart.value.toLocaleString()}</IonLabel>
                      <IonLabel className="label_event_now"> A : {event.dtend.value.toLocaleString("fr-FR", { weekday: 'long' })} {event.dtend.value.toLocaleString()} </IonLabel>
                    </IonRow>
                  </IonRow>
                )}
            </IonGrid> 
        
          </div>
        }
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
