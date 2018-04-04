import superagent from 'superagent';

export const entreesFetch = (entrees) => {
  console.log('entrees fetch: ', entrees);
  return ({
    type: 'ENTREES_FETCH',
    payload: entrees,
  });
};

// ({
//   type: 'ENTREES_FETCH',
//   payload: entrees,
// });

export const entreesByMenuFetch = (entrees) => ({
  type: 'ENTREES_BY_MENU_FETCH',
  payload: entrees,
});

export const entreeFetch = (entree) => ({
  type: 'ENTREE_FETCH',
  payload: entree,
});

export const entreeCreate = (entree) => ({
  type: 'ENTREE_CREATE',
  payload: entree,
});

export const entreeUpdate = (entree) => ({
  type: 'ENTREE_UPDATE',
  payload: entree,
});

export const entreeDelete = (ids) => ({
  type: 'ENTREE_DELETE',
  payload: ids,
});

// export const entreeReset = () => ({ type: 'ENTREE_RESET' });

export const entreesFetchRequest = () => (dispatch) => {
  console.log('route hit');
  return superagent.get(`${__API_URL__}/api/entrees`)
    .then(res => {
      console.log('res: ', res);
      dispatch(entreesFetch(res.body));
      return res;
    });
};

// export const menusFetchRequest = () => (dispatch) => {
//   return superagent.get(`${__API_URL__}/api/menu`)
//     .then(res => {
//       dispatch(menusFetch(res.body));
//       return res;
//     });
// };

export const entreesByMenuFetchRequest = (menu) => (dispatch) => {
  return superagent.get(`${__API_URL__}/api/menu/${menu._id}/entree`)
    .then(res => {
      dispatch(entreesByMenuFetch(res.body));
      return res;
    });
};

export const entreeFetchRequest = (entree) => (dispatch) => {
  return superagent.get(`${__API_URL__}/api/menu/${entree.menuID}/entree/${entree._id}`)
    .then(res => {
      dispatch(entreeFetch(res.body));
      return res;
    });
};

export const entreeCreateRequest = (entree) => (dispatch) => {
  return superagent.post(`${__API_URL__}/api/menu/${entree.menuID}/entree`)
    .send(entree)
    .then(res => {
      dispatch(entreeCreate(res.body));
      return res;
    });
};

export const entreeUpdateRequest = (entree) => (dispatch) => {
  return superagent.put(`${__API_URL__}/api/menu/${entree.menuID}/entree/${entree._id}`)
    .send(entree)
    .then(res => {
      dispatch(entreeUpdate(res.body));
      return res;
    });
};

export const entreeDeleteRequest = ({ _id, menuID }) => (dispatch) => {
  console.log(`${__API_URL__}/api/entree/${menuID}/${_id}`);
  return superagent.delete(`${__API_URL__}/api/entree/${menuID}/${_id}`)
    .then(res => {
      dispatch(entreeDelete({ _id, menuID }));
      return res;
    });
};
