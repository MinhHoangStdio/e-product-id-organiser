import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import BaseModal from "../BaseModal";
import Heading from "../../Heading";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import {
  FormHelperText,
  MenuItem,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import { layoutActions } from "../../../store/layout/layoutSlice";
import { useEffect, useState } from "react";
import { productActions } from "../../../store/organizer/product/productSlice";
import DropzoneCustom from "../../share/dropzone/DropzoneCustom";
import ImageUpload from "../../organizer/product/ImageUpload";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { countTotalElements } from "../../../utils/share";
import AddIcon from "@mui/icons-material/Add";
import CustomButton from "../../share/CustomButton";
import DeleteIcon from "@mui/icons-material/Delete";

interface FieldValues {
  name: string;
  description: string;
  images?: any;
  payload: { name: string; value: string }[] | undefined;
  category_id?: any;
  unit_price: number;
  unit: string | undefined;
}

const CreateAndEditProductModal = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const listImage = useAppSelector(
    (state) => state.product.temporarylistImgUrl
  );
  const listCategories = useAppSelector(
    (state) => state.product.listCategories
  );
  const {
    loadingCreateProduct,
    loadingEditProduct,
    productSelected,
    listImgWillDelete,
  } = useAppSelector((state) => state.product);
  const isOpenModal = useAppSelector(
    (state) => state.layout.isOpenProductModal
  );
  const [payloadFields, setPayloadFields] = useState<
    {
      name: string;
      value: string;
    }[]
  >([]);
  const [categoryIdLabel, setCategoryIdLabel] = useState<any>(null);

  const addField = () => {
    const fields = getValues("payload") || [];
    const cleanedFields = fields.filter(
      (field: { name: string; value: string }) =>
        field.name !== undefined && field.value !== undefined
    );
    cleanedFields.push({ name: "", value: "" });
    setValue("payload", cleanedFields);
    setPayloadFields(cleanedFields);
  };

  const removeField = (index: number) => {
    const fields = getValues("payload") || [];
    fields.splice(index, 1);
    setPayloadFields(fields);
    setValue("payload", fields);
    fields.forEach((field: { name: string; value: string }, idx: number) => {
      setValue(`payload.${idx}.name`, field.name);
      setValue(`payload.${idx}.value`, field.value);
    });
  };

  const resetField = () => {
    setValue("payload", []);
    setPayloadFields([]);
  };
  const typeModal = productSelected?.name ? "edit" : "create";

  const onCloseModal = () => {
    reset();
    resetField();
    setCategoryIdLabel(null);
    dispatch(layoutActions.closeModalProduct());
    dispatch(productActions.resetTemporarylistImgUrl());
    dispatch(productActions.resetSelectedProduct());
    dispatch(productActions.resetListImgWillDelete());
  };

  const uploadTemporaryImages = (listImg: any) => {
    setValue("images", listImg);
    dispatch(productActions.settemporarylistImgUrl(listImg));
  };

  const plusTemporaryImages = (listImg: any) => {
    dispatch(productActions.plusTemporaryListImgUrl(listImg));
  };

  const deleteImageUpload = (file: any) => {
    dispatch(productActions.deleteATemporaryImgUrl(file));
  };
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    clearErrors,
    trigger,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      images: [],
      payload: [] as { name: string; value: string }[],
      category_id: null,
      unit_price: 0,
      unit: undefined,
    },
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required("Vui lòng nhập tên sản phẩm"),
        unit_price: yup
          .number()
          .typeError("Vui lòng nhập giá sản phẩm.")
          .required("Vui lòng nhập giá sản phẩm.")
          .min(1, "Vui lòng nhập giá hợp lệ."),
        unit: yup.string(),
        description: yup.string().required("Vui lòng nhập mô tả sản phẩm"),
        payload: yup.array().of(
          yup.object().shape({
            name: yup
              .string()
              .required("Nhập tên trường")
              .test(
                "is-unique",
                "Tên trường không được trùng nhau",
                function (value) {
                  const originPayload = getValues().payload;
                  const length = originPayload?.filter(
                    (item) => item.name.trim() == value.trim()
                  ).length;
                  if (length && length < 2) {
                    return true;
                  } else {
                    return false;
                  }
                }
              ),
            value: yup.string().required("Nhập giá trị"),
          })
        ),
      })
    ),
  });

  useEffect(() => {
    if (productSelected?.name) {
      setValue("name", productSelected.name);
      setValue("description", productSelected.description);
      setValue("unit_price", productSelected?.unit_price || 0);
      setValue("unit", productSelected.unit);
      if (productSelected.category?.id) {
        setValue("category_id", productSelected.category.id);
        setCategoryIdLabel(productSelected?.category.id);
      }
      setValue("images", productSelected.images);
      if (productSelected.payload) {
        const transformedArray = Object.keys(productSelected.payload).map(
          (key) => ({
            name: key,
            value: productSelected.payload[key],
          })
        );
        setValue("payload", transformedArray);
        setPayloadFields(transformedArray);
      }
    } else {
      reset();
    }
  }, [productSelected?.name, setValue]);

  useEffect(() => {
    dispatch(productActions.getAllListCategories());
  }, []);

  useEffect(() => {
    setValue("images", listImage);
  }, [listImage]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const metadata = data.payload?.reduce((result: any, field) => {
      if (field.name && field.value) {
        result[field.name.trim()] = field.value.trim();
      }
      return result;
    }, {});
    const { payload, ...params } = data;
    if (typeModal == "create") {
      const payloadRequest = {
        params,
        formData: listImage,
        metadata,
        onReset() {
          dispatch(productActions.resetTemporarylistImgUrl());
          dispatch(layoutActions.closeModalProduct());
          setCategoryIdLabel(null);
          resetField();
          reset();
        },
      };
      dispatch(productActions.createProduct(payloadRequest));
    } else if (typeModal == "edit") {
      const payloadRequest = {
        params,
        formData: listImage,
        metadata,
        productImages: productSelected?.images,
        productId: productSelected?.id,
        listImgWillDelete,
        onReset() {
          dispatch(productActions.resetTemporarylistImgUrl());
          dispatch(layoutActions.closeModalProduct());
          dispatch(productActions.resetSelectedProduct());
          dispatch(productActions.resetListImgWillDelete());
          setCategoryIdLabel(null);
          resetField();
          reset();
        },
      };
      dispatch(productActions.editProduct(payloadRequest));
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title={
          typeModal == "create" ? "Tạo sản phẩm mới" : "Chỉnh sửa sản phẩm"
        }
      />
      <TextField
        id="name"
        label="Tên sản phẩm"
        inputProps={{ ...register("name") }}
        error={!!errors.name?.message}
        required
        helperText={errors.name?.message}
      />
      <TextField
        id="unit_price"
        label="Đơn giá (VNĐ)"
        inputProps={{ ...register("unit_price") }}
        error={!!errors.unit_price?.message}
        required
        helperText={errors.unit_price?.message}
        multiline
        maxRows={8}
      />
      <TextField
        id="unit"
        label="Đơn vị tính"
        inputProps={{ ...register("unit") }}
        error={!!errors.unit?.message}
        required
        helperText={errors.unit?.message}
        multiline
        maxRows={8}
      />
      <TextField
        id="description"
        label="Mô tả"
        inputProps={{ ...register("description") }}
        error={!!errors.description?.message}
        required
        helperText={errors.description?.message}
        multiline
        maxRows={8}
      />
      {/* <TextField
        id="category_id"
        label="Category"
        inputProps={{ ...register("category_id") }}
        error={!!errors.category_id?.message}
        required
        helperText={errors.category_id?.message as string}
      /> */}
      <TextField
        variant="outlined"
        select
        id="category_id"
        label="Danh mục"
        value={categoryIdLabel}
        InputLabelProps={{ shrink: !!categoryIdLabel }}
        onChange={(e: any) => {
          setCategoryIdLabel(e.target.value);
          if (e.target.value === -1) {
            setValue("category_id", null);
          } else {
            setValue("category_id", e.target.value);
          }
        }}
        error={!!errors.category_id?.message}
        helperText={errors.category_id?.message as string}
      >
        <MenuItem value={-1}>Chưa xác định</MenuItem>
        {listCategories.map((cate) => (
          <MenuItem key={cate.id} value={cate.id}>
            {cate.name}
          </MenuItem>
        ))}
      </TextField>
      {/* Option fields */}
      {payloadFields.map((field, index) => (
        <Stack direction="row" gap={1} key={index}>
          {" "}
          <TextField
            id={`name-${index}`}
            label="Tên trường"
            inputProps={{ ...register(`payload.${index}.name`) }}
            InputLabelProps={{ shrink: true }}
            error={
              !!errors.payload &&
              !!errors.payload[index] &&
              !!errors.payload[index]?.name
            }
            required
            helperText={
              !!errors.payload &&
              !!errors.payload[index] &&
              !!errors.payload[index]?.name &&
              errors.payload[index]?.name?.message
            }
            onChange={() => {
              if (errors.payload) {
                trigger(`payload`);
              }
              if (
                !!errors.payload &&
                !!errors.payload[index] &&
                !!errors.payload[index]?.name
              ) {
                clearErrors(`payload.${index}.name`);
                trigger(`payload`);
              }
            }}
          />
          <TextField
            fullWidth
            id={`description-${index}`}
            label="Giá trị"
            inputProps={{
              ...register(`payload.${index}.value`),
            }}
            InputLabelProps={{ shrink: true }}
            error={
              !!errors.payload &&
              !!errors.payload[index] &&
              !!errors.payload[index]?.value
            }
            required
            helperText={
              !!errors.payload &&
              !!errors.payload[index] &&
              !!errors.payload[index]?.value &&
              errors.payload[index]?.value?.message
            }
            onChange={() => {
              if (
                !!errors.payload &&
                !!errors.payload[index] &&
                !!errors.payload[index]?.value
              ) {
                clearErrors(`payload.${index}.value`);
              }
            }}
          />
          <CustomButton
            onClick={() => {
              removeField(index);
              if (errors.payload) {
                trigger(`payload`);
              }
            }}
            label=""
            color="error"
            Icon={<DeleteIcon />}
            width="50px"
            height="50px"
          />
        </Stack>
      ))}
      <CustomButton
        width="220px"
        onClick={addField}
        label="Thêm trường tùy chọn"
        color="primary"
        Icon={<AddIcon />}
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
        <b>{`Thêm ảnh (Tối đa: 4)`}</b>
        {errors.images?.message ? (
          <FormHelperText error>
            {errors.images?.message as string}
          </FormHelperText>
        ) : (
          <></>
        )}

        <Stack direction="row" gap={1}>
          {productSelected?.images?.length
            ? productSelected.images.map((img: any, i: number) => (
                <ImageUpload
                  width="25%"
                  src={img}
                  onDelete={() => {
                    const newSelectedProduct = {
                      ...productSelected,
                      images: productSelected.images.filter(
                        (prod) => prod !== img
                      ),
                    };
                    dispatch(productActions.plusListImgWillDelete(img));
                    dispatch(
                      productActions.selectedProduct(newSelectedProduct)
                    );
                  }}
                />
              ))
            : null}
          {listImage.length
            ? listImage.map((img: any, i: number) => (
                <ImageUpload
                  width="25%"
                  src={img.preview}
                  onDelete={() => {
                    deleteImageUpload(img);
                  }}
                />
              ))
            : null}
          {(!!listImage.length || !!productSelected?.images.length) &&
          countTotalElements(listImage, productSelected?.images) < 4 ? (
            <DropzoneCustom
              Icon={AddCircleOutlineIcon}
              maxFile={
                4 - countTotalElements(listImage, productSelected?.images) > 1
                  ? 4 - countTotalElements(listImage, productSelected?.images)
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

        {!listImage.length && !productSelected?.images.length ? (
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

  return (
    <BaseModal
      disabled={
        typeModal == "create" ? loadingCreateProduct : loadingEditProduct
      }
      isOpen={isOpenModal}
      title={typeModal == "create" ? "Tạo sản phẩm mới" : "Chỉnh sửa sản phẩm"}
      actionLabel={typeModal == "create" ? "Tạo" : "Sửa"}
      onClose={onCloseModal}
      onSubmit={() => {
        handleSubmit(onSubmit)();
      }}
      body={bodyContent}
    />
  );
};

export default CreateAndEditProductModal;
