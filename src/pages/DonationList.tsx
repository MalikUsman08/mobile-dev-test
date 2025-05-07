import React, { useEffect } from 'react';
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonAlert,
  RefresherEventDetail,
  useIonViewDidEnter,
} from '@ionic/react';
import { DonationItem as DonationItemComponent } from '../components/DonationItem';
import { useDonations } from '../hooks/useDonations';

const DonationList: React.FC = () => {
  const {
    donations,
    loading,
    error,
    statusFilter,
    setStatusFilter,
    fetchDonations,
    deleteDonation,
    resetDonations,
  } = useDonations();

  useEffect(() => {
    fetchDonations();
  }, [fetchDonations]);

  // This will run every time the view enters
  useIonViewDidEnter(() => {
    fetchDonations();
  });

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    try {
      await fetchDonations();
    } finally {
      event.detail.complete();
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDonation(id);
    } catch (err) {
      console.error('Failed to delete donation:', err);
    }
  };

  const handleReset = async () => {
    try {
      await resetDonations();
    } catch (err) {
      console.error('Failed to reset donations:', err);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Donation List</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <IonSelect
              value={statusFilter}
              onIonChange={(e) => setStatusFilter(e.detail.value)}
              interface='popover'
            >
              <IonSelectOption value='all'>All</IonSelectOption>
              <IonSelectOption value='pending'>Pending</IonSelectOption>
              <IonSelectOption value='approved'>Approved</IonSelectOption>
              <IonSelectOption value='rejected'>Rejected</IonSelectOption>
            </IonSelect>
            <IonButton onClick={handleReset}>Reset</IonButton>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot='fixed' onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        {loading && (
          <div className='ion-text-center ion-padding'>
            <IonSpinner />
          </div>
        )}

        {error && (
          <IonAlert
            isOpen={!!error}
            onDidDismiss={() => {}}
            header='Error'
            message={error}
            buttons={['OK']}
          />
        )}

        {!loading && !error && donations.length === 0 && (
          <div className='ion-text-center ion-padding'>No donations found</div>
        )}

        {!loading && !error && donations.length > 0 && (
          <div style={{ padding: '8px 0' }}>
            {donations.map((donation) => (
              <DonationItemComponent
                key={donation.id}
                donation={donation}
                onDelete={() => handleDelete(donation.id)}
              />
            ))}
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default DonationList;
