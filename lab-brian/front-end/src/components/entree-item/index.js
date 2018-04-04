import React, { Component, Fragment } from 'react';

class EntreeItem extends Component {
  render() {
    const {
      entree: {
        _id,
        name,
        price,
        menuID,
      },
      entreeDelete,
      entree,
    } = this.props;
    
    return (
      <Fragment>
        <p> ID: {_id}<br/>Name: {name}<br/>Price: ${price}<br/>Menu ID: {menuID} </p>
        <button onClick={() => entreeDelete()}>X</button>
      </Fragment>
    );
  }
}

export default EntreeItem;
