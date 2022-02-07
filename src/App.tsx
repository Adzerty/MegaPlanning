import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonButton, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import React from 'react';
import Menu from './components/Menu';
import MenuCrous from './pages/MenuCrous';
import Horaires from './pages/Horaires';
import Devoirs from './pages/Devoirs';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <Menu/>
      <IonRouterOutlet id="mainContent">
        
        <Route exact path="/">
          <Redirect to="/home"/>
        </Route>

        <Route exact path="/menu">
          <MenuCrous />
        </Route>

        <Route exact path="/home">
          <Home />
        </Route>

        <Route exact path="/horaires">
          <Horaires />
        </Route>

        <Route exact path="/devoirs">
          <Devoirs />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
