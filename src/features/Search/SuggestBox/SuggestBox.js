import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import SuggestItem from './SuggestItem';

const Suggest = styled.div`
  position: relative;
`;

const SuggestContent = styled.div`
  width: 100%;
  display: none;
  border-radius: 0.3125rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: #fff;
  box-shadow: 0 0.125rem 0.1875rem 0.1875rem rgba(0,0,0,.16), 0 0 0 0.0625rem rgba(0,0,0,.08);
  position: absolute;
  top: 0.125rem;
  left: 0.1875rem;
  z-index: 100;
`;

const SuggestBox = (props) => {
  const node = useRef();

  useEffect(() => {
    const clickHandler = event => {
      // click inside component
      if (node.current.contains(event.target)) return;
      // click ooutside component
      props.cleanSuggest();
    };

    document.body.addEventListener('click', clickHandler);
    return () => document.body.removeEventListener('click', clickHandler);
  }, [props]);

  return (
    <Suggest>
      <SuggestContent ref={node} style={props.suggest.length === 0 ? {} : { display: 'block' }}>
        {props.suggest.length !== 0 &&
          props.suggest.map((item, index) => <SuggestItem item={item} key={index} selected={props.suggestSelected}/>)
        }
      </SuggestContent>
    </Suggest>
  );
};

export default SuggestBox;
