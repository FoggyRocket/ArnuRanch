import api from "../../../Api/Django";



export const SAVE_ALMACEN_SUCCESS = 'SAVE_ALMACEN_SUCCESS';

export function saveAlmacenSuccess(almacen){
    return{
        type:SAVE_ALMACEN_SUCCESS, almacen
    }
}

export const saveAlmacen=(almacen)=>(dispatch, getState)=>{
    return api.newAlmacen(almacen)
        .then(r=>{
            console.log(r);
            dispatch(saveAlmacenSuccess(r));
        }).catch(e=>{
            console.log(e)
            throw e
        })
};

//EDIT

export const EDIT_ALMACEN_SUCCESS = 'EDIT_ALMACEN_SUCCESS';
export function editAlmacenSuccess(almacen) {
    return{
        type: EDIT_ALMACEN_SUCCESS, almacen
    }
}

export const editAlmacen=(almacen)=>(dispatch, getState)=>{
    return api.editAlmacen(almacen)
        .then(r=>{
            dispatch(editAlmacenSuccess(r))
            console.log(r);
        }).catch(e=>{
            console.log(e)
        })
};



//Delete

export const DELETE_ALMACEN_SUCCESS = 'DELETE_ALMACEN_SUCCESS';

export function deleteAlmacenSuccess(almacen){
    return {
        type:DELETE_ALMACEN_SUCCESS, almacen
    }
}

export const deleteAlmacen=(almacen)=>(dispatch, getState)=>{
    return api.deleteAlmacen(almacen.id)
        .then(r=>{
            dispatch(deleteAlmacenSuccess(almacen))
        }).catch(e=>{
            throw e;
        })
};

