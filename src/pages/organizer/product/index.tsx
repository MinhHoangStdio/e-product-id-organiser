import { Grid, Pagination, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { layoutActions } from "../../../store/layout/layoutSlice";
import ProductCard from "../../../components/organizer/product/ProductCard";
import { useEffect, useState } from "react";
import { productActions } from "../../../store/organizer/product/productSlice";
import CustomButton from "../../../components/share/CustomButton";
import { ParamsModalConfirm } from "../../../types/modal";
import { Product } from "../../../types/product";
import { modalActions } from "../../../store/modal/modalSlice";
import { totalPagePagination } from "../../../utils/pagination";
import AddIcon from "@mui/icons-material/Add";
import history from "../../../routes/history";

const ProductPage = () => {
  const [params, setParams] = useState({ limit: 8, page: 1 });
  const dispatch = useAppDispatch();
  const { listProducts, loadingGetProducts, pagination } = useAppSelector(
    (state) => state.product
  );

  const openProductModal = () => {
    dispatch(layoutActions.openModalProduct());
  };
  const openConsignmentModal = () => {
    dispatch(layoutActions.openModalConsignment());
  };

  const confirmDelete = (data: Product) => {
    const params: ParamsModalConfirm = {
      title: "Confirm",
      content: (
        <span>
          Do you want to delete a product <b>"{data.name}"</b>?
        </span>
      ),
      onAction: () => dispatch(productActions.removeProduct(data.id)),
      buttonText: "Delete",
    };
    dispatch(modalActions.showModal(params));
  };

  const handlePagination = (e: any, value: number) => {
    setParams((prevState) => {
      return { ...prevState, page: value };
    });
  };

  useEffect(() => {
    dispatch(productActions.getListProducts(params));
  }, [dispatch, params]);

  return (
    <Grid sx={{ p: 2 }} container>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h3">Your Products</Typography>

          <CustomButton
            Icon={<AddIcon />}
            color="primary"
            onClick={openProductModal}
            label="Create a new product"
          />
        </Stack>
      </Grid>
      {listProducts.length ? (
        listProducts.map((prod) => (
          <Grid sx={{ mt: 2, px: 1 }} item xs={3} key={prod.id}>
            <ProductCard
              img={prod.images[0]}
              name={prod.name}
              description={prod.description}
              onAction={() => {
                dispatch(productActions.selectedProduct(prod));
                openConsignmentModal();
              }}
              onEdit={() => {
                dispatch(productActions.selectedProduct(prod));
                openProductModal();
              }}
              onDelete={() => confirmDelete(prod)}
              onClick={() => {
                history.push("/organizer/products/" + prod.id);
              }}
            />
          </Grid>
        ))
      ) : (
        <></>
      )}
      <Grid item xs={12}>
        <Stack sx={{ py: "20px" }}>
          <Pagination
            count={pagination ? totalPagePagination(pagination) : 1}
            page={pagination?.page || 1}
            onChange={handlePagination}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ProductPage;
