// @flow
import React from 'react';
import styled from 'styled-components';
import {
  name as pckgName,
  version as pckgVersion,
} from '../../../package.json';

const Wrapper = styled.div`
  padding: 0 ${({ theme }) => theme.size.gutter};
`;

const FooterBrand = () => <Wrapper>{`${pckgName} ${pckgVersion}`}</Wrapper>;

export default FooterBrand;
