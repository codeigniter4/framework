import React from 'react';
import ComplexCard from './Card';

const CardView = (props) => {
  const { rows } = props;

  return (
    <React.Fragment>
      {rows && rows.length ? rows.map(row => {
        return (<ComplexCard key={row.id} data={row}/>)
      }) : 'No Data'}

    </React.Fragment>
  )
}

CardView.propTypes = {
};

export default (CardView);
