import React from 'react';
import {
  IonItem,
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
} from '@ionic/react';
import { DonationItem as DonationItemType } from '../interfaces/donation';

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
          <h2>{donation.name}</h2>
          {donation.reference && <p>Reference: {donation.reference.text}</p>}
          {donation.price && <p>Price: {donation.price.text}</p>}
          <p>Status: {donation.status.name}</p>
          {donation.location && <p>Location: {donation.location.name}</p>}
          {donation.theme && <p>Theme: {donation.theme.name}</p>}
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
