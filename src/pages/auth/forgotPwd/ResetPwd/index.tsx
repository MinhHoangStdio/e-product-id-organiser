import { IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Heading from "../../../../components/Heading";
import { useAppDispatch } from "../../../../hooks/store";
import CustomButton from "../../../../components/share/CustomButton";

interface FormValues {
  newPwd: string;
  confirmNewPwd: string;
}

const ResetPwd = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      newPwd: "",
      confirmNewPwd: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        newPwd: yup.string().required("Vui lòng nhập mật khẩu mới"),
        confirmNewPwd: yup
          .string()
          .required("Vui lòng nhập mật khẩu xác nhận mới")
          .oneOf([yup.ref("newPwd")], "Mật khẩu mới của bạn không trùng khớp"),
      })
    ),
  });

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    console.log({ data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" gap="16px">
        <Heading
          title="Reset your password"
          subtitle="Enter your new password"
        />
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
        <CustomButton color="primary" label="Reset" type="submit" />
      </Stack>
    </form>
  );
};

export default ResetPwd;
