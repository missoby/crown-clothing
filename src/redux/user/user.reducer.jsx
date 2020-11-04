import {UserActionTypes} from './user.types';

const INITIAL_STATE = {
    currentUser: null,
}

/* Reducer est une fonction qui prend en paramètres :
    -- currentState (l'état courrant) ou l'état initial INITIAL_STATE (obligatoire, doit etre mis par défaut), 
    -- Action qui est un objet qui a : 
         - un type : (string value) => nom de l'action spécifique 
         - payload : any thing (data, ....) flexible 
*/

const userReducer = (state = INITIAL_STATE, action) => {
    /* tous les actions passent imperativement par tous les Reducer meme si il ne sont pas relier a ce dérnier, 
       c'est pourquoi il faut filtrer (switch) et il faut avoir un valeur par defaut (default qui recoit le Current state)
    */
    switch(action.type){
        /* une fois l'action SET_CURRENT_USER est déclancher, on retourne un nouveau objet qui represente le new state
           que le Reducer va le transformer :
            -- tous ce qu'il existe dans le State (...state)
            -- la valeur a changer (currentUser: action.payload)
        */
        case UserActionTypes.SET_CURRENT_USER : 
            return {
                ...state,
                currentUser : action.payload
            }
        default : return state;

    }
}

export default userReducer;