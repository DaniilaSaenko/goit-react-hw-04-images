import image from './funny-404-page.jpg';
import { Wrapper } from './NotFound.styled';
import Notification from '../../Notification';

export const NotFound = () => {
  return (
    <Wrapper>
      <Notification eventColor="red"> Enter something normal :) </Notification>
      <img src={image} alt="not found" style={{ width: 300 }} />
    </Wrapper>
  );
};
