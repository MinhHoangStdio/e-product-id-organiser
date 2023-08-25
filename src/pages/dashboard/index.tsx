import EmptyOrganizer from "../../components/organizer/EmptyOrganizer";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { layoutActions } from "../../store/layout/layoutSlice";
const InfoPage = () => {
  const dispatch = useAppDispatch();
  const organizer = useAppSelector((state) => state.organizer.userOrganizer);
  const openOrganizerModal = () => {
    dispatch(layoutActions.openModalOrganizer());
  };

  return organizer?.id ? (
    <>Hello world</>
  ) : (
    <EmptyOrganizer
      onAction={openOrganizerModal}
      labelBtn="Create Your Organizer"
    />
  );
};

export default InfoPage;
