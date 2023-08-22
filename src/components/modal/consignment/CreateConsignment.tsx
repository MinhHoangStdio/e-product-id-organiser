import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import Heading from "../../Heading";
import { TextField } from "@mui/material";
import { consignmentActions } from "../../../store/organizer/consignment/consignmentSlice";
import BaseModal from "../BaseModal";
import { layoutActions } from "../../../store/layout/layoutSlice";
import { productActions } from "../../../store/organizer/product/productSlice";

interface FieldValues {
  name: string;
  amount: number;
  description: string;
  payload?: any;
  product_id?: any;
}

const CreateConsignmentModal = () => {
  const dispatch = useAppDispatch();
  const productSelected = useAppSelector(
    (state) => state.product.productSelected
  );
  const loadingCreateConsignment = useAppSelector(
    (state) => state.consignment.loadingCreateConsignment
  );
  const isOpenModal = useAppSelector(
    (state) => state.layout.isOpenConsignmentModal
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: productSelected?.name || "",
      amount: 1,
      description: productSelected?.description || "",
      payload: null,
      product_id: productSelected?.id || null,
    },
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required("Insert name"),
        amount: yup.number().required("Insert amount"),
        description: yup.string().required("Insert description"),
      })
    ),
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const payload = {
      params: data,
      onReset() {
        // dispatch(layoutActions.closeModalProduct);
        // dispatch(productActions.resetSelectedProduct());
        onCloseModal();
      },
    };
    dispatch(consignmentActions.createConsignment(payload));
  };

  const onCloseModal = () => {
    dispatch(productActions.resetSelectedProduct());
    dispatch(layoutActions.closeModalConsignment());
    reset();
  };

  useEffect(() => {
    if (productSelected?.name) {
      console.log("updateeeeee");
      setValue("name", productSelected.name);
      setValue("product_id", productSelected.id);
    }
  }, [productSelected, setValue]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Create a new consignment" />
      <TextField
        id="name"
        label="Consignment Name"
        inputProps={{ ...register("name") }}
        error={!!errors.name?.message}
        required
        helperText={errors.name?.message}
      />
      <TextField
        type="number"
        id="amount"
        label="Amount"
        inputProps={{ ...register("amount") }}
        error={!!errors.amount?.message}
        required
        helperText={errors.amount?.message as string}
      />
      <TextField
        id="description"
        label="Description"
        inputProps={{ ...register("description") }}
        error={!!errors.description?.message}
        required
        helperText={errors.description?.message}
      />
    </div>
  );

  return (
    <BaseModal
      disabled={loadingCreateConsignment}
      isOpen={isOpenModal}
      title="Create a new Consignment"
      actionLabel="Create"
      onClose={onCloseModal}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default CreateConsignmentModal;
