const validateMenu = payload => {
  if(!payload._id) throw new Error('VALIDATION ERROR: menjay must have an id');
  if(!payload.name) throw new Error('VALIDATION ERROR: manjay must have a name');
  if(!payload.timestamp) throw new Error('VALIDATION ERROR: manjay must have a timestamp');
};

export default(state = [], action) => {
  let { type, payload } = action;

  switch(type) {
    case 'MENUS_FETCH':
      return payload;
    case 'MENU_FETCH':
      validateMenu(payload);
      return state.filter( menu => menu._id === payload._id);
    case 'MENU_CREATE':
      validateMenu(payload);
      return [...state, payload];
    case 'MENU_UPDATE':
      validateMenu(payload);
      return state.map(menu => menu._id === payload._id ? payload : menu);
    case 'MENU_DELETE':
      validateMenu(payload);
      return state.filter( menu => menu._id !== payload._id);

    // case 'ENTREE_CREATE':
    //   return state.map(menu => menu.id === payload.menuID ? {...menu, entrees: [...payload._id ] } : menu);
    case 'ENTREE_DELETE':
      return state.map(menu => {
        if (menu._id !== payload.menuID) return menu;
        const { entrees } = menu;

        return {...menu, entrees: entrees.filter(entree => entree._id !== payload._id) };
      });

    // case 'MENU_RESET':
    //   return state = [];
    default:
      return state;
  }
};
