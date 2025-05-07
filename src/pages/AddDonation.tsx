import React, { useState, useEffect, useRef } from 'react';
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
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useDonationForm } from '../hooks/useDonationForm';
import { donationService } from '../services/donationService';
import { Location, Theme } from '../interfaces/donation';

interface FormData {
  name: string;
  location: string;
  theme: string;
  price: {
    currencyCode: string;
    amount: number;
  };
}

const initialFormData: FormData = {
  name: '',
  location: '',
  theme: '',
  price: {
    currencyCode: 'GBP',
    amount: 0,
  },
};

const AddDonation: React.FC = () => {
  const history = useHistory();
  const { handleSubmit, isSubmitting, error, errors } = useDonationForm();
  const [locations, setLocations] = useState<Location[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const latestFormData = useRef<FormData>(formData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [locationsData, themesData] = await Promise.all([
          donationService.getLocations(),
          donationService.getThemes(),
        ]);
        setLocations(locationsData);
        setThemes(themesData);
      } catch {
        alert('Failed to load form data');
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    latestFormData.current = formData;
  }, [formData]);

  const handleInputChange = (field: string, value: string) => {
    if (field === 'price.amount') {
      const numericValue = value === '' ? 0 : Number(value);
      const newState = {
        ...formData,
        price: {
          ...formData.price,
          amount: numericValue,
        },
      };
      setFormData(newState);
      latestFormData.current = newState;
    } else {
      const newState = {
        ...formData,
        [field]: value,
      };
      setFormData(newState);
      latestFormData.current = newState;
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submissionData = {
      ...latestFormData.current,
      price: {
        ...latestFormData.current.price,
        amount: Number(latestFormData.current.price.amount),
      },
    };

    const result = await handleSubmit(submissionData);

    if (result) {
      setFormData(initialFormData);
      latestFormData.current = initialFormData;
      history.goBack();
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
        <form onSubmit={onSubmit}>
          <IonList>
            <IonItem>
              <IonLabel position='stacked'>Name</IonLabel>
              <IonInput
                value={formData.name}
                onIonChange={(e) =>
                  handleInputChange('name', e.detail.value || '')
                }
                placeholder='Enter donation name'
              />
            </IonItem>
            {errors.name && (
              <IonItem lines='none'>
                <IonLabel color='danger'>{errors.name}</IonLabel>
              </IonItem>
            )}

            <IonItem>
              <IonLabel position='stacked'>Location</IonLabel>
              <IonSelect
                value={formData.location}
                onIonChange={(e) =>
                  handleInputChange('location', e.detail.value || '')
                }
                placeholder='Select a location'
              >
                {locations.map((location) => (
                  <IonSelectOption key={location.id} value={location.id}>
                    {location.name}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            {errors.location && (
              <IonItem lines='none'>
                <IonLabel color='danger'>{errors.location}</IonLabel>
              </IonItem>
            )}

            <IonItem>
              <IonLabel position='stacked'>Theme</IonLabel>
              <IonSelect
                value={formData.theme}
                onIonChange={(e) =>
                  handleInputChange('theme', e.detail.value || '')
                }
                placeholder='Select a theme'
              >
                {themes.map((theme) => (
                  <IonSelectOption key={theme.id} value={theme.id}>
                    {theme.name}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            {errors.theme && (
              <IonItem lines='none'>
                <IonLabel color='danger'>{errors.theme}</IonLabel>
              </IonItem>
            )}

            <IonItem>
              <IonLabel position='stacked'>Price (GBP)</IonLabel>
              <IonInput
                type='number'
                value={formData.price.amount}
                onIonChange={(e) =>
                  handleInputChange('price.amount', e.detail.value || '')
                }
                placeholder='Enter price amount'
              />
            </IonItem>
            {errors.price && (
              <IonItem lines='none'>
                <IonLabel color='danger'>{errors.price}</IonLabel>
              </IonItem>
            )}

            {error && (
              <IonItem lines='none'>
                <IonLabel color='danger'>{error}</IonLabel>
              </IonItem>
            )}

            <div className='ion-padding'>
              <IonButton expand='block' type='submit' disabled={isSubmitting}>
                {isSubmitting ? <IonSpinner name='dots' /> : 'Create Donation'}
              </IonButton>
            </div>
          </IonList>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default AddDonation;
