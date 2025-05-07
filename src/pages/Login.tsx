import { useState, useEffect } from 'react';
import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonText,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  useEffect(() => {
    console.log('Login component mounted');
    return () => console.log('Login component unmounted');
  }, []);

  // Hardcoded credentials as per requirements
  const validUsername = 'admin';
  const validPassword = 'admin123';

  const handleLogin = () => {
    console.log('Login attempt with:', { username, password });
    console.log('Current history location:', history.location);

    if (username === validUsername && password === validPassword) {
      console.log('Login successful, navigating to /tabs/list');
      try {
        history.replace('/tabs/list');
        console.log('Navigation completed');
      } catch (error) {
        console.error('Navigation error:', error);
      }
    } else {
      console.log('Login failed: Invalid credentials');
      setError('Invalid credentials');
    }
  };

  const handleUsernameChange = (e: any) => {
    console.log('Username changed:', e.detail.value);
    setUsername(e.detail.value);
  };

  const handlePasswordChange = (e: any) => {
    console.log('Password changed');
    setPassword(e.detail.value);
  };

  return (
    <IonPage>
      <IonContent className='ion-padding'>
        <div
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <h2 className='ion-text-center'>Login</h2>
          <IonList>
            <IonItem>
              <IonLabel position='stacked'>Username</IonLabel>
              <IonInput
                value={username}
                onIonChange={handleUsernameChange}
                placeholder='Enter username'
              />
            </IonItem>
            <IonItem>
              <IonLabel position='stacked'>Password</IonLabel>
              <IonInput
                type='password'
                value={password}
                onIonChange={handlePasswordChange}
                placeholder='Enter password'
              />
            </IonItem>
          </IonList>

          {error && (
            <IonText color='danger' className='ion-text-center'>
              <p>{error}</p>
            </IonText>
          )}

          <IonButton
            expand='block'
            onClick={handleLogin}
            className='ion-margin-top'
          >
            Login
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
