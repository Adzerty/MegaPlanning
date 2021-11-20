import { IonButton, IonContent, IonGrid, IonHeader, IonInput, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import { useEffect, useState } from 'react';
import { Http, HttpResponse } from '@capacitor-community/http';


function eventIsNow(o:any)
{
  let dateNow = Date.now();
  let dateStart = Date.parse(o.dtstart.value.toString());
  let dateEnd = Date.parse(o.dtend.value.toString());
  return dateStart <= dateNow && dateNow <= dateEnd;
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
  const axios = require('axios');

  const [link, setLink] = useState(""+localStorage.getItem("calendarLink"));

  let stringTmpCal = `
  BEGIN:VCALENDAR
VERSION:2.0
PRODID;LANGUAGE=fr:Copyright Index-Education - HYPERPLANNING 2021
METHOD:PUBLISH
X-CALSTART:20210823T000000Z
X-CALEND:20221029T000000Z
X-WR-CALNAME;LANGUAGE=fr:HYP - 03 - ST-L3 - INFORMATIQUE - du 23 août 2021 au 29 octobre 2022
X-WR-CALDESC;LANGUAGE=fr:Emploi du temps de 03 - ST-L3 - INFORMATIQUE généré par le logiciel HP (Index-Education) le 19 nov. 2021 - UNIVERSITE DU HAVRE - valable sur la période du 23 août 2021 au 29 octobre 2022 - Semaines : semaine 34 - 43
BEGIN:VEVENT
CATEGORIES:HYPERPLANNING
DTSTAMP:20211119T155557Z
LAST-MODIFIED:20210831T103628Z
UID:Cours-812423-3-ST-L3_-_INFORMATIQUE-Index-Education
DTSTART:20210906T120000Z
DTEND:20210906T133000Z
SUMMARY;LANGUAGE=fr:Réunion de rentrée - Mme Jay Veronique
LOCATION;LANGUAGE=fr:NORMAND amphi ST (tbVRvisio-120)
DESCRIPTION;LANGUAGE=fr:Matière : Réunion de rentrée\nEnseignant : Mme Jay Veronique\nSalle : NORMAND amphi ST (tbVRvisio-120)\n
END:VEVENT
BEGIN:VEVENT
CATEGORIES:HYPERPLANNING
DTSTAMP:20211119T155557Z
LAST-MODIFIED:20210916T141433Z
UID:Cours-820669-6-ST-L3_-_INFORMATIQUE-Index-Education
DTSTART:20210930T110000Z
DTEND:20210930T150000Z
SUMMARY;LANGUAGE=fr:FETONS ENSEMBLE L'UNIVERSITE - Initiative du Président
DESCRIPTION;LANGUAGE=fr:Matière : FETONS ENSEMBLE L'UNIVERSITE\nMémo : Initiative du Président\n
END:VEVENT
BEGIN:VEVENT
CATEGORIES:HYPERPLANNING
DTSTAMP:20211119T155557Z
LAST-MODIFIED:20210831T103558Z
UID:Cours-828599-3-ST-L3_-_INFORMATIQUE-Index-Education
DTSTART:20210906T133000Z
DTEND:20210906T153000Z
SUMMARY;LANGUAGE=fr:UE4.1 - Système - M. Amanton Laurent - CM
LOCATION;LANGUAGE=fr:NORMAND amphi ST (tbVRvisio-120)
DESCRIPTION;LANGUAGE=fr:Matière : UE4.1 - Système\nEnseignant : M. Amanton Laurent\nSalle : NORMAND amphi ST (tbVRvisio-120)\nType : CM\n
END:VEVENT
BEGIN:VEVENT
CATEGORIES:HYPERPLANNING
DTSTAMP:20211119T155557Z
LAST-MODIFIED:20210830T233624Z
UID:Cours-828600-3-ST-L3_-_INFORMATIQUE-Index-Education
DTSTART:20210907T063000Z
DTEND:20210907T080000Z
SUMMARY;LANGUAGE=fr:UE5.1 - SGBD - M. Fournier Dominique - CM
LOCATION;LANGUAGE=fr:NORMAND amphi ST (tbVRvisio-120)
DESCRIPTION;LANGUAGE=fr:Matière : UE5.1 - SGBD\nEnseignant : M. Fournier Dominique\nSalle : NORMAND amphi ST (tbVRvisio-120)\nType : CM\n
END:VEVENT
BEGIN:VEVENT
CATEGORIES:HYPERPLANNING
DTSTAMP:20211119T155557Z
LAST-MODIFIED:20210830T233744Z
UID:Cours-828602-3-ST-L3_-_INFORMATIQUE-Index-Education
DTSTART:20210907T081500Z
DTEND:20210907T101500Z
SUMMARY;LANGUAGE=fr:UE1.1 - POO avec C++ - Mme Jay Veronique - CM
LOCATION;LANGUAGE=fr:MAZELINE amphi ST (VR-120)
DESCRIPTION;LANGUAGE=fr:Matière : UE1.1 - POO avec C++\nEnseignant : Mme Jay Veronique\nSalle : MAZELINE amphi ST (VR-120)\nType : CM\n
END:VEVENT
BEGIN:VEVENT
CATEGORIES:HYPERPLANNING
DTSTAMP:20211119T155557Z
LAST-MODIFIED:20210830T233954Z
UID:Cours-828605-3-ST-L3_-_INFORMATIQUE-Index-Education
DTSTART:20210907T140000Z
DTEND:20210907T153000Z
SUMMARY;LANGUAGE=fr:UE1.1 - POO avec C++ - Mme Jay Veronique - CM
LOCATION;LANGUAGE=fr:LESUEUR amphi ST (tbVR-250)
DESCRIPTION;LANGUAGE=fr:Matière : UE1.1 - POO avec C++\nEnseignant : Mme Jay Veronique\nSalle : LESUEUR amphi ST (tbVR-250)\nType : CM\n
END:VEVENT
BEGIN:VEVENT
CATEGORIES:HYPERPLANNING
DTSTAMP:20211119T155557Z
LAST-MODIFIED:20210830T234107Z
UID:Cours-828606-3-ST-L3_-_INFORMATIQUE-Index-Education
DTSTART:20210908T060000Z
DTEND:20210908T100000Z
SUMMARY;LANGUAGE=fr:UE3.1 - Génie logiciel - M. Mermet Bruno - CM
LOCATION;LANGUAGE=fr:MAZELINE amphi ST (VR-120)
DESCRIPTION;LANGUAGE=fr:Matière : UE3.1 - Génie logiciel\nEnseignant : M. Mermet Bruno\nSalle : MAZELINE amphi ST (VR-120)\nType : CM\n
END:VEVENT
BEGIN:VEVENT
CATEGORIES:HYPERPLANNING
DTSTAMP:20211119T155557Z
LAST-MODIFIED:20210830T234158Z
UID:Cours-828607-3-ST-L3_-_INFORMATIQUE-Index-Education
DTSTART:20210908T120000Z
DTEND:20210908T133000Z
SUMMARY;LANGUAGE=fr:UE5.1 - SGBD - M. Fournier Dominique - CM
LOCATION;LANGUAGE=fr:MAZELINE amphi ST (VR-120)
DESCRIPTION;LANGUAGE=fr:Matière : UE5.1 - SGBD\nEnseignant : M. Fournier Dominique\nSalle : MAZELINE amphi ST (VR-120)\nType : CM\n
END:VEVENT
BEGIN:VEVENT
CATEGORIES:HYPERPLANNING
DTSTAMP:20211119T155557Z
LAST-MODIFIED:20210830T234250Z
UID:Cours-828608-3-ST-L3_-_INFORMATIQUE-Index-Education
DTSTART:20210908T140000Z
DTEND:20210908T153000Z
SUMMARY;LANGUAGE=fr:UE1.1 - POO avec C++ - Mme Jay Veronique - CM
LOCATION;LANGUAGE=fr:NORMAND amphi ST (tbVRvisio-120)
DESCRIPTION;LANGUAGE=fr:Matière : UE1.1 - POO avec C++\nEnseignant : Mme Jay Veronique\nSalle : NORMAND amphi ST (tbVRvisio-120)\nType : CM\n
END:VEVENT
BEGIN:VEVENT
CATEGORIES:HYPERPLANNING
DTSTAMP:20211119T155557Z
LAST-MODIFIED:20210830T234700Z
UID:Cours-828613-3-ST-L3_-_INFORMATIQUE-Index-Education
DTSTART:20210910T063000Z
DTEND:20210910T080000Z
SUMMARY;LANGUAGE=fr:UE5.1 - SGBD - M. Fournier Dominique - CM
LOCATION;LANGUAGE=fr:NORMAND amphi ST (tbVRvisio-120)
DESCRIPTION;LANGUAGE=fr:Matière : UE5.1 - SGBD\nEnseignant : M. Fournier Dominique\nSalle : NORMAND amphi ST (tbVRvisio-120)\nType : CM\n
END:VEVENT
BEGIN:VEVENT
CATEGORIES:HYPERPLANNING
DTSTAMP:20211119T155557Z
LAST-MODIFIED:20210830T234848Z
UID:Cours-828616-3-ST-L3_-_INFORMATIQUE-Index-Education
DTSTART:20210910T081500Z
DTEND:20210910T101500Z
SUMMARY;LANGUAGE=fr:UE1.1 - POO avec C++ - Mme Jay Veronique - CM
LOCATION;LANGUAGE=fr:NORMAND amphi ST (tbVRvisio-120)
DESCRIPTION;LANGUAGE=fr:Matière : UE1.1 - POO avec C++\nEnseignant : Mme Jay Veronique\nSalle : NORMAND amphi ST (tbVRvisio-120)\nType : CM\n
END:VEVENT
BEGIN:VEVENT
CATEGORIES:HYPERPLANNING
DTSTAMP:20211119T155557Z
LAST-MODIFIED:20211116T160033Z
UID:Cours-828915-4-ST-L3_-_INFORMATIQUE-Index-Education
DTSTART:20210913T063000Z
DTEND:20210913T080000Z
SUMMARY;LANGUAGE=fr:UE5.1 - SGBD - M. Fournier Dominique - CM
LOCATION;LANGUAGE=fr:NORMAND amphi ST (tbVRvisio-120)
DESCRIPTION;LANGUAGE=fr:Matière : UE5.1 - SGBD\nEnseignant : M. Fournier Dominique\nSalle : NORMAND amphi ST (tbVRvisio-120)\nType : CM\n
END:VEVENT
BEGIN:VEVENT
CATEGORIES:HYPERPLANNING
DTSTAMP:20211119T155557Z
LAST-MODIFIED:20211116T160033Z
UID:Cours-828915-6-ST-L3_-_INFORMATIQUE-Index-Education
DTSTART:20210927T063000Z
DTEND:20210927T080000Z
SUMMARY;LANGUAGE=fr:UE5.1 - SGBD - M. Fournier Dominique - CM
LOCATION;LANGUAGE=fr:A215 (VR-60) ST
DESCRIPTION;LANGUAGE=fr:Matière : UE5.1 - SGBD\nEnseignant : M. Fournier Dominique\nSalle : A215 (VR-60) ST\nType : CM\n
END:VEVENT
BEGIN:VEVENT
CATEGORIES:HYPERPLANNING
DTSTAMP:20211119T155557Z
LAST-MODIFIED:20211119T114653Z
UID:Cours-868389-16-ST-L3_-_INFORMATIQUE-Index-Education
DTSTART:20211208T091500Z
DTEND:20211208T111500Z
SUMMARY;LANGUAGE=fr:Programmation logique - OPT2 L3 INFO - UE7.2 - Opt2 : prog logique - Mme Simon Gaele - TP
LOCATION;LANGUAGE=fr:INFO-A102 TP (VJ) (VHP-28) + 14 postes ST
DESCRIPTION;LANGUAGE=fr:Option : Programmation logique - OPT2 L3 INFO\nMatière : UE7.2 - Opt2 : prog logique\nEnseignant : Mme Simon Gaele\nSalle : INFO-A102 TP (VJ) (VHP-28) + 14 postes ST\nType : TP\n
END:VEVENT
BEGIN:VEVENT
CATEGORIES:HYPERPLANNING
DTSTAMP:20211119T155557Z
LAST-MODIFIED:20211119T114653Z
UID:Cours-868389-16-ST-L3_-_INFORMATIQUE-Index-Education
DTSTART:20211208T091500Z
DTEND:20211208T111500Z
SUMMARY;LANGUAGE=fr:Programmation logique - OPT2 L3 INFO - UE7.2 - Opt2 : prog logique - Mme Simon Gaele - TP
LOCATION;LANGUAGE=fr:INFO-A102 TP (VJ) (VHP-28) + 14 postes ST
DESCRIPTION;LANGUAGE=fr:Option : Programmation logique - OPT2 L3 INFO\nMatière : UE7.2 - Opt2 : prog logique\nEnseignant : Mme Simon Gaele\nSalle : INFO-A102 TP (VJ) (VHP-28) + 14 postes ST\nType : TP\n
END:VEVENT
BEGIN:VEVENT
CATEGORIES:HYPERPLANNING
DTSTAMP:20211119T155557Z
LAST-MODIFIED:20211119T114653Z
UID:Cours-868389-16-ST-L3_-_INFORMATIQUE-Index-Education
DTSTART:20211208T091500Z
DTEND:20211208T111500Z
SUMMARY;LANGUAGE=fr:Programmation logique - OPT2 L3 INFO - UE7.2 - Opt2 : prog logique - Mme Simon Gaele - TP
LOCATION;LANGUAGE=fr:INFO-A102 TP (VJ) (VHP-28) + 14 postes ST
DESCRIPTION;LANGUAGE=fr:Option : Programmation logique - OPT2 L3 INFO\nMatière : UE7.2 - Opt2 : prog logique\nEnseignant : Mme Simon Gaele\nSalle : INFO-A102 TP (VJ) (VHP-28) + 14 postes ST\nType : TP\n
END:VEVENT
BEGIN:VEVENT
CATEGORIES:HYPERPLANNING
DTSTAMP:20211119T155557Z
LAST-MODIFIED:20211119T114653Z
UID:Cours-868389-16-ST-L3_-_INFORMATIQUE-Index-Education
DTSTART:20211208T091500Z
DTEND:20211208T111500Z
SUMMARY;LANGUAGE=fr:Programmation logique - OPT2 L3 INFO - UE7.2 - Opt2 : prog logique - Mme Simon Gaele - TP
LOCATION;LANGUAGE=fr:INFO-A102 TP (VJ) (VHP-28) + 14 postes ST
DESCRIPTION;LANGUAGE=fr:Option : Programmation logique - OPT2 L3 INFO\nMatière : UE7.2 - Opt2 : prog logique\nEnseignant : Mme Simon Gaele\nSalle : INFO-A102 TP (VJ) (VHP-28) + 14 postes ST\nType : TP\n
END:VEVENT
BEGIN:VEVENT
CATEGORIES:HYPERPLANNING
DTSTAMP:20211119T155557Z
LAST-MODIFIED:20211119T114653Z
UID:Cours-868389-16-ST-L3_-_INFORMATIQUE-Index-Education
DTSTART:20211208T091500Z
DTEND:20211208T111500Z
SUMMARY;LANGUAGE=fr:Programmation logique - OPT2 L3 INFO - UE7.2 - Opt2 : prog logique - Mme Simon Gaele - TP
LOCATION;LANGUAGE=fr:INFO-A102 TP (VJ) (VHP-28) + 14 postes ST
DESCRIPTION;LANGUAGE=fr:Option : Programmation logique - OPT2 L3 INFO\nMatière : UE7.2 - Opt2 : prog logique\nEnseignant : Mme Simon Gaele\nSalle : INFO-A102 TP (VJ) (VHP-28) + 14 postes ST\nType : TP\n
END:VEVENT
END:VCALENDAR`;



  // Example of a GET request
    const doGet = async () => {
      const options = {
        url: link,
        headers: { 'X-Fake-Header': 'Max was here' },
        params: { size: 'XL' },
      };

      const response: HttpResponse = await Http.get(options);

      console.log(response.data);
    };

    //doGet();
    
  
  //console.log(myCalendarString);

  
  let parsedCal = ical.parseString(stringTmpCal);
  let eventNow = parsedCal.events.filter(eventIsNow);
  let eventsAfter = parsedCal.events.filter(eventIsLater).slice(0,3);
  console.log(parsedCal.calendarData);
  console.log(eventNow);
  console.log(eventsAfter);

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
