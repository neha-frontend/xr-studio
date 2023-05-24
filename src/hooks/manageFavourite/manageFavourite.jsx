import { useDispatch, useSelector } from 'react-redux';
import { addToFavouriteAction, removeFromFavouriteAction } from '../../store/sagaActions';

const useFavourite = (orgId, teamId, updateLike, isLiked) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.myTeam.favouriteTeam);
  const handleFavourite = () => {
    if (!isLoading) {
      if (isLiked) {
        updateLike(false);
        dispatch(removeFromFavouriteAction({ orgId, teamId, updateLike }));
      } else {
        updateLike(true);
        dispatch(addToFavouriteAction({ orgId, teamId, updateLike }));
      }
    }
  };

  return [handleFavourite];
};

export default useFavourite;
