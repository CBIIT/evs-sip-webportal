import React from 'react';
import styled, { keyframes }from 'styled-components';

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  background-color: rgba(255, 255, 255, 0.8);
  transition: opacity 0.35s ease;
`;

const LoadingText = styled.div`
  margin-left: 0.7rem;
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(359deg);
  }
`;

const scale = keyframes`
  0%, 100% {
    transform: scale(0.0);
  }
  50% {
    transform: scale(1.0);
  }
`;

const SpinParticleContainer = styled.div`
  margin-right: 10px;
  width: 3rem;
  height: 3rem;
  display: block;
  animation: ${rotate} 2.0s infinite linear;
`;

const Particle = styled.div`
  width: 60%;
  height: 60%;
  display: inline-block;
  position: absolute;
  top: 0;
  background-color: #000;
  border-radius: 100%;
  animation: ${scale} 2.0s infinite ease-in-out;
`;

const ParticleRed = styled(Particle)`
  background-color: #c31547;
`;

const ParticleGreen = styled(Particle)`
  background-color: #6b6262;
  top: auto;
  bottom: 0;
  animation-delay: -1.0s;
`;

const ParticleBlue = styled(Particle)`
  background-color: #123e57;
  top: 0;
  bottom: auto;
  margin-left: 1.65rem;
  animation-delay: -1.2s;
`;

const LoadingAnimation = () => {
  return <LoadingContainer>
    <SpinParticleContainer>
      <ParticleRed/>
      <ParticleGreen/>
      <ParticleBlue/>
    </SpinParticleContainer>
    <LoadingText>Loading Data...</LoadingText>
  </LoadingContainer>
}

export default LoadingAnimation;
