import { useTheme } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import CustomButton from "../share/CustomButton";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
  width?: any;
}

const CustomBaseModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  actionLabel,
  footer,
  disabled,
  secondaryAction,
  secondaryActionLabel,
  width,
}) => {
  const [showModal, setShowModal] = useState(isOpen);
  const theme = useTheme();

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [secondaryAction, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="
          justify-center 
          items-center 
          flex 
          overflow-x-hidden 
          overflow-y-auto 
          fixed 
          inset-0 
          z-50 
          outline-none 
          focus:outline-none
          bg-neutral-800/70
        "
      >
        <div
          className={`
          relative 
          ${
            width
              ? `w-[${width}]`
              : `w-full
            xs:w-1/5
            md:w-3/5
            lg:w-3/6
            xl:w-3/6`
          }

          my-6
          mx-auto 
          h-full 
          lg:h-auto
          md:h-auto
          `}
        >
          {/*content*/}
          <div
            className={`
            transition
            duration-300
            h-full
            ${showModal ? "translate-y-0" : "translate-y-full"}
            ${showModal ? "opacity-100" : "opacity-0"}
          `}
          >
            <div
              style={{ backgroundColor: `${theme.palette.background.default}` }}
              className="
              translate
              h-full
              lg:h-auto
              md:h-auto
              border-0 
              rounded-lg 
              shadow-lg 
              relative 
              flex 
              flex-col 
              w-full 
              outline-none 
              focus:outline-none
            "
            >
              {/*header*/}
              <div
                className="
                flex 
                items-center 
                p-6
                rounded-t
                justify-center
                relative
                "
              >
                <button
                  className="
                    border-slate-600
                    hover:opacity-70
                    transition
                    absolute
                    right-9
                    rounded-full
                    bg-stone-100
                    p-3
                }
                  "
                  onClick={handleClose}
                >
                  <ClearIcon />
                </button>
                <h3 className="text-lg font-semibold mr-10">{title}</h3>
              </div>
              {/*body*/}
              <div className="relative px-6 py-5 flex-auto max-h-[70vh] overflow-auto">
                {body}
              </div>
              {/*footer*/}
              <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-row items-center justify-between gap-4 w-full">
                  <CustomButton
                    color="error"
                    onClick={secondaryAction ? secondaryAction : handleClose}
                    label={
                      secondaryActionLabel ? secondaryActionLabel : "Hủy bỏ"
                    }
                    disabled={disabled}
                  />

                  <CustomButton
                    color="primary"
                    onClick={handleSubmit}
                    label={actionLabel}
                    disabled={disabled}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomBaseModal;
