import React from 'react';
import styled from 'styled-components';


const SuggestObject = styled.div`
  line-height: 1.8em;
  font-size: 1em;
  display: flex;
  justify-content: space-between;

  &:hover {
    background-color: #f0f0f0;
  }

  &.selected {
    background-color: #f0f0f0;
  }
`;

const SuggestName = styled.div`
  margin: 0 .9em;
`;

const SuggestType = styled.div`
  font-weight: 700;
  margin-right: .9em;
`;

const SuggestItem = (props) => {
  return (
    <SuggestObject
      onClick={e => props.suggestClick(props.id, e)}
      className={props.index === props.selected ? 'selected' : ''}>
      <SuggestName>{props.item.id}</SuggestName>
      <SuggestType>{props.item.type.join(', ')}</SuggestType>
    </SuggestObject>
  );
};

export default SuggestItem;
