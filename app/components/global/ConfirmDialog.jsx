import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteAd } from "@/utils/Requests";
import { useState } from "react";

const ConfirmDialog = ({ isOpen, onClose, data, id }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      const response = await deleteAd(data, id);
      if (response.success) {
        toast.success(response.message);
        router.push("/dashboard");
        onClose();
      } else {
        onClose();
        toast.error(response.message);
      }
    } catch (error) {
      onClose();
      toast.error("خطا در حذف آگهی");
    } finally {
      setLoading(false);
    }
  };

  return (
    isOpen && (
      <div className="fixed z-20 inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
        <div className="modal modal-open">
          <div className="modal-box">
            <p className="font-vazir">آیا از حذف این آگهی مطمئن هستید؟</p>
            <div className="modal-action flex justify-between">
              <button
                className="btn bg-primary text-white font-vazir"
                onClick={onClose}
              >
                انصراف
              </button>
              <button
                className="btn border-2 border-primary bg-white text-primary font-vazir"
                onClick={handleConfirm}
                disabled={loading}
              >
                {loading ? "در حال حذف آگهی" : "تایید"}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ConfirmDialog;
