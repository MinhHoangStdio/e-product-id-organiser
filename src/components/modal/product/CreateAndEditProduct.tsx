import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import BaseModal from "../BaseModal";
import Heading from "../../Heading";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { FormHelperText, Stack, TextField, useTheme } from "@mui/material";
import { layoutActions } from "../../../store/layout/layoutSlice";
import { useEffect } from "react";
import { productActions } from "../../../store/product/productSlice";
import DropzoneCustom from "../../share/dropzone/DropzoneCustom";
import ImageUpload from "../../organizer/product/ImageUpload";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { countTotalElements } from "../../../utils/share";

interface FieldValues {
  name: string;
  price: number;
  description: string;
  images: any;
  payload?: any;
  category_id: any;
}

const CreateAndEditProductModal = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const listImage = useAppSelector(
    (state) => state.product.temporarylistImgUrl
  );

  const { loadingCreateProduct, loadingEditProduct, productSelected } =
    useAppSelector((state) => state.product);
  const isOpenModal = useAppSelector(
    (state) => state.layout.isOpenProductModal
  );
  const typeModal = productSelected?.name ? "edit" : "create";

  const onCloseModal = () => {
    reset();
    dispatch(layoutActions.closeModalProduct());
    dispatch(productActions.resetTemporarylistImgUrl());
    dispatch(productActions.resetSelectedProduct());
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
      name: productSelected?.name || "",
      price: productSelected?.price || undefined,
      description: productSelected?.description || "",
      images: productSelected?.images || [],
      payload: productSelected?.payload || null,
      category_id: productSelected?.category?.parent_id || null,
    },
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required("Insert name"),
        price: yup.number().required("Insert price"),
        description: yup.string().required("Insert description"),
        images: yup.array().min(1, "Insert images").required("Insert images"),
        category_id: yup.number().required("Insert Category"),
      })
    ),
  });

  useEffect(() => {
    if (productSelected?.name) {
      console.log("updateeeeee");
      setValue("name", productSelected.name);
      setValue("price", productSelected.price as number);
      setValue("description", productSelected.description);
      setValue("category_id", productSelected.category.id);
      setValue("images", productSelected.images);
    }
  }, [productSelected, setValue]);

  useEffect(() => {
    setValue("images", listImage);
  }, [listImage]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (typeModal == "create") {
      const payload = {
        params: data,
        formData: listImage,
        onReset() {
          dispatch(productActions.resetTemporarylistImgUrl());
          dispatch(layoutActions.closeModalProduct);
          reset();
        },
      };
      dispatch(productActions.createProduct(payload));
    } else if (typeModal == "edit") {
      const payload = {
        params: data,
        formData: listImage,
        productImages: productSelected?.images,
        productId: productSelected?.id,
        onReset() {
          dispatch(productActions.resetTemporarylistImgUrl());
          dispatch(layoutActions.closeModalProduct);
          dispatch(productActions.resetSelectedProduct());
          reset();
        },
      };
      dispatch(productActions.editProduct(payload));
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title={typeModal == "create" ? "Create a new product" : "Edit Product"}
      />
      <TextField
        id="name"
        label="Name"
        inputProps={{ ...register("name") }}
        error={!!errors.name?.message}
        required
        helperText={errors.name?.message}
      />
      <TextField
        id="price"
        label="Price"
        type="number"
        inputProps={{ ...register("price") }}
        error={!!errors.price?.message}
        required
        helperText={errors.price?.message}
      />
      <TextField
        id="description"
        label="Description"
        inputProps={{ ...register("description") }}
        error={!!errors.description?.message}
        required
        helperText={errors.description?.message}
      />
      <TextField
        id="category_id"
        label="Category"
        inputProps={{ ...register("category_id") }}
        error={!!errors.category_id?.message}
        required
        helperText={errors.category_id?.message as string}
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
      title={typeModal == "create" ? "Create a new product" : "Edit product"}
      actionLabel={typeModal == "create" ? "Create" : "Edit"}
      onClose={onCloseModal}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default CreateAndEditProductModal;
