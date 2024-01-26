import styled, { keyframes, css } from 'styled-components';

// Keyframes
const jump = keyframes`
  100% {
    transform: translateY(-12px);
  }
`;

const shrink = keyframes`
  100% {
    transform: scaleX(.5);
    opacity: .01;
  }
`;

const ballAnimationDelay = (delay: number) => css`
  animation: ${jump} 0.5s ease ${delay}s infinite alternate;
`;

const shadowAnimationDelay = (delay: number) => css`
  animation: ${shrink} 0.5s ease ${delay}s infinite alternate;
`;

export const Container = styled.div`
  position: absolute;
  margin: auto;
  text-align: center;
  height: 18px;
  width: 50px;
  right: 30px;
  bottom: 90px;
`;

export const Ball = styled.div`
  width: 5px;
  position: relative;
  display: inline-block;
  margin: 1px;
  height: 5px;
  border-radius: 50%;
  z-index: 999;
  background-color: #3e4fe5;

  &.ball-one {
    ${ballAnimationDelay(0)}
  }
  &.ball-two {
    ${ballAnimationDelay(0.15)}
  }
  &.ball-three {
    ${ballAnimationDelay(0.25)}
  }
  &.ball-four {
    background-color: #0098fd;
    ${ballAnimationDelay(0.35)}
  }
  &.ball-five {
    background-color: #fff;
    ${ballAnimationDelay(0.45)}
  }
`;

export const Shadow = styled.div`
  position: relative;
  opacity: 0.1;
  bottom: 20px;
  width: 20px;
  height: 5px;
  border-radius: 50%;
  background-color: black;
  display: inline-block;
  margin: 5px;

  &.shadow-one {
    ${shadowAnimationDelay(0)}
  }
  &.shadow-two {
    ${shadowAnimationDelay(0.15)}
  }
  &.shadow-three {
    ${shadowAnimationDelay(0.25)}
  }
  &.shadow-four {
    ${shadowAnimationDelay(0.35)}
  }
  &.shadow-five {
    ${shadowAnimationDelay(0.45)}
  }
`;
