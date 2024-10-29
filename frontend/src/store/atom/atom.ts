import {atom} from 'recoil'


export const searchState = atom({
    key: 'searchState', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
  });

export const isAuthenticated = atom({
  key: 'isAuthenticated',
  default: localStorage.getItem("user") ? true : false,
});

export const Name = atom({
  key:"name",
  default: ""
});