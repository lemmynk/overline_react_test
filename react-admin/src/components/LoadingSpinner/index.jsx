// @flow
import React from 'react';
import Spinner from './loading_spinner.gif';

type Props = {
  size?: number,
  altText?: string,
};

const LoadingSpinner = (props: Props) => {
  const { size, altText } = props;

  const imgStyle = {
    width: size,
    height: size,
  };

  return <img src={Spinner} style={imgStyle} alt={altText} />;
};

LoadingSpinner.defaultProps = {
  size: 64,
  altText: 'Loading...',
};

export default LoadingSpinner;
