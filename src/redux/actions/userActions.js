import api from "../../Api/Django";
import {getAnimals, getAnSearch, getReporte} from "./ganado/animalsActions";
import {getLoSearch, getLotes} from "./ganado/lotesActions";
import {getCorrales} from './ganado/corralesActions';
import {getProveedores, getPrSearch} from "./administracion/proveedoresActions";
import {getClientes, getClSearch} from "./administracion/clientesActions";
import {getPesadas} from "./ganado/pesadasActions";
import {getIngresos} from "./administracion/ingresosActions";
import {getFormulas} from "./plantaAlimentos/formulasActions";
import {getInsumos} from "./plantaAlimentos/insumosActions";
import {getEgresos} from "./administracion/egresosActions";
import {getAllUsers} from "./administracion/usersActions";
import {getRazas} from "./ganado/razasActions";
import {getItems} from "./plantaAlimentos/itemsActions";
import {getEmpresas} from "./empresasActions";
import {getVacunas} from "./vacunasActions";
import {getAlmacenes} from "./almacen/almacenActions";

import {getLines, getLiSearch} from "./blines/blinesActions";
import {getFacturas, getFaSearch} from "./facturas/facturasActions";

import {getCuentas, getCuSearch} from "./cuentas/cuentasActions";
import {getCompras, getCoSearch} from "./compras/comprasActions";
import {getGastos, getGgSearch} from "./gastoGanado/gastoGanadoActions";

import { getSaleNotes } from "./ganado/salenotesActions";

import {getDataDash} from "./dashGanado/dashGanadoActions";
//catalogos
import {getCatProduts} from "./catalogos/catProductosActions";
import {getCatUnidades} from "./catalogos/unidadmedidaActions";
import {getCatCfdis} from './catalogos/usoscfdiActions'
import {getCatPagos} from "./catalogos/formadepagoActions";
import {getCatBanks} from "./catalogos/cuentasbancariasActions";
import {getCatAlmacenes} from "./catalogos/almacenesActions";
import {getCatPresupuestos} from "./catalogos/presupuestosActions";

export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';

export function logInSuccess(user){
    return{
        type:LOG_IN_SUCCESS, user
    }
}


export const logIn=(data)=>(dispatch, getState)=>{
    return api.logIn(data)
        .then(r=>{
            localStorage.setItem('userRanchoToken', JSON.stringify(r.token));
            dispatch(checkIfUser());
        }).catch(e=>{
        throw e
    })
};

export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';

export function getUserSuccess(user){
    return{
        type:GET_USER_SUCCESS, user
    }
}

export const getUser=()=>(dispatch, getState)=>{
    return api.getUser()
        .then(r=>{
            dispatch(getUserSuccess(r))
        }).catch(e=>{
            throw e
        })
};

export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';

export function logOutSuccess(){
    return{
        type:LOG_OUT_SUCCESS
    }
}

export const logOut=()=>(dispatch)=>{
    localStorage.removeItem('userRanchoToken');
    dispatch(logOutSuccess())
};

export const checkIfUser=()=>(dispatch, getState)=>{
    
    const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
    if(userToken){
        //dispatch the functions
        dispatch(getUser());
        dispatch(getAllUsers());
        dispatch(getAnimals());
        dispatch(getLotes());
        dispatch(getRazas());
        dispatch(getCorrales());
        dispatch(getProveedores());
        dispatch(getClientes());
        dispatch(getPesadas());
        dispatch(getIngresos());
        dispatch(getFormulas());
        dispatch(getItems());
        dispatch(getInsumos());
        dispatch(getEgresos());
        dispatch(getEmpresas());
        dispatch(getVacunas());
        dispatch(getLines());
        dispatch(getLiSearch());
        dispatch(getAlmacenes());
        
        dispatch(getFacturas());
        dispatch(getFaSearch());
        dispatch(getAnSearch());
        dispatch(getLoSearch());
        
        dispatch(getCuentas());
        dispatch(getCuSearch());
        dispatch(getClSearch());
        dispatch(getPrSearch());
        dispatch(getCompras());
        dispatch(getCoSearch());
        dispatch(getGgSearch());
        dispatch(getGastos());
        dispatch(getDataDash());

        dispatch(getSaleNotes());

        dispatch(getReporte());
        //catalaogos
        dispatch(getCatProduts());
        dispatch(getCatUnidades());
        dispatch(getCatCfdis());
        dispatch(getCatPagos());
        dispatch(getCatBanks());
        dispatch(getCatAlmacenes());
        dispatch(getCatPresupuestos());


    }
};

