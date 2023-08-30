import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import Heading from "../../../components/Heading";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../components/share/CustomButton";

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .email("Email không hợp lệ")
          .required("Vui lòng nhập email"),
        password: yup.string().required("Vui lòng nhập mật khẩu"),
      })
    ),
  });

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    dispatch(
      authActions.login({
        params: data,
        onNavigate: () => {
          navigate("/home");
        },
      })
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" gap="16px">
        <Heading
          title="Chào mừng trở lại E-Product ID"
          subtitle="Đăng nhập với tài khoản của bạn!"
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
        />
        <CustomButton color="primary" type="submit" label="Đăng nhập" />
      </Stack>
    </form>
  );
};

export default Login;
