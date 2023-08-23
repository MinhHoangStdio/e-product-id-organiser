import { useCallback, useEffect, useState } from "react";
import BaseModal from "../BaseModal";
import Heading from "../../Heading";
import {
  FormHelperText,
  Grid,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { layoutActions } from "../../../store/layout/layoutSlice";
import { consignmentActions } from "../../../store/organizer/consignment/consignmentSlice";
import CustomButton from "../../share/CustomButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ImageUpload from "../../organizer/product/ImageUpload";
import { countTotalElements } from "../../../utils/share";
import DropzoneCustom from "../../share/dropzone/DropzoneCustom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { chainsActions } from "../../../store/organizer/chains/chainsSlice";

enum STEPS {
  DESCRIPTION = 0,
  CHAIN = 1,
  REVIEW = 2,
}

interface FieldValues {
  name: string;
  description: string;
  images: any;
  consignment_id?: any;
  payload: { name: string; description: string }[];
}
const CreateChainsModal = () => {
  const theme = useTheme();
  const isOpenModal = useAppSelector((state) => state.layout.isOpenChainsModal);
  const consignmentSelected = useAppSelector(
    (state) => state.consignment.consignmentSelected
  );
  const dispatch = useAppDispatch();
  const [step, setStep] = useState(STEPS.DESCRIPTION);
  const [fields, setFields] = useState([{ id: 0, deleted: false }]); // Mảng các field

  //==========================================================handle upload imgs//==========================================================
  const listImage = useAppSelector((state) => state.chains.temporarylistImgUrl);
  const loadingCreateChains = useAppSelector(
    (state) => state.chains.loadingCreateChains
  );
  const deleteImageUpload = (file: any) => {
    dispatch(chainsActions.deleteATemporaryImgUrl(file));
  };
  const plusTemporaryImages = (listImg: any) => {
    dispatch(chainsActions.plusTemporaryListImgUrl(listImg));
  };
  const uploadTemporaryImages = (listImg: any) => {
    setValue("images", listImg);
    dispatch(chainsActions.settemporarylistImgUrl(listImg));
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    clearErrors,
    trigger,
    unregister,
    getValues,
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
        images: yup.array().min(1, "Insert images").required("Insert images"),
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

  useEffect(() => {
    setValue("images", listImage);
    clearErrors("images");
  }, [listImage]);
  useEffect(() => {
    if (consignmentSelected?.name) {
      setValue("consignment_id", consignmentSelected?.id);
    } else {
      reset();
    }
  }, [consignmentSelected, setValue]);

  const addField = () => {
    setFields([...fields, { id: fields.length, deleted: false }]);
  };

  const removeField = (id: number) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const resetField = () => {
    setFields([{ id: 0, deleted: false }]);
  };

  const onSubmitOrNext = async () => {
    if (step == STEPS.DESCRIPTION) {
      const result = await trigger(["name", "description", "images"]);
      if (result) {
        setStep(step + 1);
      }
    } else if (step == STEPS.CHAIN) {
      const result = await trigger(["payload"]);
      if (result) {
        setStep(step + 1);
      }
    } else {
      const payload = {
        params: formValues,
        formData: listImage,
        onReset() {
          dispatch(chainsActions.resetTemporarylistImgUrl());
          dispatch(layoutActions.closeModalChains());
          reset();
        },
      };
      dispatch(chainsActions.createChains(payload));
    }
  };

  const onCloseModal = () => {
    reset();
    setStep(STEPS.DESCRIPTION);
    resetField();
    dispatch(layoutActions.closeModalChains());
    dispatch(chainsActions.resetTemporarylistImgUrl());
    dispatch(consignmentActions.resetSelectedConsignment());
  };

  const onSecondaryAction = () => {
    if (step !== STEPS.DESCRIPTION) {
      setStep(step - 1);
    } else {
      onCloseModal();
    }
  };

  const formValues = getValues();

  //==========================================================DESCRIPTION//==========================================================
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
      <Stack
        gap={1}
        sx={{
          border: `1px solid ${
            errors.images?.message ? theme.palette.error.main : "#ccc"
          }`,
          p: 2,
          borderRadius: 1,
        }}
      >
        <b>{`Insert images*(Max:4)`}</b>
        {errors.images?.message ? (
          <FormHelperText error>
            {errors.images?.message as string}
          </FormHelperText>
        ) : (
          <></>
        )}

        <Stack direction="row" gap={1}>
          {listImage.length
            ? listImage.map((img: any, i: number) => (
                <ImageUpload
                  key={i}
                  width="25%"
                  src={img.preview}
                  onDelete={() => {
                    deleteImageUpload(img);
                  }}
                />
              ))
            : null}
          {!!listImage.length && countTotalElements(listImage) < 4 ? (
            <DropzoneCustom
              Icon={AddCircleOutlineIcon}
              maxFile={
                4 - countTotalElements(listImage) > 1
                  ? 4 - countTotalElements(listImage)
                  : 1
              }
              onUploadTemporaryImage={plusTemporaryImages}
              typeAppend={"files"}
              width="25%"
            />
          ) : (
            <></>
          )}
        </Stack>

        {!listImage.length ? (
          <DropzoneCustom
            maxFile={4}
            onUploadTemporaryImage={uploadTemporaryImages}
            typeAppend={"files"}
          />
        ) : (
          <></>
        )}
      </Stack>
    </div>
  );

  //==========================================================CHAINS//==========================================================
  if (step === STEPS.CHAIN) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Add your step" />
        {fields.map((field, i) => {
          return (
            <Grid container key={field.id}>
              <Grid item xs={12} sx={{ mb: 1 }}>
                <Typography variant="h4" fontWeight="500">{`Step ${
                  i + 1
                }`}</Typography>
              </Grid>
              <Grid item xs={11}>
                <Stack gap={1}>
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
                    fullWidth
                    id="name"
                    label="Description"
                    inputProps={{
                      ...register(`payload.${field.id}.description`),
                    }}
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
                </Stack>
              </Grid>
              {field.id > 0 && (
                <Grid item xs={1} sx={{ p: 1 }} alignSelf="center">
                  <CustomButton
                    onClick={() => {
                      console.log({ formValues });
                      removeField(field.id);
                      unregister(`payload.${field.id}`);
                    }}
                    label=""
                    color="error"
                    Icon={<DeleteIcon />}
                  />
                </Grid>
              )}
            </Grid>
          );
        })}
        <CustomButton
          width="180px"
          onClick={addField}
          label="ADD A NEW STEP"
          color="primary"
          Icon={<AddIcon />}
        />
      </div>
    );
  }

  //==========================================================REVIEW//==========================================================
  if (step == STEPS.REVIEW) {
    bodyContent = (
      <div className="flex flex-col gap-2">
        <Heading title="Review your chains" />
        <Stack>
          <Typography variant="h4">{formValues.name}</Typography>
          <Typography variant="h5" sx={{ color: "#595959" }}>
            {formValues.description}
          </Typography>
        </Stack>

        {formValues.payload.map((data, i) => (
          <Stack key={i}>
            <Typography variant="h5" fontWeight={500}>
              step {i + 1} : {data.name}
            </Typography>
            <Typography sx={{ color: "#595959" }}>
              description: {data.description}
            </Typography>
          </Stack>
        ))}
      </div>
    );
  }

  return (
    <BaseModal
      disabled={loadingCreateChains}
      isOpen={isOpenModal}
      title="Create a new Chains"
      actionLabel={step !== STEPS.REVIEW ? "Next" : "Create"}
      secondaryActionLabel={step == STEPS.DESCRIPTION ? "Cancel" : "Back"}
      onClose={onCloseModal}
      secondaryAction={onSecondaryAction}
      onSubmit={onSubmitOrNext}
      body={bodyContent}
    />
  );
};

export default CreateChainsModal;
