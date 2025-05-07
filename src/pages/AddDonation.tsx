import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonAlert,
} from '@ionic/react';
import { useDonationForm } from '../hooks/useDonationForm';
import { useOptions } from '../hooks/useOptions';

const AddDonation: React.FC = () => {
  const history = useHistory();
  const {
    formData,
    errors,
    validateForm,
    handleInputChange,
    handlePriceChange,
    resetForm,
    getNewDonationItem,
  } = useDonationForm();

  const {
    locations,
    themes,
    loading: optionsLoading,
    error: optionsError,
    fetchAllOptions,
  } = useOptions();

  useEffect(() => {
    fetchAllOptions();
  }, [fetchAllOptions]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const newDonation = getNewDonationItem();
      await fetch(
        'https://n3o-coding-task-react.azurewebsites.net/api/v1/donationItems',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(newDonation),
        }
      );

      resetForm();
      history.replace('/tabs/list', { refresh: true });
    } catch (err) {
      console.error('Failed to create donation:', err);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Donation</IonTitle>
          <IonButtons slot='end'>
            <IonButton onClick={() => history.goBack()}>Cancel</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {optionsLoading && (
          <div className='ion-text-center ion-padding'>
            <IonSpinner />
          </div>
        )}

        {optionsError && (
          <IonAlert
            isOpen={!!optionsError}
            onDidDismiss={() => {}}
            header='Error'
            message={optionsError}
            buttons={['OK']}
          />
        )}

        {!optionsLoading && !optionsError && (
          <form onSubmit={handleSubmit}>
            <IonList>
              <IonItem>
                <IonLabel position='stacked'>Name</IonLabel>
                <IonInput
                  value={formData.name}
                  onIonChange={(e) =>
                    handleInputChange('name', e.detail.value!)
                  }
                  placeholder='Enter donation name'
                />
                {errors.name && (
                  <IonLabel color='danger'>{errors.name}</IonLabel>
                )}
              </IonItem>

              <IonItem>
                <IonLabel position='stacked'>Price</IonLabel>
                <IonInput
                  type='number'
                  value={formData.price.amount}
                  onIonChange={(e) =>
                    handlePriceChange('amount', Number(e.detail.value))
                  }
                  placeholder='Enter price amount'
                />
                {errors.price && (
                  <IonLabel color='danger'>{errors.price}</IonLabel>
                )}
              </IonItem>

              <IonItem>
                <IonLabel position='stacked'>Location</IonLabel>
                <IonSelect
                  value={formData.locationId}
                  onIonChange={(e) =>
                    handleInputChange('locationId', e.detail.value)
                  }
                >
                  {locations.map((location) => (
                    <IonSelectOption key={location.id} value={location.id}>
                      {location.name}
                    </IonSelectOption>
                  ))}
                </IonSelect>
                {errors.locationId && (
                  <IonLabel color='danger'>{errors.locationId}</IonLabel>
                )}
              </IonItem>

              <IonItem>
                <IonLabel position='stacked'>Theme</IonLabel>
                <IonSelect
                  value={formData.themeId}
                  onIonChange={(e) =>
                    handleInputChange('themeId', e.detail.value)
                  }
                >
                  {themes.map((theme) => (
                    <IonSelectOption key={theme.id} value={theme.id}>
                      {theme.name}
                    </IonSelectOption>
                  ))}
                </IonSelect>
                {errors.themeId && (
                  <IonLabel color='danger'>{errors.themeId}</IonLabel>
                )}
              </IonItem>

              <div className='ion-padding'>
                <IonButton expand='block' type='submit'>
                  Add Donation
                </IonButton>
              </div>
            </IonList>
          </form>
        )}
      </IonContent>
    </IonPage>
  );
};

export default AddDonation;
