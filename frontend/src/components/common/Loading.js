import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import loader from './loader.gif';
import { finishLoading } from '../../modules/loading';

const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  animation: modal-bg-show 0.3s;
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Loading = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.loading);
  const handleBackgroundClick = e => {
    e.preventDefault();
    dispatch(finishLoading());
  };

  return (
    loading && (
      <Background onClick={handleBackgroundClick}>
        <img src={loader} alt="로딩 중" />
      </Background>
    )
  );
};

export default Loading;
