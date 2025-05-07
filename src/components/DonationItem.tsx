import React from 'react';
import {
  IonItem,
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonChip,
  IonIcon,
} from '@ionic/react';
import { DonationItem as DonationItemType } from '../interfaces/donation';
import {
  locationOutline,
  colorPaletteOutline,
  cashOutline,
  informationCircleOutline,
} from 'ionicons/icons';

export interface DonationItemProps {
  donation: DonationItemType;
  onDelete: () => void;
}

export const DonationItem: React.FC<DonationItemProps> = ({
  donation,
  onDelete,
}) => {
  return (
    <IonItemSliding>
      <IonItem lines='full'>
        <IonLabel className='ion-padding-vertical'>
          <h2
            style={{
              marginBottom: '12px',
              fontSize: '1.1rem',
              fontWeight: '500',
            }}
          >
            {donation.name}
          </h2>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: '8px',
              alignItems: 'center',
            }}
          >
            <IonChip color='primary' style={{ margin: '2px' }}>
              <IonIcon icon={cashOutline} style={{ marginRight: '4px' }} />
              <IonLabel>{donation.price?.text || 'No price'}</IonLabel>
            </IonChip>
            <IonChip color='secondary' style={{ margin: '2px' }}>
              <IonIcon icon={locationOutline} style={{ marginRight: '4px' }} />
              <IonLabel>{donation.location?.name || 'No location'}</IonLabel>
            </IonChip>
            <IonChip color='tertiary' style={{ margin: '2px' }}>
              <IonIcon
                icon={colorPaletteOutline}
                style={{ marginRight: '4px' }}
              />
              <IonLabel>{donation.theme?.name || 'No theme'}</IonLabel>
            </IonChip>
            <IonChip
              color={
                donation.status.name === 'Approved'
                  ? 'success'
                  : donation.status.name === 'Rejected'
                  ? 'danger'
                  : 'warning'
              }
              style={{ margin: '2px' }}
            >
              <IonIcon
                icon={informationCircleOutline}
                style={{ marginRight: '4px' }}
              />
              <IonLabel>{donation.status.name}</IonLabel>
            </IonChip>
          </div>
          {donation.reference && (
            <p
              style={{
                fontSize: '0.9em',
                color: 'var(--ion-color-medium)',
                margin: '4px 0 0 0',
              }}
            >
              Reference: {donation.reference.text}
            </p>
          )}
        </IonLabel>
      </IonItem>
      <IonItemOptions side='end'>
        <IonItemOption color='danger' onClick={onDelete}>
          Delete
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};
