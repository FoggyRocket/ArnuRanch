import api from "../../Api/Django";
export const GET_ANIMALS_SUCCESS = 'GET_ANIMALS_SUCCESS';

export function getAnimalsSuccess(animals){
    return{
        type:GET_ANIMALS_SUCCESS, animals
    }
}

export const getAnimals=()=>(dispatch, getState)=>{
    api.getAnimals()
        .then(r=>{
            //console.log(r.results)
            dispatch(getAnimalsSuccess(r.results))
        }).catch(e=>{
            console.log(e)
    })
};

/*FORM ANIMAL SAVE*/

export const SAVE_ANIMAL_SUCCESS = 'SAVE_ANIMAL_SUCCESS';

export function saveAnimalSuccess(animal){
    return{
        type:SAVE_ANIMAL_SUCCESS, animal
    }
}

export const saveAnimal=(animal)=>(dispatch, getState)=>{
    console.log("Pasé")
    api.newAnimal(animal)
        .then(r=>{
            console.log(r);
            dispatch(saveAnimalSuccess(r))
        }).catch(e=>{
        console.log(e)
    })
};