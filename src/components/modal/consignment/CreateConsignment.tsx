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
  payload?: any;
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
  const [productIdLabel, setProductIdLabel] = useState<any>(null);
  const [metadataFields, setMetadataFields] = useState<
    {
      id: number;
      key: string;
      value: string;
      errorKey: boolean;
      errorKeyText: string;
      errorValue: boolean;
    }[]
  >([]);
  const [activeValidateMetadata, setActiveValidateMetadata] = useState(false);
  const addField = () => {
    setMetadataFields([
      ...metadataFields,
      {
        id: metadataFields.length,
        key: "",
        value: "",
        errorKey: false,
        errorKeyText: "",
        errorValue: false,
      },
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
        amount: yup
          .number()
          .nullable()
          .required("Vui lòng nhập số lượng")
          .min(1, "Giá trị phải lớn hơn hoặc bằng 1")
          .typeError("Vui lòng nhập một số hợp lệ"),
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
    const isValidMetadata = metadataFields.every(
      (data) => !data.errorKey && !data.errorValue
    );
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
    isValidMetadata && dispatch(consignmentActions.createConsignment(payload));
  };

  const validateMetadataField = () => {
    setActiveValidateMetadata(true);
    metadataFields.forEach((data, i) => {
      if (!data.key) {
        const updatedFields = [...metadataFields];
        updatedFields[i].errorKey = true;
        setMetadataFields(updatedFields);
      }
      if (
        data.key &&
        metadataFields.filter((mdata) => mdata.key.trim() == data.key.trim())
          .length >= 2
      ) {
        const updatedFields = [...metadataFields];
        updatedFields[i].errorKey = true;
        updatedFields[i].errorKeyText = "Trường không được trùng tên";
        setMetadataFields(updatedFields);
      } else if (
        data.key &&
        metadataFields.filter((mdata) => mdata.key.trim() == data.key.trim())
          .length < 2
      ) {
        const updatedFields = [...metadataFields];
        updatedFields[i].errorKey = false;
        updatedFields[i].errorKeyText = "";
        setMetadataFields(updatedFields);
      }
      if (!data.value) {
        const updatedFields = [...metadataFields];
        updatedFields[i].errorValue = true;
        setMetadataFields(updatedFields);
      }
    });
  };

  const onCloseModal = () => {
    reset();
    setActiveValidateMetadata(false);
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
        <Stack direction="row" gap={1}>
          {" "}
          <TextField
            label="Tên trường"
            onChange={(e) => {
              const updatedFields = [...metadataFields];
              updatedFields[i].key = e.target.value;
              if (activeValidateMetadata) {
                updatedFields.forEach((uField, index) => {
                  if (
                    metadataFields.filter(
                      (mdata) => mdata.key.trim() == uField.key.trim()
                    ).length >= 2 &&
                    uField.key
                  ) {
                    updatedFields[index].errorKey = true;
                    updatedFields[index].errorKeyText =
                      "Trường không được trùng tên";
                  } else if (
                    metadataFields.filter(
                      (mdata) => mdata.key.trim() == uField.key.trim()
                    ).length < 2 &&
                    !uField.key
                  ) {
                    updatedFields[index].errorKey = true;
                    updatedFields[index].errorKeyText = "";
                  } else if (
                    metadataFields.filter(
                      (mdata) => mdata.key.trim() == uField.key.trim()
                    ).length >= 2 &&
                    !uField.key
                  ) {
                    updatedFields[index].errorKey = true;
                    updatedFields[index].errorKeyText = "";
                  } else {
                    updatedFields[index].errorKey = false;
                    updatedFields[index].errorKeyText = "";
                  }
                });
                if (!e.target.value.trim()) {
                  updatedFields[i].errorKey = true;
                }
              }

              setMetadataFields(updatedFields);
            }}
            helperText={
              field.errorKey
                ? field.errorKeyText
                  ? field.errorKeyText
                  : "Vui lòng nhập giá trị"
                : ""
            }
            error={field.errorKey}
          />
          <TextField
            sx={{ flex: 1 }}
            label="Giá trị"
            value={field.value}
            onChange={(e) => {
              const updatedFields = [...metadataFields];
              updatedFields[i].value = e.target.value;
              if (activeValidateMetadata) {
                e.target.value.trim()
                  ? (updatedFields[i].errorValue = false)
                  : (updatedFields[i].errorValue = true);
              }

              setMetadataFields(updatedFields);
            }}
            helperText={field.errorValue ? "Vui lòng nhập giá trị" : ""}
            error={field.errorValue}
          />
          <CustomButton
            onClick={() => {
              removeField(field.id);
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
        validateMetadataField();
        handleSubmit(onSubmit)();
      }}
      body={bodyContent}
    />
  );
};

export default CreateConsignmentModal;
