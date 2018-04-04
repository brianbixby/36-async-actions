const validateEntree = payload => {
  if(!payload._id) throw new Error('VALIDATION ERROR: entree must have an id');
  if(!payload.name) throw new Error('VALIDATION ERROR: entree must have a name');
  if(!payload.price) throw new Error('VALIDATION ERROR: entree must have a price');
  if(!payload.menuID) throw new Error('VALIDATION ERROR: entree must have a menuID');
};

export default (state=[], action) => {
  let { type, payload } = action;

  switch(type) {
    // case 'MENU_DELETE':
    //   return state.filter(entree => entree.menuID !== payload._id);
    // case 'MENU_RESET':
    //   return state = [];
    // case 'MENU_DROP_ENTREE':
    //   validateEntree(payload);
    //   return state.filter(entree => entree._id !== payload._id);
    case 'ENTREES_FETCH':
      return payload;
    case 'ENTREES_BY_MENU_FETCH':
      return payload;
    case 'ENTREE_FETCH':
      return payload;
    case 'ENTREE_CREATE':
      validateEntree(payload);
      return [payload, ...state];
    case 'ENTREE_UPDATE':
      validateEntree(payload);
      return state.map(entree => entree._id === payload._id ? payload : entree);
    // case 'ENTREE_CHANGE_MENU':
    //   validateEntree(payload);
    //   return state.map(entree => entree._id === payload._id ? payload : entree);
    case 'ENTREE_DELETE':
      return state.filter(entree => entree._id !== payload._id);
    // case 'ENTREE_RESET':
    //   return state = [];
    case 'MENUS_FETCH': {
      // payload => [ menus : { entrees } ]
      let entrees = [];
      payload.forEach(({ entrees: currentEntrees }) => {
        entrees = [...entrees, ...currentEntrees];
      });
      
      return entrees;
    }
    default:
      return state;
  }
};
