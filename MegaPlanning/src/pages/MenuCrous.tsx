import { IonButton, IonButtons, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonMenuButton, IonNote, IonPage, IonRadio, IonRadioGroup, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './MenuCrous.css';
import React, { useEffect, useState } from 'react';
import { Http, HttpResponse } from '@capacitor-community/http';

function searchForRU(o:any){
  return o.$.id == "r166";
}

const MenuCrous: React.FC = () => {

  const [stringMenu, setMenu] = useState<string>('');
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

  let menuToday:any=new Array();
  var parseString = require('xml2js').parseString;
  parseString(stringMenu, function (err:any, result:any) {
    if(result)
      menuToday = result.root.resto.filter(searchForRU)[0].menu[0]['_'].replace("<h2>midi</h2>","");
  });

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
        <div className="containerMenu">
          <h5> Menu du Restaurant Universitaire de Porte Océane</h5>
          <div className="menu" dangerouslySetInnerHTML={{ __html: menuToday }}/>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MenuCrous;
