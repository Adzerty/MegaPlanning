import { IonButton, IonButtons, IonCard, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonNote, IonPage, IonRadio, IonRadioGroup, IonRow, IonTitle, IonToolbar, useIonPicker } from '@ionic/react';
import './MenuCrous.css';
import React, { useEffect, useState } from 'react';
import { Http, HttpResponse } from '@capacitor-community/http';
import { reload } from 'ionicons/icons';
import { Header } from '../components/Header';


const MenuCrous: React.FC = () => {

  let yearNow = new Date(Date.now()).getFullYear();
  
  let monthNow = ""+ (new Date(Date.now()).getMonth() + 1);
  if(monthNow.length != 2) monthNow = '0'+monthNow;
  

  let dayNow = "" + (new Date(Date.now()).getDate());
  if(dayNow.length != 2) dayNow = '0'+dayNow;

  let dateTmp = "" + yearNow + "-" + monthNow + "-" + dayNow;

  console.log(dateTmp);
  
  const [stringMenu, setMenu] = useState<string>('');
  const [idRestau, setIdRestau] = useState<string>('r166');
  const [strRestau, setStrRestau] = useState<string>('Resto\'U Porte Océane');
  const [strDate, setStrDate ] = useState<string>(dateTmp);

  //IonPicker
  const [present] = useIonPicker();

  let link = "http://api.adzerty.fr/menu/";
  
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
      let month = "" + (new Date(currentDate).getMonth() + 1);
      if(month.length != 2) month = '0'+month;
      let day = "" + new Date(currentDate).getDate();
      if(day.length != 2) day = '0'+day;
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
          text: 'Valider',
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
      <Header>
        Menu CROUS
      </Header>
      <IonContent fullscreen>
        <IonButton onClick={presentIonPicker}>Filtres</IonButton>
          <IonCard color='secondary'>
            <div className="containerMenu">
              <h5> {strRestau} | {strDate}</h5>
              <div className="menu" dangerouslySetInnerHTML={{ __html: menuToday }}/>
            </div>
          </IonCard>
        
      </IonContent>
    </IonPage>
  );
};

export default MenuCrous;
