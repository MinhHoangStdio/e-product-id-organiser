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
import { EApprovalStatus } from "../../../types/enum/product";
interface FieldValues {
  name: string;
  amount: number;
  description: string;
  payload: { name: string; value: string }[] | undefined;
  product_id?: any;
}

const CreateConsignmentModal = () => {
  const dispatch = useAppDispatch();
  const productDetail = useAppSelector((state) => state.product.detailProduct);
  const listAllProduct = useAppSelector(
    (state) => state.product.listAllProducts
  ).filter((prod) => prod.approval_status !== EApprovalStatus.Ban);
  const loadingCreateConsignment = useAppSelector(
    (state) => state.consignment.loadingCreateConsignment
  );
  const isOpenModal = useAppSelector(
    (state) => state.layout.isOpenConsignmentModal
  );
  const [payloadFields, setPayloadFields] = useState<
    {
      name: string;
      value: string;
    }[]
  >([]);
  const [productIdLabel, setProductIdLabel] = useState<any>(null);
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
      name: productDetail?.name || "",
      amount: 1,
      description: productDetail?.description || "",
      payload: [] as { name: string; value: string }[],
      product_id: productDetail?.id || null,
    },
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required("Vui lòng nhập tên lô hàng"),
        amount: yup
          .number()
          .nullable()
          .required("Vui lòng nhập số lượng")
          .min(1, "Giá trị phải lớn hơn hoặc bằng 1")
          .typeError("Vui lòng nhập một số hợp lệ"),
        description: yup.string().required("Vui lòng nhập mô tả"),
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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const metadata = data.payload?.reduce((result: any, field) => {
      if (field.name && field.value) {
        result[field.name.trim()] = field.value.trim();
      }
      return result;
    }, {});
    const { payload, ...params } = data;
    const payloadRequest = {
      params,
      metadata,
      onReset() {
        onCloseModal();
        if (productDetail?.id) {
          dispatch(productActions.getDetailProduct(productDetail?.id));
        }
      },
    };
    dispatch(consignmentActions.createConsignment(payloadRequest));
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
        InputLabelProps={{ shrink: true }}
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
      {payloadFields.map((field: any, index: number) => (
        <Stack gap={1} direction="row" key={index}>
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
    </div>
  );

  return (
    <BaseModal
      disabled={loadingCreateConsignment}
      isOpen={isOpenModal}
      title="Tạo lô hàng mới"
      actionLabel="Tạo"
      onClose={onCloseModal}
      onSubmit={() => {
        handleSubmit(onSubmit)();
      }}
      body={bodyContent}
    />
  );
};

export default CreateConsignmentModal;
