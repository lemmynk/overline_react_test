import styled from 'styled-components';

export const FlexColumn = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const FlexColumnItem = styled.div`
  width: 100%;
  flex: ${props => (props.flex ? '1' : '0 0 auto')};
  ${props => props.flex && 'overflow-y: auto'};
`;
