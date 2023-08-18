import { Button, Grid, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { layoutActions } from "../../store/layout/layoutSlice";
import ProductCard from "../../components/product/ProductCard";
import { useEffect, useState } from "react";
import { productActions } from "../../store/product/productSlice";

const Product = () => {
  const [params, setParams] = useState({ limit: 15, page: 1 });
  const dispatch = useAppDispatch();
  const { listProducts, loadingGetProducts, pagination } = useAppSelector(
    (state) => state.product
  );

  const openProductModal = () => {
    dispatch(layoutActions.openModalProduct());
  };

  useEffect(() => {
    dispatch(productActions.getListProducts(params));
  }, [dispatch, params]);

  return (
    <Grid sx={{ p: 2 }} container>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h3">Your Products</Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={openProductModal}
          >
            Create a new product
          </Button>
        </Stack>
      </Grid>
      {listProducts.length ? (
        listProducts.map((prod) => (
          <Grid sx={{ mt: 2, px: 1 }} item xs={3} key={prod.id}>
            <ProductCard
              img={prod.images[0]}
              productName={prod.name}
              description={prod.description}
              onEdit={() => {
                dispatch(productActions.selectedProduct(prod));
                openProductModal()
              }}
            />
          </Grid>
        ))
      ) : (
        <></>
      )}
    </Grid>
  );
};

export default Product;
