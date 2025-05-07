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
      <IonItem>
        <IonLabel>
          <h2 style={{ marginBottom: '8px' }}>{donation.name}</h2>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: '8px',
            }}
          >
            <IonChip color='primary'>
              <IonIcon icon={cashOutline} />
              <IonLabel>{donation.price?.text || 'No price'}</IonLabel>
            </IonChip>
            <IonChip color='secondary'>
              <IonIcon icon={locationOutline} />
              <IonLabel>{donation.location?.name || 'No location'}</IonLabel>
            </IonChip>
            <IonChip color='tertiary'>
              <IonIcon icon={colorPaletteOutline} />
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
            >
              <IonIcon icon={informationCircleOutline} />
              <IonLabel>{donation.status.name}</IonLabel>
            </IonChip>
          </div>
          {donation.reference && (
            <p style={{ fontSize: '0.9em', color: 'var(--ion-color-medium)' }}>
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
