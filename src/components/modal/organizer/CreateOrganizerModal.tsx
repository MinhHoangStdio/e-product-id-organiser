import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Heading from "../../Heading";
import { TextField } from "@mui/material";
import BaseModal from "../BaseModal";
import { layoutActions } from "../../../store/layout/layoutSlice";
import { organizerActions } from "../../../store/organizer/info/organizerSlice";

interface FieldValues {
  name: string;
}

const CreateOrganizerModal = () => {
  const dispatch = useAppDispatch();
  const loadingCreateOrganizer = useAppSelector(
    (state) => state.organizer.loadingCreateOrganizer
  );
  const isOpenModal = useAppSelector(
    (state) => state.layout.isOpenOrganizerModal
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required("Vui lòng nhập tên tổ chức"),
      })
    ),
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(organizerActions.createOrganizer(data));
  };

  const onCloseModal = () => {
    reset();
    dispatch(layoutActions.closeModalOrganizer());
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Tạo tổ chức của bạn" />
      <TextField
        id="name"
        label="Tên tổ chức"
        inputProps={{ ...register("name") }}
        error={!!errors.name?.message}
        required
        helperText={errors.name?.message}
      />
    </div>
  );

  return (
    <BaseModal
      disabled={loadingCreateOrganizer}
      isOpen={isOpenModal}
      title="Tạo tổ chức của bạn"
      actionLabel="Tạo"
      onClose={onCloseModal}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default CreateOrganizerModal;
