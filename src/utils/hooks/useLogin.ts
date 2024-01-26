import { useSelector } from 'react-redux';
import { selectLoginClicked, setLoginClicked } from 'store/ui.slice';
import { useAppDispatch } from './store';

export const useLogin = () => {
  const isLoginClicked = useSelector(selectLoginClicked);
  const dispatch = useAppDispatch();

  const handleLoginClicked = () => {
    dispatch(setLoginClicked(true));
  };

  const handleLoginClickedReset = () => {
    dispatch(setLoginClicked(false));
  };

  const getMotionAnimateVariant = () => (isLoginClicked ? 'hide' : 'show');

  return {
    isClicked: isLoginClicked,
    clicked: handleLoginClicked,
    reset: handleLoginClickedReset,
    motionVariant: getMotionAnimateVariant,
  };
};
