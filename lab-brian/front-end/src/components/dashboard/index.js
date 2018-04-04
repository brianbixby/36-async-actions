import React from 'react';
import { connect } from 'react-redux';
import MenuForm from '../menu-form';
import EntreeForm from '../entree-form';
import EntreeList from '../entree-list';
import * as util from '../../lib/util';
import * as menuActions from '../../actions/menu-actions';
import * as entreeActions from '../../actions/entree-actions';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.menusFetch();
    // this.props.entreesFetch();
  }

  render() {
    return (
      <div className='menuDiv'>
        <h2> Menu Form </h2>
        <MenuForm onComplete={this.props.menuCreate} buttonText='Create a Menu' />
        {this.props.menus.map(menu =>
          <div key={menu._id}>
            <p> ID: {menu._id}<br/>Name: {menu.name}<br/>Created At: {menu.timestamp}<br/></p>
            { menu.entrees.map(entree => (
              <p key={entree._id}>{entree._id}</p>
            )) }
            <button onClick={() => this.props.menuDelete(menu)}>X</button>
          </div>
        )}
        <h2> Entree Form </h2>
        <EntreeForm onComplete={this.props.entreeCreate} buttonText='Create an Entree' />
        <EntreeList entrees={this.props.entrees} entreeDelete={this.props.entreeDelete} />
      </div>
    );
  }
}

const mapStateToProps = ({ menus, entrees }) => ({ menus, entrees });

const mapDispatchToProps = (dispatch) => ({
  menusFetch: () => dispatch(menuActions.menusFetchRequest()),
  menuFetch: (menu) => dispatch(menuActions.menuFetchRequest(menu)),
  menuCreate: (menu) => dispatch(menuActions.menuCreateRequest(menu)),
  menuUpdate: (menu) => dispatch(menuActions.menuUpdateRequest(menu)),
  menuDelete: (menu) => dispatch(menuActions.menuDeleteRequest(menu)),
  entreesFetch: () => dispatch(entreeActions.entreesFetchRequest()),
  entreesByMenuFetch: (entree) => dispatch(entreeActions.entreesByMenuFetchRequest(entree)),
  entreeFetch: (entree) => dispatch(entreeActions.entreeFetchRequest(entree)),
  entreeCreate: (entree) => dispatch(entreeActions.entreeCreateRequest(entree)),
  entreeUpdate: (entree) => dispatch(entreeActions.entreeUpdateRequest(entree)),
  // Rob - Currying entreeDelete for no other reason than we can and it's cool
  entreeDelete: (entree) => () => dispatch(entreeActions.entreeDeleteRequest(entree)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
