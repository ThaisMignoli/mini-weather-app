import React from "react";

import { 
  Container, 
  Icon,
  Title, 
  Text 
} from "./styles";

interface Props {
  icon: string;
  title: string;
  text: string;
}

const Condition = ({ icon, title, text }: Props) => {
  return (
    <Container>
      <Icon name={icon}/>
      <Title>{title}</Title>
      <Text>{text}</Text>
    </Container>
  )
}

export default Condition;