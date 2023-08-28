import {
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../hooks/store";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { authActions } from "../../store/auth/authSlice";
import CustomButton from "../../components/share/CustomButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface FormValues {
  currentPwd: string;
  newPwd: string;
  confirmNewPwd: string;
}

const ChangePwd = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      currentPwd: "",
      newPwd: "",
      confirmNewPwd: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        currentPwd: yup.string().required("Insert your current password"),
        newPwd: yup.string().required("Insert your new password"),
        confirmNewPwd: yup
          .string()
          .required("Insert confirm new password")
          .oneOf([yup.ref("newPwd")], "Your new passwords do not match."),
      })
    ),
  });

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    const params = {
      currentPwd: data.currentPwd,
      newPwd: data.newPwd,
    };
    dispatch(authActions.changePwd(params));
  };

  return (
    <Grid sx={{ p: 2 }} container>
      <Grid item xs={4}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" gap="16px">
            <Typography variant="h3">Change Password</Typography>
            <TextField
              id="currentPwd"
              label="Current password"
              type={showPassword ? "text" : "password"}
              inputProps={{ ...register("currentPwd") }}
              error={!!errors.currentPwd?.message}
              required
              helperText={errors.currentPwd?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />{" "}
            <TextField
              id="newPwd"
              label="New password"
              type={showPassword ? "text" : "password"}
              inputProps={{ ...register("newPwd") }}
              error={!!errors.newPwd?.message}
              required
              helperText={errors.newPwd?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id="confirmNewPwd"
              label="Confirm new password"
              type={showPassword ? "text" : "password"}
              inputProps={{ ...register("confirmNewPwd") }}
              error={!!errors.confirmNewPwd?.message}
              required
              helperText={errors.confirmNewPwd?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <CustomButton color="primary" label="Change" type="submit" />
          </Stack>
        </form>
      </Grid>
    </Grid>
  );
};

export default ChangePwd;
