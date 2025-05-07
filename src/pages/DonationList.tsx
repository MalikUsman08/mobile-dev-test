import React, { useEffect } from 'react';
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonAlert,
  RefresherEventDetail,
} from '@ionic/react';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
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

  const renderDonationItem = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const donation = donations[index];
    return (
      <div style={style}>
        <DonationItemComponent
          donation={donation}
          onDelete={() => handleDelete(donation.id)}
        />
      </div>
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Donation List</IonTitle>
          <IonButtons slot='end'>
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
          </IonButtons>
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
          <div style={{ height: 'calc(100vh - 56px)' }}>
            <AutoSizer>
              {({ height, width }) => (
                <FixedSizeList
                  height={height}
                  width={width}
                  itemCount={donations.length}
                  itemSize={100}
                >
                  {renderDonationItem}
                </FixedSizeList>
              )}
            </AutoSizer>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default DonationList;
