import { IonButton, IonButtons, IonChip, IonContent, IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonPage, IonPopover, IonTitle, IonToolbar, useIonAlert } from '@ionic/react';
import { PaymentMethod } from '../types/payment_methods';
import './Tab1.css';
import UPIIcon from '../graphics/upi-icon.svg'
import { addOutline, cashOutline, trashOutline } from 'ionicons/icons';
import { useCallback, useState } from 'react';
const testData: PaymentMethod[] = [
  {
    type: 'UPI',
    upiID: '9674943529@upi',
    id: 'dsohcbodwuwfewdbv',
    name: 'Google Pay'
  },
  {
    id: 'liasbervercuisabc',
    type: 'bank_account',
    name: 'Personal',
    IFSC: 'SBIN0003762',
    accountHolderName: 'Nikhil',
    accountNumber: '20294443298',
    bankName: 'State Bank of India',
    isDefault: true
  },
  {
    id: 'liasbcudvqdisabc',
    type: 'bank_account',
    name: 'Personal',
    IFSC: 'SBIN0003762',
    accountHolderName: 'Nikhil',
    accountNumber: '20294443298',
    bankName: 'State Bank of India',
    isDefault: false
  },
  {
    id: 'liwdvcewvcasbcuisabc',
    type: 'bank_account',
    name: 'Personal',
    IFSC: 'SBIN0003762',
    accountHolderName: 'Nikhil',
    accountNumber: '20294443298',
    bankName: 'State Bank of India',
    isDefault: false
  },
  {
    type: 'UPI',
    upiID: '9674943529@upi',
    id: 'dsohcbodwubv',
    name: 'Google Pay'
  },
  {
    id: 'liasbcuefvervisabc',
    type: 'bank_account',
    name: 'Personal',
    IFSC: 'SBIN0003762',
    accountHolderName: 'Nikhil',
    accountNumber: '20294443298',
    bankName: 'State Bank of India',
    isDefault: false
  },
  {
    id: 'liasbcuivwdvwqwdqsabc',
    type: 'bank_account',
    name: 'Personal',
    IFSC: 'SBIN0003762',
    accountHolderName: 'Nikhil',
    accountNumber: '20294443298',
    bankName: 'State Bank of India',
    isDefault: false
  },
  {
    id: 'liasbcwdoqwuibcuoiqwuisabc',
    type: 'bank_account',
    name: 'Personal',
    IFSC: 'SBIN0003762',
    accountHolderName: 'Nikhil',
    accountNumber: '20294443298',
    bankName: 'State Bank of India',
    isDefault: false
  },
  {
    type: 'UPI',
    upiID: '9674943529@upi',
    id: 'dsohcbowepfnewpdbqwvdyovdwubv',
    name: 'Google Pay'
  },
  {
    id: 'liasbcusfvewcub9quisabc',
    type: 'bank_account',
    name: 'Personal',
    IFSC: 'SBIN0003762',
    accountHolderName: 'Nikhil',
    accountNumber: '20294443298',
    bankName: 'State Bank of India',
    isDefault: false
  },
  {
    id: 'liasbcuiverwvwevsabc',
    type: 'bank_account',
    name: 'Personal',
    IFSC: 'SBIN0003762',
    accountHolderName: 'Nikhil',
    accountNumber: '20294443298',
    bankName: 'State Bank of India',
    isDefault: false
  },
  {
    id: 'liasbdwcewobcuewbcuisabc',
    type: 'bank_account',
    name: 'Personal',
    IFSC: 'SBIN0003762',
    accountHolderName: 'Nikhil',
    accountNumber: '20294443298',
    bankName: 'State Bank of India',
    isDefault: false
  }
]


const Tab1: React.FC = () => {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(testData)

  const deletePaymentMethod = useCallback((id: string) => {
    let currentArray = [...paymentMethods]

    let newArray = currentArray.filter(p => p.id !== id)

    setPaymentMethods(newArray)
  }, [paymentMethods])

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Payment Methods</IonTitle>
          <IonButtons slot="primary">
            <IonButton id="add-button">
              <IonIcon slot="icon-only" icon={addOutline} />
            </IonButton>
            <IonPopover trigger="add-button" arrow dismissOnSelect translucent className='add-popover'>
              <IonList lines='none' className="ion-padding-vertical">
                <IonItem button>
                  <IonIcon src={UPIIcon} slot="start" />
                  <IonLabel>UPI ID</IonLabel>
                </IonItem>
                <IonItem button>
                  <IonIcon icon={cashOutline} slot="start" />
                  <IonLabel>Bank Account</IonLabel>
                </IonItem>
              </IonList>
            </IonPopover>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Payment Methods</IonTitle>
          </IonToolbar>
        </IonHeader>
        {loading ? <p>Loading...</p> :
          error ? <p>Error</p> :
            paymentMethods.length === 0 ? <p>No items to show</p> :
              <IonList className='ion-padding-top'>
                {paymentMethods.map(payment => <PaymentMethodItem paymentMethod={payment} key={payment.id} deletePaymentItem={deletePaymentMethod} />)}
              </IonList>
        }
      </IonContent>
    </IonPage>
  );
};


interface ItemProps {
  paymentMethod: PaymentMethod,
  deletePaymentItem: (id: string) => void
}
export const PaymentMethodItem = ({ paymentMethod, deletePaymentItem }: ItemProps) => {


  const [presentDeleteAlert] = useIonAlert();

  const onDelete = () => {
    presentDeleteAlert({
      animated: true,
      backdropDismiss: true,
      message: "Are you sure you want to delete this payment method?",
      header: "Delete payment method?",
      buttons: [
        'Cancel',
        { text: 'Delete', role: 'destructive', handler: (d) => deletePaymentItem(paymentMethod.id) },
      ],
    })
  }
  if (paymentMethod.type === 'UPI') {
    return <IonItemSliding >
      <IonItem routerLink={`/payment-method/${paymentMethod.id}`}>
        <IonIcon src={UPIIcon} slot="start" size='small' />
        <IonLabel className='payment-item'>
          <h4>{paymentMethod.name}</h4>
          <span className='payment-item-detail'>{paymentMethod.upiID}</span>
        </IonLabel>
      </IonItem>
      <IonItemOptions onIonSwipe={onDelete}>
        <IonItemOption color="danger" expandable onClick={onDelete}>
          <IonIcon slot="start" icon={trashOutline} />
          Delete
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  }
  else {
    return <IonItemSliding><IonItem routerLink={`/payment-method/${paymentMethod.id}`}>
      <IonIcon icon={cashOutline} slot="start" size='small' />
      <IonLabel className='payment-item'>
        <h4>{paymentMethod.name}</h4>
        <span className='payment-item-detail'>{paymentMethod.bankName} - {paymentMethod.accountNumber}</span>
      </IonLabel>
      {paymentMethod.isDefault &&
        <IonChip slot="end" color='primary'>
          <IonLabel style={{ fontSize: '12px' }}>Default</IonLabel>
        </IonChip>
      }
    </IonItem>
      <IonItemOptions onIonSwipe={onDelete}>
        <IonItemOption color="danger" expandable onClick={onDelete}>
          <IonIcon slot="start" icon={trashOutline} />
          Delete
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  }
}
export default Tab1;
