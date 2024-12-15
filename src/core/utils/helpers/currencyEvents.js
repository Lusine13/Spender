import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase'; 
import { FIRESTORE_PATH_NAMES } from '../constants';

export const saveCurrencyToFirestore = async (uid, currency) => {
  try {
    const userSettingsRef = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid, 'settings', 'currency');    
    
    await setDoc(userSettingsRef, {
      currency: currency  
    }, { merge: true });  

    console.log('Currency updated successfully!');
  } catch (error) {
    console.error('Error updating currency: ', error);
    throw error;  
  }
};

export const fetchCurrencyFromFirestore = async (uid) => {
  try {
    const userSettingsRef = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid, 'settings', 'currency');
    const docSnapshot = await getDoc(userSettingsRef);

    if (docSnapshot.exists()) {
      return docSnapshot.data().currency || 'usd';  
    } else {
      return 'usd'; 
    }
  } catch (error) {
    console.error('Error fetching currency: ', error);
    return 'usd'; 
  }
};

