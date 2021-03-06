import {combineReducers} from 'redux';
import {GET_PROVEEDORES_SUCCESS, SAVE_PROVEEDOR_SUCCESS, EDIT_PROVEEDOR_SUCCESS, DELETE_PROVEEDOR_SUCCESS, GET_PROVEEDORES_DATA_SUCCESS, GET_PRSEARCH_SUCCESS} from "../../actions/administracion/proveedoresActions";

function list(state=[], action){
    switch(action.type){
        case GET_PROVEEDORES_SUCCESS:
            return action.proveedores;
        case SAVE_PROVEEDOR_SUCCESS:
            return [action.proveedor, ...state];
        case EDIT_PROVEEDOR_SUCCESS:
            let newL = state.filter(a=>{
                return a.id!=action.proveedor.id
        });
            return [...newL, action.proveedor];
        case DELETE_PROVEEDOR_SUCCESS:
            let acualL = state.filter(a=>{
                return a.id!=action.proveedorId;
            });
            return acualL;
        default:
            return state;
    }
}

function allData(state={}, action){
    switch(action.type){
        case GET_PROVEEDORES_DATA_SUCCESS:
            return action.dataProvider;
        default:
            return state;
    }
}

function proveedorSearch(state={}, action){
    switch(action.type){
        case GET_PRSEARCH_SUCCESS:
            return action.proveedorS;
        default:
            return state;
    }
}


const proveedoresReducer = combineReducers({
    list:list,
    allData:allData,
    proveedorSearch: proveedorSearch
});


export default proveedoresReducer;