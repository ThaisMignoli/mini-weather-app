import styled from "styled-components/native";
import { Feather } from '@expo/vector-icons'; 
import { Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

interface Props {
  WeatherCode: number;
}

export const { height } = Dimensions.get('window');

export const Container = styled.View<Props>`
  flex-direction: row;
  align-self: center;
  align-items: center;

  width: 100%;

  background-color: ${({ theme, WeatherCode }) => 
   WeatherCode === ( 800  || 801)? theme.colors.shape_light : theme.colors.shape_dark
  };

  border-radius: ${height * 0.02}px;

  padding: ${height * 0.01}px;
  margin-bottom: ${height * 0.02}px;
`;

export const ShiftIcon = styled(Feather)`
  font-size: ${RFValue(36)}px;

  color: ${({ theme }) => theme.colors.text};

  margin-right: 4%;
`;

export const TemperatureWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;

  padding: 0% 8%;
`;

export const Temperature = styled.Text`
  color: ${({ theme }) => theme.colors.text};

  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(20)}px;
`;
