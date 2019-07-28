// @flow
import React from 'react';
import styled from 'styled-components';

type Props = {
  fileName: string,
  altText?: string,
};

const Logo = styled.img`
  width: 36px;
  height: auto;
  border-radius: 2px;
`;

const ListImage = (props: Props) => {
  const { fileName, altText } = props;
  const imagesUrl = process.env.REACT_APP_IMAGES_URL;
  if (!imagesUrl) {
    throw new Error('Images Url missing in env');
  }
  const src = `${imagesUrl}/${fileName}`;
  return <Logo src={src} alt={altText || fileName} />;
};

ListImage.defaultProps = {
  altText: '',
};

export default ListImage;
