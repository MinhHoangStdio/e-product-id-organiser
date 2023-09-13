import {
  Grid,
  InputAdornment,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import _ from "lodash";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { layoutActions } from "../../../store/layout/layoutSlice";
import ProductCard from "../../../components/organizer/product/ProductCard";
import { useCallback, useEffect, useState } from "react";
import { productActions } from "../../../store/organizer/product/productSlice";
import CustomButton from "../../../components/share/CustomButton";
import { ParamsModalConfirm } from "../../../types/modal";
import { Product } from "../../../types/product";
import { modalActions } from "../../../store/modal/modalSlice";
import { totalPagePagination } from "../../../utils/pagination";
import AddIcon from "@mui/icons-material/Add";
import history from "../../../routes/history";
import EmptyOrganizer from "../../../components/organizer/EmptyOrganizer";
import LoadingPage from "../../../components/LoadingPage";
import SearchIcon from "@mui/icons-material/Search";
import { debounceSearch } from "../../../utils/debounceSearch";

const ProductPage = () => {
  const [params, setParams] = useState<{
    limit: number;
    page: number;
    name?: string;
  }>({ limit: 8, page: 1 });
  const [searchProduct, setSearchProduct] = useState("");
  const organizer = useAppSelector((state) => state.organizer.userOrganizer);
  const dispatch = useAppDispatch();
  const { listProducts, loadingGetProducts, pagination, isFetchProducts } =
    useAppSelector((state) => state.product);

  const debounceSearchListProduct = useCallback(debounceSearch, []);

  const handleSearchProduct = (value: string) => {
    setSearchProduct(value);
    debounceSearchListProduct(value.trim(), setParams);
  };

  const openProductModal = () => {
    dispatch(layoutActions.openModalProduct());
  };
  const openOrganizerModal = () => {
    dispatch(layoutActions.openModalOrganizer());
  };
  const openConsignmentModal = () => {
    dispatch(layoutActions.openModalConsignment());
  };

  const confirmDelete = (data: Product) => {
    const params: ParamsModalConfirm = {
      title: "Xác nhận",
      content: (
        <span>
          Bạn có chắc chắn muốn xóa sản phẩm <b>"{data.name}"</b>?
        </span>
      ),
      onAction: () => dispatch(productActions.removeProduct(data.id)),
      buttonText: "Xóa",
    };
    dispatch(modalActions.showModal(params));
  };

  const handlePagination = (e: any, value: number) => {
    setParams((prevState) => {
      return { ...prevState, page: value };
    });
  };

  useEffect(() => {
    if (organizer?.id) {
      dispatch(productActions.getListProducts(params));
    } else {
      dispatch(productActions.userNoHaveOrganizer());
    }
  }, [dispatch, params, organizer]);

  return !isFetchProducts ? (
    <LoadingPage />
  ) : organizer?.id ? (
    <Stack sx={{ minHeight: "85vh" }} justifyContent="space-between">
      <Grid sx={{ p: 2 }} container>
        {listProducts ? (
          <>
            <Grid item xs={12}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography variant="h3" sx={{ fontWeight: 500 }}>
                    Danh sách sản phẩm
                  </Typography>
                  <TextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ width: "250px" }}
                    placeholder="Tìm kiếm sản phẩm"
                    size="small"
                    value={searchProduct}
                    onChange={(e) => handleSearchProduct(e.target.value)}
                  />
                </Stack>

                <CustomButton
                  Icon={<AddIcon />}
                  color="primary"
                  onClick={openProductModal}
                  label="Tạo sản phẩm mới"
                />
              </Stack>
            </Grid>
            {loadingGetProducts ? (
              <LoadingPage />
            ) : listProducts?.length ? (
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
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ width: "100%", height: "80vh", color: "#7e7e7e" }}
              >
                <p>Không tìm thấy sản phẩm</p>
              </Stack>
            )}
          </>
        ) : (
          <>
            <EmptyOrganizer
              onAction={openProductModal}
              labelBtn="Tạo sản phẩm"
            />
          </>
        )}
      </Grid>
      {listProducts?.length ? (
        <Stack sx={{ py: "20px" }}>
          <Pagination
            count={pagination ? totalPagePagination(pagination) : 1}
            page={pagination?.page || 1}
            onChange={handlePagination}
          />
        </Stack>
      ) : (
        <></>
      )}
    </Stack>
  ) : (
    <EmptyOrganizer onAction={openOrganizerModal} labelBtn="Tạo tổ chức" />
  );
};

export default ProductPage;
