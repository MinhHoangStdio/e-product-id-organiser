import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CustomButton from "../../share/CustomButton";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import NoImg from "../../../assets/emptyData/no-picture.png";
import InfoIcon from "@mui/icons-material/Info";
import { EApprovalStatus } from "../../../types/enum/product";

type IProductCard = {
  img: string;
  name: string;
  productName?: string;
  description: string;
  onEdit?: () => void;
  amount?: number;
  onDelete?: () => void;
  onAction?: () => void;
  labelAction?: string;
  onClick?: () => void;
  status: string;
};

const ProductCard = ({
  img,
  productName,
  description,
  labelAction,
  onEdit,
  onDelete,
  onAction,
  onClick,
  amount,
  name,
  status,
}: IProductCard) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ position: "relative" }}>
      {status === EApprovalStatus.Ban ? (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: "#00000097",
            display: "flex",
            gap: "4px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            borderRadius: 1,
            zIndex: 10,
          }}
        >
          <Typography variant="h5" sx={{ color: "#fff" }}>
            Sản phẩm này đã bị chặn
          </Typography>
          <CustomButton
            height="30px"
            size="small"
            width="150px"
            color="primary"
            Icon={<InfoIcon />}
            onClick={onClick}
            label="Thông tin chi tiết"
          />
        </Box>
      ) : (
        <></>
      )}
      <Card onClick={onClick} sx={{ cursor: "pointer" }}>
        <Stack
          sx={{ py: 1, pl: 1, bgcolor: "transparent", cursor: "pointer" }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 500,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {name}
          </Typography>
          <div
            style={{ position: "relative", zIndex: 11 }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <IconButton
              aria-controls={open ? "action_menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="action_menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {onEdit && (
                <MenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClose();
                    onEdit();
                  }}
                >
                  Chỉnh sửa
                </MenuItem>
              )}
              {onDelete && (
                <MenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClose();
                    onDelete();
                  }}
                >
                  Xóa
                </MenuItem>
              )}
            </Menu>
          </div>
        </Stack>

        <Box sx={{ px: 1 }}>
          <CardMedia
            sx={{
              height: 200,
              borderRadius: "4px",
              cursor: "pointer",
              backgroundSize: "contain",
              backgroundColor: "#f6f6f6",
              border: "1px solid #efefef",
            }}
            image={img ? img : NoImg}
          />
        </Box>

        <CardContent sx={{ pb: 0, pt: 1 }}>
          <Typography
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            gutterBottom
            variant="h5"
            component="div"
          >
            {name}
          </Typography>
          <Typography
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            variant="body2"
            color="text.secondary"
          >
            Mô tả: {description}
          </Typography>
          {productName && (
            <Typography
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              variant="body2"
              color="text.secondary"
            >
              Tên sản phẩm: {productName}
            </Typography>
          )}
          {amount && (
            <Typography
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              variant="body2"
              color="text.secondary"
            >
              Số lượng: {amount}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Stack
            sx={{ width: "100%" }}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <CustomButton
              size="small"
              fullWidth
              color="primary"
              Icon={<InfoIcon />}
              onClick={onClick}
              label="Thông tin chi tiết"
            />
          </Stack>
        </CardActions>
        {/* <CardActions>
        <Stack
          sx={{ width: "100%" }}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <CustomButton
            fullWidth
            color="primary"
            onClick={onAction}
            Icon={<AddIcon />}
            label={labelAction ? labelAction : "Create A Consignment"}
          />
        </Stack>
      </CardActions> */}
      </Card>
    </Box>
  );
};

export default ProductCard;
