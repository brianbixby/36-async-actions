import superagent from 'superagent';

// export const menusFetch = (menus) => ({
//   type: 'MENUS_FETCH',
//   payload: menus,
// });

export const menusFetch = (menus) => {
  console.log('menus fetch: ', menus);
  return ({
    type: 'MENUS_FETCH',
    payload: menus,
  });
};

export const menuFetch = (menu) => ({
  type: 'MENU_FETCH',
  payload: menu,
});

export const menuCreate = (menu) => ({
  type: 'MENU_CREATE',
  payload: menu,
});

export const menuUpdate = (menu) => ({
  type: 'MENU_UPDATE',
  payload: menu,
});

export const menuDelete = (menu) => ({
  type: 'MENU_DELETE',
  payload: menu,
});

// export const menuReset = () => ({ type: 'MENU_RESET' });

export const menusFetchRequest = () => (dispatch) => {
  return superagent.get(`${__API_URL__}/api/menu`)
    .then(res => {
      dispatch(menusFetch(res.body));
      return res;
    });
};

export const menuFetchRequest = (menu) => (dispatch) => {
  return superagent.get(`${__API_URL__}/api/menu/${menu._id}`)
    .then(res => {
      dispatch(menuFetch(res.body));
      return res;
    });
};

export const menuCreateRequest = (menu) => (dispatch) => {
  return superagent.post(`${__API_URL__}/api/menu`)
    .send(menu)
    .then(res => {
      dispatch(menuCreate(res.body));
      return res;
    });
};

export const menuUpdateRequest = (menu) => (dispatch) => {
  return superagent.put(`${__API_URL__}/api/menu/${menu._id}`)
    .send(menu)
    .then(res => {
      dispatch(menuUpdate(res.body));
      return res;
    });
};

export const menuDeleteRequest = (menu) => (dispatch) => {
  return superagent.delete(`${__API_URL__}/api/menu/${menu._id}`)
    .then(res => {
      dispatch(menuDelete(menu));
      return res;
    });
};
