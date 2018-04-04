import React, { Component, Fragment } from 'react';

import EntreeItem from '../entree-item';

class EntreeList extends Component {
  render() {
    const { entrees, entreeDelete } = this.props;

    return (
      <Fragment>
        {entrees.map(entree =>
          <EntreeItem key={entree._id} entree={entree} entreeDelete={entreeDelete(entree)} />
        )}
      </Fragment>
    );
  }
}

export default EntreeList;
