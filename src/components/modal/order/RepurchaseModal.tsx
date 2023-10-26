import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import CustomBaseModal from "../CustomBaseModal";
import { layoutActions } from "../../../store/layout/layoutSlice";
import { Grid, TextField, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { publicOrderActions } from "../../../store/public/order/orderSlice";

interface FieldValues {
  name: string;
  phone_number: string;
  address: string;
  note: string | null | undefined;
}

const RepurchaseModal = () => {
  const dispatch = useAppDispatch();
  const consignment = useAppSelector(
    (state) => state.publicConsignment.consignmentDetail
  );
  const loadingCreateOrder = useAppSelector(
    (state) => state.publicOrder.loadingCreateOrder
  );
  const isOpenModal = useAppSelector(
    (state) => state.layout.isOpenRepurchaseModal
  );

  const phoneRegex = /^(0[1-9][0-9]{8,9})$/;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      phone_number: "",
      address: "",
      note: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        name: yup
          .string()
          .required("Vui lòng nhập họ tên.")
          .max(100, "Tên có tối đa 100 kí tự."),
        phone_number: yup
          .string()
          .required("Vui lòng nhập số điện thoại.")
          .matches(phoneRegex, "Số điện thoại không hợp lệ."),
        address: yup
          .string()
          .required("Vui lòng nhập địa chỉ.")
          .max(500, "Địa chỉ có tối đa 500 kí tự."),
        note: yup.string().nullable().max(500, "Ghi chú có tối đa 500 kí tự."),
      })
    ),
  });

  const onCloseModal = () => {
    reset();
    dispatch(layoutActions.closeModalRepurchase());
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const params = {
      ...data,
      consignment_id: consignment?.id,
      product_id: consignment?.product_id,
    };

    const payloadRequest = {
      params,
      onReset() {
        onCloseModal();
      },
    };
    dispatch(publicOrderActions.createOrder(payloadRequest));
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Typography variant="h5">
        Để mua lại sản phẩm, Quý khách vui lòng điền đầy đủ các thông tin dưới
        đây.
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            id="name"
            label="Họ tên"
            inputProps={{ ...register("name") }}
            error={!!errors.name?.message}
            required
            helperText={errors.name?.message}
            fullWidth={true}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="phone_number"
            label="Số điện thoại"
            inputProps={{ ...register("phone_number") }}
            error={!!errors.phone_number?.message}
            required
            helperText={errors.phone_number?.message}
            fullWidth={true}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address"
            label="Địa chỉ"
            inputProps={{ ...register("address") }}
            error={!!errors.address?.message}
            required
            helperText={errors.address?.message}
            fullWidth={true}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="note"
            label="Ghi chú"
            inputProps={{ ...register("note") }}
            error={!!errors.note?.message}
            helperText={errors.note?.message}
            fullWidth={true}
            multiline
            minRows={2}
            maxRows={4}
          />
        </Grid>
      </Grid>
    </div>
  );

  return (
    <CustomBaseModal
      disabled={loadingCreateOrder}
      isOpen={isOpenModal}
      title={`Xác nhận mua lại sản phẩm: ${consignment?.product?.name || ""}`}
      actionLabel="Xác nhận"
      onClose={onCloseModal}
      onSubmit={() => {
        handleSubmit(onSubmit)();
      }}
      body={bodyContent}
    />
  );
};

export default RepurchaseModal;
