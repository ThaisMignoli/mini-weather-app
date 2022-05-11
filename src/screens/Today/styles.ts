import styled from "styled-components/native";
import { Feather } from '@expo/vector-icons'; 
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RFValue } from "react-native-responsive-fontsize";

interface Props {
  WeatherCode: number;
}

const { height } = Dimensions.get('window');

export const Container = styled(SafeAreaView)<Props>`
  flex: 1;

  background-color: ${({ theme, WeatherCode }) => 
   WeatherCode === ( 800  || 801)? theme.colors.background_light : theme.colors.background_dark
  };
`
export const ForecastWrapper = styled.ScrollView.attrs({
  contentContainerStyle: {
    justifyContent: 'space-between',
    paddingBottom: height * 0.02
  }
})`
`;

export const CurrentWrapper = styled.View`
  align-self: center;
  align-items: center;
  justify-content: center;

  width: 90%;

  margin: ${height * 0.04}px 0;
`;

export const LocationWrapper = styled.View`
  flex-direction: row;

  padding: 0 5%;
`;

export const LocationIcon = styled(Feather)`
  font-size: ${RFValue(20)}px;

  color: ${({ theme }) => theme.colors.text};

  margin-right: 3%;
`;

export const LocationName = styled.Text`
  color: ${({ theme }) => theme.colors.text};

  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(15)}px;
  text-align: center;

  margin-bottom: ${height * 0.01}px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text};

  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(15)}px;
  text-align: center;
  text-transform: capitalize;
`;

export const TemperatureWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Temperature = styled.Text`
  color: ${({ theme }) => theme.colors.text};

  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(90)}px;
`;

export const TodayIcon = styled.Image`
  height: ${height * 0.12}px;
  width: ${height * 0.12}px;
`;

export const ConditionWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;

  width: 100%;

  margin-top: ${height * 0.04}px;
`

export const TodayWeatherWrapper = styled.View`
  flex: 1;
  align-self: center;
  
  width: 90%;

  margin: ${height * 0.03}px 0;
`;

export const UpdatedAt = styled.Text`
  align-self: flex-end;

  color: ${({ theme }) => theme.colors.text};

  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(8)}px;

  opacity: 0.7;
`;

