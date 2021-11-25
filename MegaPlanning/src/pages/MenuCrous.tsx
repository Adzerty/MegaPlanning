import { IonButton, IonButtons, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonMenuButton, IonNote, IonPage, IonRadio, IonRadioGroup, IonRow, IonTitle, IonToolbar, useIonPicker } from '@ionic/react';
import './MenuCrous.css';
import React, { useEffect, useState } from 'react';
import { Http, HttpResponse } from '@capacitor-community/http';


const MenuCrous: React.FC = () => {

  const [stringMenu, setMenu] = useState<string>('');
  const [idRestau, setIdRestau] = useState<string>('r166');
  const [strRestau, setStrRestau] = useState<string>('Resto\'U Porte Océane');
  const [strDate, setStrDate ] = useState<string>('2021-11-24');

  //IonPicker
  const [present] = useIonPicker();

  let link = "http://webservices-v2.crous-mobile.fr/feed/normandie/externe/menu.xml";
  
  useEffect(()=>{
      
      // Example of a GET request
      const doGet = async () => {

        const options = {
          url: link
        };

        const response: HttpResponse = await Http.get(options);

        setMenu(response.data);

      };

      doGet();
  }, []);


function searchForRU(o:any){
  return o.$.id == idRestau;
}

function searchForDate(o:any){
  let yearNow = new Date(Date.now()).getFullYear();
  let monthNow = new Date(Date.now()).getMonth() + 1;
  let dayNow = new Date(Date.now()).getDate();
  return o.$.date == strDate;
}

function generateDateOptions(){
  let arrayReturn = new Array();
  let dayOfWeek = new Date(Date.now()).getDay();
  if(dayOfWeek != 0 && dayOfWeek != 6){
    let nbIter = 0;
    while(dayOfWeek != 6){
      let currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 1*nbIter);
      let year = new Date(currentDate).getFullYear();
      let month = new Date(currentDate).getMonth() + 1;
      let day = new Date(currentDate).getDate();
      let strDateTmp = "" + year + "-" + month + "-" + day;
      let textDateOption = nbIter == 0 ? "Aujourd'hui" : nbIter == 1 ? "Demain" : nbIter == 2 ? "Après-demain" : currentDate.toLocaleDateString();
      arrayReturn.push({"text":textDateOption, "value":strDateTmp});
      nbIter++;
      dayOfWeek++;
    }

    return arrayReturn; 
  }

  return arrayReturn;
  
}

  let menuToday:any=new Array();
  var parseString = require('xml2js').parseString;
  parseString(stringMenu, function (err:any, result:any) {
    if(result)
      menuToday = result.root.resto.filter(searchForRU)[0].menu.filter(searchForDate)
      if(menuToday[0])
        menuToday = menuToday[0]['_'].replace("<h2>midi</h2>","");
      else
        menuToday = "<h3>Désolé, le menu que vous cherchez n'est pas encore disponible</h3>"
  });

  function presentIonPicker(){
    present({
      buttons: [
        {
          text: 'Confirm',
          handler: (selected) => {
            setIdRestau(selected.restau.value)
            setStrRestau(selected.restau.text)
            setStrDate(selected.date.value)
          },
        },
      ],
      columns: [
        {
          name: 'restau',
          options: [
            { text: 'Resto\'U Porte Océane', value: 'r166' },
            { text: 'Brasserie Porte Océane', value: 'r128' },
            { text: 'Cafétaria Lebon', value: 'r131' },
          ],
        },
        {
          name: 'date',
          options: generateDateOptions()
        },
      ],
    });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton/>
          </IonButtons>
          <IonTitle>Menu CROUS</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton onClick={presentIonPicker}>Filtre</IonButton>
          <div className="containerMenu">
            <h5> {strRestau} | {strDate}</h5>
            <div className="menu" dangerouslySetInnerHTML={{ __html: menuToday }}/>
          </div>
        
      </IonContent>
    </IonPage>
  );
};

export default MenuCrous;
