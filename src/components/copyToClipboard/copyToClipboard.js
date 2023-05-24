import { toast } from "react-toastify";

export default function copyToClipboard(text,msg) {
  navigator.clipboard.writeText(text).then(() => {
    toast.success(msg);
  });
}
