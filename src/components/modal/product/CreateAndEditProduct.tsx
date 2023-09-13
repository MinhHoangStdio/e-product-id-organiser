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
  payload?: any;
  category_id?: any;
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

  const [categoryIdLabel, setCategoryIdLabel] = useState<any>(null);
  const [metadataFields, setMetadataFields] = useState<
    { id: number; key: string; value: string }[]
  >([]);
  const addField = () => {
    setMetadataFields([
      ...metadataFields,
      { id: metadataFields.length, key: "", value: "" },
    ]);
  };

  const removeField = (id: number) => {
    setMetadataFields(metadataFields.filter((field) => field.id !== id));
  };

  const resetField = () => {
    setMetadataFields([]);
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
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      images: [],
      payload: null,
      category_id: null,
    },
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required("Vui lòng nhập tên sản phẩm"),
        description: yup.string().required("Vui lòng nhập mô tả sản phẩm"),
      })
    ),
  });

  useEffect(() => {
    if (productSelected?.name) {
      setValue("name", productSelected.name);
      setValue("description", productSelected.description);
      if (productSelected.category?.id) {
        setValue("category_id", productSelected.category.id);
        setCategoryIdLabel(productSelected?.category.id);
      }
      setValue("images", productSelected.images);
      if (productSelected.payload) {
        const transformedArray = Object.keys(productSelected.payload).map(
          (key, index) => ({
            id: index,
            key,
            value: productSelected.payload[key],
          })
        );
        setMetadataFields(transformedArray);
      }
    } else {
      reset();
    }
  }, [productSelected, setValue]);

  useEffect(() => {
    dispatch(productActions.getAllListCategories());
  }, []);

  useEffect(() => {
    setValue("images", listImage);
  }, [listImage]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const metadata = metadataFields.reduce((result: any, field) => {
      if (field.key && field.value) {
        result[field.key] = field.value;
      }
      return result;
    }, {});
    if (typeModal == "create") {
      const payload = {
        params: data,
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
      dispatch(productActions.createProduct(payload));
    } else if (typeModal == "edit") {
      const payload = {
        params: data,
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
      dispatch(productActions.editProduct(payload));
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
      {metadataFields.map((field, i) => (
        <Stack direction="row" gap={1} alignItems="center">
          {" "}
          <TextField
            label="Tên trường"
            value={field.key}
            onChange={(e) => {
              const updatedFields = [...metadataFields];
              updatedFields[i].key = e.target.value;
              setMetadataFields(updatedFields);
            }}
          />
          <TextField
            sx={{ flex: 1 }}
            label="Giá trị"
            value={field.value}
            onChange={(e) => {
              const updatedFields = [...metadataFields];
              updatedFields[i].value = e.target.value;
              setMetadataFields(updatedFields);
            }}
          />
          <CustomButton
            onClick={() => {
              removeField(field.id);
            }}
            label=""
            color="error"
            Icon={<DeleteIcon />}
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
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default CreateAndEditProductModal;
