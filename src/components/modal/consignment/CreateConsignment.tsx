import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import Heading from "../../Heading";
import { MenuItem, Stack, TextField } from "@mui/material";
import { consignmentActions } from "../../../store/organizer/consignment/consignmentSlice";
import BaseModal from "../BaseModal";
import { layoutActions } from "../../../store/layout/layoutSlice";
import { productActions } from "../../../store/organizer/product/productSlice";
import AddIcon from "@mui/icons-material/Add";
import CustomButton from "../../share/CustomButton";
import DeleteIcon from "@mui/icons-material/Delete";
interface FieldValues {
  name: string;
  amount: number;
  description: string;
  payload?: any;
  product_id?: any;
}

const CreateConsignmentModal = () => {
  const dispatch = useAppDispatch();
  const productDetail = useAppSelector((state) => state.product.detailProduct);
  const listAllProduct = useAppSelector(
    (state) => state.product.listAllProducts
  );
  const loadingCreateConsignment = useAppSelector(
    (state) => state.consignment.loadingCreateConsignment
  );
  const isOpenModal = useAppSelector(
    (state) => state.layout.isOpenConsignmentModal
  );
  const [productIdLabel, setProductIdLabel] = useState<any>(null);
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

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: productDetail?.name || "",
      amount: 1,
      description: productDetail?.description || "",
      payload: null,
      product_id: productDetail?.id || null,
    },
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required("Vui lòng nhập tên lô hàng"),
        amount: yup.number().required("Vui lòng nhập số lượng"),
        description: yup.string().required("Vui lòng nhập mô tả"),
      })
    ),
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const metadata = metadataFields.reduce((result: any, field) => {
      if (field.key && field.value) {
        result[field.key] = field.value;
      }
      return result;
    }, {});
    const payload = {
      params: data,
      metadata,
      onReset() {
        onCloseModal();
        if (productDetail?.id) {
          dispatch(productActions.getDetailProduct(productDetail?.id));
        }
      },
    };
    dispatch(consignmentActions.createConsignment(payload));
  };

  const onCloseModal = () => {
    reset();
    setProductIdLabel(null);
    resetField();
    dispatch(layoutActions.closeModalConsignment());
    dispatch(productActions.resetSelectedProduct());
    if (productDetail?.name) {
      setValue("name", productDetail.name);
      setValue("product_id", productDetail.id);
    }
  };

  useEffect(() => {
    if (productDetail?.name) {
      setValue("name", productDetail.name);
      setValue("product_id", productDetail.id);
    } else {
      setValue("name", "");
      setValue("product_id", null);
    }
  }, [productDetail, setValue]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Tạo lô hàng mới" />

      {!productDetail?.name && (
        <TextField
          variant="outlined"
          select
          id="product_id"
          label="Sản phẩm"
          value={productIdLabel}
          InputLabelProps={{ shrink: !!productIdLabel }}
          onChange={(e: any) => {
            setProductIdLabel(e.target.value);
            if (e.target.value === -1) {
              setValue("product_id", null);
            } else {
              setValue("product_id", e.target.value);
            }
          }}
        >
          <MenuItem value={-1}>Chưa xác định</MenuItem>
          {listAllProduct.map((prod) => (
            <MenuItem key={prod.id} value={prod.id}>
              {prod.name}
            </MenuItem>
          ))}
        </TextField>
      )}
      <TextField
        id="name"
        label="Tên lô hàng"
        inputProps={{ ...register("name") }}
        error={!!errors.name?.message}
        required
        helperText={errors.name?.message}
      />
      <TextField
        type="number"
        id="amount"
        label="Số lượng"
        inputProps={{ ...register("amount") }}
        error={!!errors.amount?.message}
        required
        helperText={errors.amount?.message as string}
      />
      <TextField
        id="description"
        label="Mô tả"
        inputProps={{ ...register("description") }}
        error={!!errors.description?.message}
        required
        helperText={errors.description?.message}
      />
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
    </div>
  );

  return (
    <BaseModal
      disabled={loadingCreateConsignment}
      isOpen={isOpenModal}
      title="Tạo lô hàng mới"
      actionLabel="Tạo"
      onClose={onCloseModal}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default CreateConsignmentModal;
