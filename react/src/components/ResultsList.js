import React from 'react';
import Result from './Result';

const ResultsList = (props) => {
  let results = props.data.map(result => {
    return (
      <Result
        key={result.id}
        id={result.id}
        name={result.name}
        latitude={result.latitude}
        longitude={result.longitude}
        clickHandler={props.clickHandler}
      />
    )
  })

  return(
    <div>
      <ul>
        {results}
      </ul>
    </div>
  )
}

export default ResultsList;
