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

type IProductCard = {
  img: string;
  productName: string;
  description: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onDetail?: () => void;
};

const ProductCard = ({
  img,
  productName,
  description,
  onEdit = () => {
    console.log("edit");
  },
  onDelete = () => {
    console.log("delete");
  },
  onDetail = () => {
    console.log("detail");
  },
}: IProductCard) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card>
      <Stack
        sx={{ py: 1, pl: 1, bgcolor: "transparent" }}
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
          {productName}
        </Typography>

        <div>
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
            <MenuItem
              onClick={() => {
                handleClose();
                onEdit();
              }}
            >
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                onDelete();
              }}
            >
              Delete
            </MenuItem>
          </Menu>
        </div>
      </Stack>
      <Box sx={{ px: 1 }}>
        <CardMedia sx={{ height: 250, borderRadius: "4px" }} image={img} />
      </Box>

      {/* <CardContent>
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
          {productName}
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
          {description}
        </Typography>
      </CardContent> */}
      <CardActions>
        <Stack
          sx={{ width: "100%" }}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <CustomButton
            fullWidth
            color="info"
            onClick={onDetail}
            Icon={<AddIcon />}
            label="Create A Consignment"
          />
        </Stack>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
