import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import Heading from "../../../components/Heading";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAppDispatch } from "../../../hooks/store";
import { authActions } from "../../../store/auth/authSlice";
import CustomButton from "../../../components/share/CustomButton";

interface FormValues {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .matches(
            /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            "Email không hợp lệ"
          )
          .email("Email không hợp lệ")
          .required("Vui lòng nhập email"),
        name: yup
          .string()
          .min(4, "Vui lòng nhập tối thiểu 4 ký tự")
          .required("Vui lòng nhập tên"),
        password: yup
          .string()
          .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
          .required("Vui lòng nhập mật khẩu"),
        confirmPassword: yup
          .string()
          .required("Vui lòng nhập xác nhận mật khẩu")
          .oneOf([yup.ref("password")], "Mật khẩu không khớp"),
      })
    ),
  });

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    const params = {
      email: data.email,
      name: data.name,
      password: data.password,
    };
    dispatch(authActions.register(params));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" gap="16px">
        <Heading
          title="Chào mừng đến với E-Product ID"
          subtitle="Tạo tài khoản của bạn ngay!"
        />
        <TextField
          id="email"
          label="Email"
          inputProps={{ ...register("email") }}
          error={!!errors.email?.message}
          required
          helperText={errors.email?.message}
        />
        <TextField
          id="name"
          label="Tên"
          inputProps={{ ...register("name") }}
          error={!!errors.name?.message}
          required
          helperText={errors.name?.message}
        />
        <TextField
          id="password"
          label="Mật khẩu"
          type={showPassword ? "text" : "password"}
          inputProps={{ ...register("password") }}
          error={!!errors.password?.message}
          required
          helperText={errors.password?.message}
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
          id="confirm-password"
          label="Xác nhận mật khẩu"
          type={showPassword ? "text" : "password"}
          inputProps={{ ...register("confirmPassword") }}
          error={!!errors.confirmPassword?.message}
          required
          helperText={errors.confirmPassword?.message}
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
        <CustomButton color="primary" label="Đăng ký" type="submit" />
      </Stack>
    </form>
  );
};

export default Register;
