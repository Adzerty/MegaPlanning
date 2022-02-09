import { IonButton, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonNote, IonPage, IonRadio, IonRadioGroup, IonRefresher, IonRefresherContent, IonRow, IonSkeletonText, IonTitle, IonToolbar } from '@ionic/react';
import '../Home.css';
import './Devoirs.css';
import React, { useEffect, useState } from 'react';
import { reload } from 'ionicons/icons';
import { Header } from '../../components/Header';
import { RefresherEventDetail } from '@ionic/core';
import { getDevoir } from '../../api/api-service';
import { AppRefresher } from '../../components/AppRefresher';
import { DevoirGrid } from './DevoirGrid';

export interface DevoirList {
  title : string,
  date  : string,
  tags  : string[]
}

const Devoirs: React.FC = () => {
  const [devoirs, setDevoirs] = useState<DevoirList[]>([]);
  const [isLoading, setLoading] = useState(true);

  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setLoading(true);
    getDevoir()
    .then(res => res.json())
    .then( 
      result => {
        event.detail.complete();
        setDevoirs(result);
        setLoading(false);
      },
      error => {

      }
    )
  }

  useEffect(() => {
    getDevoir()
    .then(res => res.json())
    .then( 
      result => {
        setDevoirs(result);
        setLoading(false);
      },
      error => {

      }
    );
  }, []);

  return (
    <IonPage>
      <Header>
        Dates de rendus
      </Header>
      <IonContent fullscreen>
        <AppRefresher onRefresh={handleRefresh} />
        <IonCard color='primary' className='centered-card'>
          <IonCardHeader>
            <IonCardTitle>
              { isLoading? <IonSkeletonText animated style={{ width: '75px' , height: '20px' }} />  :  'Devoirs' }
            </IonCardTitle>
          </IonCardHeader>
        <DevoirGrid isLoading={isLoading} devoirs={devoirs}/>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Devoirs;
