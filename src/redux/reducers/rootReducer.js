import {combineReducers} from 'redux';
import animalsReducer from "./animalsReducer";
import userReducer from './userReducer';
import lotesReducer from "./lotesReducer";
import corralesReducer from './corralesReducer';
import proveedoresReducer from "./proveedoresReducer";
import clientesReducer from "./clientesReducer";
import pesadasReducer from "./pesadasReducer";


const rootReducer = combineReducers({
    animals:animalsReducer,
    user:userReducer,
    lotes:lotesReducer,
    corrales:corralesReducer,
    proveedores: proveedoresReducer,
    clientes: clientesReducer,
    pesadas:pesadasReducer,
});

export default rootReducer