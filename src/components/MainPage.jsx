import React from "react";
import { View, Text } from "react-native";

import styled from "styled-components/native";

import { MainContainer } from "../styles/index";

export default function MainPage() {
  return <BigBlueContainer></BigBlueContainer>;
}

const BigBlueContainer = styled.View`
  position: absolute;
  width: 392px;
  height: 324px;
  left: 0px;
  top: 0px;
  /* box-shadow: 0px 4px 10px 5px rgba(0, 0, 0, 0.1); */
  border-radius: 5px;
  background-color: #5b7fff;
  /* background: linear-gradient(53.34deg, #001AFF 1.07%, #5B7FFF 99.08%); */
`;
