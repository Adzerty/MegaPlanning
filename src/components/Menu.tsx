/**
 * Component Menu
 * Permet de gérer le menu contextuel de l'application
 */
 import {
   IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonNote,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import { Redirect, Route, useLocation } from 'react-router-dom';
import { attach, attachOutline, book, bookOutline, bug, bugOutline, calendar, close, closeOutline, home, homeOutline, informationCircle, map, paperPlane, paperPlaneOutline, personCircle, pizza, pizzaOutline, reload, save, saveOutline, time, timeOutline } from 'ionicons/icons';
import './Menu.css';
import Devoirs from '../pages/Devoirs/Devoirs';
import Home from '../pages/Home';
import Horaires from '../pages/Horaires';
import MenuCrous from '../pages/MenuCrous';

/**
 * Interface représente un Page de l'application dans le menu
 */
interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Calendrier',
    url: 'home',
    iosIcon: homeOutline,
    mdIcon: home,
  },
  {
    title: 'Restaurants',
    url: 'menu',
    iosIcon: pizzaOutline,
    mdIcon: pizza,
  },
  {
    title: 'Horaires',
    url: 'horaires',
    iosIcon: timeOutline,
    mdIcon: time,
  },
  {
    title: 'Devoirs',
    url: 'devoirs',
    iosIcon: bookOutline,
    mdIcon: book,
  }
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
  <IonTabs>
    
    <IonRouterOutlet>
      <Redirect exact from='/' to='/home'/>
      <Route path="/menu" component={MenuCrous}/>
      <Route path="/home" component={Home}/>
      <Route path="/horaires" component={Horaires}/>
      <Route path="/devoirs" component={Devoirs}/>
    </IonRouterOutlet>
    <IonTabBar slot="bottom">
    {appPages.map((appPage, index) => {
      return (
        <IonTabButton tab={appPage.url} href={'/'+appPage.url}>
          <IonIcon icon={appPage.iosIcon} />
          <IonLabel>{appPage.title}</IonLabel>
        </IonTabButton>
      );
    })}
    </IonTabBar>
  </IonTabs>
  );
};

export default Menu;
