import { useCallback, useState } from "react";
import BaseModal from "../BaseModal";
import Heading from "../../Heading";
import { Stack, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { layoutActions } from "../../../store/layout/layoutSlice";
import { consignmentActions } from "../../../store/organizer/consignment/consignmentSlice";

enum STEPS {
  DESCRIPTION = 0,
  CHAIN = 1,
  REVIEW = 2,
}

interface FieldValues {
  name: string;
  description: string;
  images?: any;
  consignment_id?: any;
  payload: { name: string; description: string }[];
}
const CreateChainsModal = () => {
  const isOpenModal = useAppSelector((state) => state.layout.isOpenChainsModal);
  const dispatch = useAppDispatch();
  const [step, setStep] = useState(STEPS.DESCRIPTION);
  const [fields, setFields] = useState([{ id: 0 }]); // Mảng các field

  const addField = () => {
    setFields([...fields, { id: fields.length }]);
  };

  const removeField = (id: number) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  const onSubmitOrNext = async () => {
    if (step == STEPS.DESCRIPTION) {
      const result = await trigger(["name", "description"]);
      if (result) {
        setStep(step + 1);
      }
    } else if (step == STEPS.CHAIN) {
      const result = await trigger(["payload"]);
      if (result) {
        setStep(step + 1);
      }
    } else {
      handleSubmit(onSubmit);
    }
  };

  const onCloseModal = () => {
    reset();
    setStep(STEPS.DESCRIPTION);
    dispatch(layoutActions.closeModalChains());
    dispatch(consignmentActions.resetSelectedConsignment());
  };

  const onSecondaryAction = () => {
    if (step !== STEPS.DESCRIPTION) {
      setStep(step - 1);
    } else {
      onCloseModal();
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    clearErrors,
    trigger,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      images: [],
      payload: [{ name: "", description: "" }],
      consignment_id: null,
    },
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required("Insert name"),
        description: yup.string().required("Insert description"),
        // images: yup.array().min(1, "Insert images").required("Insert images"),
        payload: yup
          .array()
          .of(
            yup.object().shape({
              name: yup.string().required("Insert name"),
              description: yup.string().required("Insert description"),
            })
          )
          .min(1, "Insert Chain")
          .required("Insert images"),
      })
    ),
  });

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Create a new chain" />
      <TextField
        id="name"
        label="Chains Name"
        inputProps={{ ...register("name") }}
        error={!!errors.name?.message}
        required
        helperText={errors.name?.message}
        onChange={() => {
          if (errors.name) {
            clearErrors("name"); // Delete error "name" when change input hehe
          }
        }}
      />
      <TextField
        id="description"
        label="Description"
        inputProps={{ ...register("description") }}
        error={!!errors.description?.message}
        required
        helperText={errors.description?.message as string}
        onChange={() => {
          if (errors.description) {
            clearErrors("description");
          }
        }}
      />
    </div>
  );
  if (step === STEPS.CHAIN) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Add your step" />
        {fields.map((field) => (
          <div key={field.id}>
            <TextField
              id="name"
              label="Step name"
              inputProps={{ ...register(`payload.${field.id}.name`) }}
              error={
                !!errors.payload &&
                !!errors.payload[field.id] &&
                !!errors.payload[field.id]?.name
              }
              required
              helperText={
                !!errors.payload &&
                !!errors.payload[field.id] &&
                !!errors.payload[field.id]?.name &&
                errors.payload[field.id]?.name?.message
              }
              onChange={() => {
                if (
                  !!errors.payload &&
                  !!errors.payload[field.id] &&
                  !!errors.payload[field.id]?.name
                ) {
                  clearErrors(`payload.${field.id}.name`);
                }
              }}
            />
            <TextField
              id="name"
              label="Description"
              inputProps={{ ...register(`payload.${field.id}.description`) }}
              error={
                !!errors.payload &&
                !!errors.payload[field.id] &&
                !!errors.payload[field.id]?.description
              }
              required
              helperText={
                !!errors.payload &&
                !!errors.payload[field.id] &&
                !!errors.payload[field.id]?.description &&
                errors.payload[field.id]?.description?.message
              }
              onChange={() => {
                if (
                  !!errors.payload &&
                  !!errors.payload[field.id] &&
                  !!errors.payload[field.id]?.description
                ) {
                  clearErrors(`payload.${field.id}.description`);
                }
              }}
            />
            <button
              type="button"
              onClick={() => {
                removeField(field.id);
                clearErrors(`payload.${field.id}.name`);
                clearErrors(`payload.${field.id}.description`);
              }}
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addField}>
          Add Field
        </button>
      </div>
    );
  }
  return (
    <BaseModal
      disabled={false}
      isOpen={isOpenModal}
      title="Create a new Chains"
      actionLabel="Next"
      secondaryActionLabel={step == STEPS.DESCRIPTION ? "Cancle" : "Back"}
      onClose={onCloseModal}
      secondaryAction={onSecondaryAction}
      onSubmit={onSubmitOrNext}
      body={bodyContent}
    />
  );
};

export default CreateChainsModal;
