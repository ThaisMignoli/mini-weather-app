import styled from "styled-components/native";
import { Feather } from '@expo/vector-icons'; 
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;

  color: ${({ theme }) => theme.colors.text};

  margin-right: 5%;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.primary};

  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(12)}px;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.primary};

  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
`;
