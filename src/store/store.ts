import { configureStore, isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import sessionStorage from 'redux-persist/es/storage/session';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { strA, strB, strC, strD, strE } from 'vars/const/SUBS_CONFIG';
import { authenticationSlice } from './user/authentication.slice';
import { locationSlice } from './location.slice';
import { ingoSlice } from './ingo/ingo.slice';
import { truliooSlice } from './trulioo/trulioo.slice';
import { uiSlice } from './ui.slice';
import { forgotPasswordSlice } from './user/forgotPassword/forgotPassword.slice';
import { registrationSlice } from './user/registration/registration.slice';
import { disclosuresSlice } from './user/disclosures/disclosures.slice';
import { accountOpeningDataSlice } from './user/properties/accountOpeningData.slice';
import { accountsSlice } from './user/accounts/accounts.slice';
import { historyFilterSlice } from './historyFilter/historyFilter.slice';
import { attuneSlice } from './user/attune/attune.slice';
import { alertsSlice } from './user/alerts/alerts.slice';
import { zogoSlice } from './user/zogo/zogo.slice';
import { helpSlice } from './user/help.slice';
import { paymentsSlice } from './user/payments/payments.slice';
import { cashAccountSlice } from './user/cashAccount/cashAccount.slice';
import { api } from './api';
import { unprotectedApi } from './unprotectedApi';
import { consentsSlice } from './user/consents/consents.slice';
import { waitlistProductsSlice } from './user/waitlistProducts/waitlistProducts.slice';
import { chatSlice } from './chat/chat.slice';
import { chatMiddleware } from './chat/chat.middleware';
import { atmLocationsSlice } from './user/atmLocations/atmLocations.slice';
import { notificationsCenterSlice } from './user/notificationsCenter/notificationsCenter.slice';

const encryptTransformer = encryptTransform({
  secretKey: [strA, strB, strC, strD, strE].join('-'),
  onError: () => {
    console.log('Decrypt persis error!');
  },
});

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
  blacklist: ['authentication', 'ui', 'chat', 'consents', 'help', 'notificationsCenter', api.reducerPath, unprotectedApi.reducerPath],
  transforms: [encryptTransformer],
};

const uiPersistConfig = {
  key: 'ui',
  storage: sessionStorage,
  blacklist: ['displayChat', 'navigationBarData', 'mainMenuData'],
  transforms: [encryptTransformer],
};

const authPersistConfig = {
  key: 'authentication',
  blacklist: ['consents', 'KYCData'],
  storage: sessionStorage,
  transforms: [encryptTransformer],
};

const reducers = combineReducers({
  [api.reducerPath]: api.reducer,
  [unprotectedApi.reducerPath]: unprotectedApi.reducer,
  forgotPassword: forgotPasswordSlice.reducer,
  registration: registrationSlice.reducer,
  authentication: persistReducer(authPersistConfig, authenticationSlice.reducer),
  zogo: zogoSlice.reducer,
  attune: attuneSlice.reducer,
  alerts: alertsSlice.reducer,
  disclosures: disclosuresSlice.reducer,
  consents: consentsSlice.reducer,
  ui: persistReducer(uiPersistConfig, uiSlice.reducer),
  location: locationSlice.reducer,
  ingo: ingoSlice.reducer,
  trulioo: truliooSlice.reducer,
  accountOpeningData: accountOpeningDataSlice.reducer,
  payments: paymentsSlice.reducer,
  accounts: accountsSlice.reducer,
  historyFilter: historyFilterSlice.reducer,
  help: helpSlice.reducer,
  cashAccount: cashAccountSlice.reducer,
  waitlistProducts: waitlistProductsSlice.reducer,
  chat: chatSlice.reducer,
  atmLocations: atmLocationsSlice.reducer,
  notificationsCenter: notificationsCenterSlice.reducer,
});

const persistedReducer = persistReducer<ReturnType<typeof reducers>>(persistConfig, reducers);

const errorLoggingMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.warn(action);
    console.error(
      'API Error: ',
      JSON.stringify({
        url: action.meta.baseQueryMeta?.request?.url,
        method: action.meta.baseQueryMeta?.request?.method,
        status: action.payload.status,
        responseData: action.payload.data,
      })
    );
  }

  return next(action);
};

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([api.middleware, unprotectedApi.middleware, chatMiddleware, errorLoggingMiddleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
