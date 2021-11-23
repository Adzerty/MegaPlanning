/**
 * Component Menu
 * Permet de gérer le menu contextuel de l'application
 */
 import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { attach, attachOutline, bug, bugOutline, close, closeOutline, home, homeOutline, paperPlane, paperPlaneOutline, pizza, pizzaOutline, save, saveOutline } from 'ionicons/icons';
import './Menu.css';

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
    title: 'Home',
    url: '/home',
    iosIcon: homeOutline,
    mdIcon: home,
  },
  {
    title: 'Menu',
    url: '/menu',
    iosIcon: pizzaOutline,
    mdIcon: pizza,
  }
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu side="start" swipe-gesture="true" contentId="mainContent" type="push">
      <IonContent id="main">
        <IonList id="inbox-list">
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
