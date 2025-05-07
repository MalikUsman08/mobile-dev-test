import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { list, add } from 'ionicons/icons';

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

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

/* Pages */
import Splash from './pages/Splash';
import Login from './pages/Login';
import DonationList from './pages/DonationList';
import AddDonation from './pages/AddDonation';

setupIonicReact({
  mode: 'ios',
});

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path='/splash' component={Splash} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/'>
            <Redirect to='/splash' />
          </Route>
        </IonRouterOutlet>

        <Route path='/tabs'>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path='/tabs/list' component={DonationList} />
              <Route exact path='/tabs/add' component={AddDonation} />
              <Route exact path='/tabs'>
                <Redirect to='/tabs/list' />
              </Route>
            </IonRouterOutlet>

            <IonTabBar slot='bottom'>
              <IonTabButton tab='list' href='/tabs/list'>
                <IonIcon icon={list} />
                <IonLabel>Donations</IonLabel>
              </IonTabButton>
              <IonTabButton tab='add' href='/tabs/add'>
                <IonIcon icon={add} />
                <IonLabel>Add</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </Route>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
