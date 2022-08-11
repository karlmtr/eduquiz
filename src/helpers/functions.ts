import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

const emitToast = (
  message: string,
  t: "danger" | "default" | "info" | "warning" | "success"
) => {
  createToast(message, {
    timeout: 2000,
    hideProgressBar: true,
    showCloseButton: false,
    swipeClose: true,
    type: t,
    position: "top-center",
    transition: "slide",
    showIcon: true,
  });
};

export { emitToast };
