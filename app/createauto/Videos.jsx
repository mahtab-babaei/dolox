import React, { useState, useEffect } from "react";
import StepButtons from "../components/global/StepButtons";
import { fetchAutoDetails } from "@/utils/Requests";

const Videos = ({
  step,
  setStep,
  setVideo,
  setDeletedVideo,
  setEditedVideo,
  exhibitionId,
}) => {
  const [error, setError] = useState("");
  const [initialVideoForms, setInitialVideoForms] = useState([]);
  const [videoForms, setVideoForms] = useState([
    { id: null, title: "", description: "", video_file: null },
  ]);

  useEffect(() => {
    const getAutoVideos = async () => {
      if (!exhibitionId) {
        setVideoForms([
          { id: null, title: "", description: "", video_file: null },
        ]);
        setInitialVideoForms([]);
        return;
      }
      try {
        const autoDetails = await fetchAutoDetails(exhibitionId);
        if (autoDetails?.videos?.length > 0) {
          // Initial array from server
          const existing = autoDetails.videos.map((v) => ({
            id: v.id,
            title: v.title || "",
            description: v.description || "",
            video_file: v.video_file, // URL
          }));

          // initialVideoForms
          setInitialVideoForms(existing);

          // videoForms
          setVideoForms(existing.map((item) => ({ ...item })));
        } else {
          setVideoForms([
            { id: null, title: "", description: "", video_file: null },
          ]);
          setInitialVideoForms([]);
        }
      } catch (err) {
        console.error("Error fetching existing videos:", err);
        setError("خطا در دریافت لیست ویدیوهای قبلی.");
        setVideoForms([
          { id: null, title: "", description: "", video_file: null },
        ]);
        setInitialVideoForms([]);
      }
    };

    if (step === 5) {
      getAutoVideos();
    }
  }, [exhibitionId, step]);

  const addVideoForm = () => {
    if (videoForms.length < 6) {
      setVideoForms([
        ...videoForms,
        { id: null, title: "", description: "", video_file: null },
      ]);
    }
  };

  const removeVideoForm = (index) => {
    const updated = [...videoForms];
    updated.splice(index, 1);
    setVideoForms(updated);
  };

  const handleFileChange = (e, index) => {
    const updated = [...videoForms];
    updated[index].video_file = e.target.files[0]; // New file
    setVideoForms(updated);
  };

  const handleSubmit = () => {
    setError("");

    // Form validation
    for (let i = 0; i < videoForms.length; i++) {
      const form = videoForms[i];
      const initial = initialVideoForms.find((v) => v.id === form.id);

      const isUnchangedOld =
        initial?.id != null &&
        form.video_file === initial.video_file &&
        form.title === initial.title &&
        form.description === initial.description;

      if (isUnchangedOld) continue;

      const isNewFile = form.video_file instanceof File;
      const hasTitle = form.title.trim() !== "";
      const hasDesc = form.description.trim() !== "";
      const isCompletelyEmpty =
        !form.title && !form.description && !form.video_file;

      if (form.id == null) {
        // New form
        if (!(hasTitle && hasDesc && isNewFile)) {
          setError("لطفاً تمام فیلدهای فرم جدید را تکمیل کنید.");
          return;
        }
      } else {
        // Edited form
        if (!hasTitle || !hasDesc) {
          setError("عنوان و توضیحات ویدیو باید وارد شوند.");
          return;
        }
        if (
          form.video_file !== initial.video_file &&
          !(form.video_file instanceof File)
        ) {
          setError("فرمت فایل ویدیویی نامعتبر است.");
          return;
        }
      }
    }

    // Identify deleted videos
    const deletedVideoIds = initialVideoForms
      .filter(
        (init) => init.id != null && !videoForms.some((v) => v.id === init.id)
      )
      .map((v) => v.id);
    setDeletedVideo({ ids: deletedVideoIds });

    // Identify edited videos
    const initialMap = new Map(initialVideoForms.map((v) => [String(v.id), v]));

    const editedVideos = videoForms
      .filter((form) => {
        if (!form.id) return false;
        const initial = initialMap.get(String(form.id));
        if (!initial) return false;

        // Detect changes only by title/description or new file
        const changedFile = form.video_file instanceof File;
        const changedTitle = form.title.trim() !== initial.title.trim();
        const changedDesc =
          form.description.trim() !== initial.description.trim();

        return changedFile || changedTitle || changedDesc;
      })
      .map((form) => {
        const initial = initialMap.get(String(form.id));
        const payload = { id: form.id };

        if (form.title.trim() !== initial.title.trim()) {
          payload.title = form.title.trim();
        }
        if (form.description.trim() !== initial.description.trim()) {
          payload.description = form.description.trim();
        }
        if (form.video_file instanceof File) {
          payload.video_file = form.video_file;
        }
        return payload;
      });

    console.log("editedVideos:", editedVideos);
    setEditedVideo(editedVideos);

    // Identify new videos
    const newPayload = videoForms.filter((form) => form.id == null);
    setVideo(newPayload);

    setStep(6);
  };

  if (step !== 5) return null;

  return (
    <div className="px-2 md:px-0 font-vazir">
      <div dir="rtl" className="pt-2 md:max-w-lg mx-auto">
        <StepButtons step={step} setStep={setStep} onSubmit={handleSubmit} />

        <form className="px-4">
          {error && (
            <div className="mt-2 text-red-500 text-center text-sm">{error}</div>
          )}
          {videoForms.map((form, index) => {
            return (
              <div key={index} className="mb-4">
                <label className="border-none p-0 input mt-8 flex items-center gap-2 md:max-w-screen-sm mx-auto bg-neutral">
                  <input
                    dir="rtl"
                    type="text"
                    value={form.title}
                    onChange={(e) => {
                      const updated = [...videoForms];
                      updated[index].title = e.target.value;
                      setVideoForms(updated);
                    }}
                    className="grow w-full h-full rounded-lg px-4 placeholder:text-base-content text-black"
                    placeholder="عنوان"
                  />
                </label>

                <label className="form-control">
                  <textarea
                    value={form.description}
                    onChange={(e) => {
                      const updated = [...videoForms];
                      updated[index].description = e.target.value;
                      setVideoForms(updated);
                    }}
                    className="text-base text-black textarea mt-4 h-40 flex items-center gap-2 md:max-w-screen-sm mx-auto bg-neutral placeholder:text-base-content w-full"
                    placeholder="توضیحات"
                  ></textarea>
                </label>

                <div className="h-36 border-dashed flex items-center bg-base-200 border-base-content border rounded-lg justify-center mt-4">
                  <input
                    type="file"
                    accept="video/*"
                    id={`file-upload-${index}`}
                    style={{ display: "none" }}
                    onChange={(e) => handleFileChange(e, index)}
                  />
                  <label
                    htmlFor={`file-upload-${index}`}
                    className="cursor-pointer flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M5 20H19V18H5V20ZM5 10H9V16H15V10H19L12 3L5 10Z"
                        fill="#8B7676"
                      />
                    </svg>
                    <span className="text-base-content">
                      برای آپلود ویدیو اینجا کلیک کنید
                    </span>
                  </label>
                </div>

                {form.video_file && typeof form.video_file === "string" && (
                  <div className="mt-4">
                    <video
                      width="100%"
                      controls
                      src={form.video_file}
                      className="rounded-lg bg-gray-100"
                    >
                      مرورگر شما از تگ ویدیو پشتیبانی نمی‌کند.
                    </video>
                  </div>
                )}
                {form.video_file instanceof File && (
                  <div className="mt-2 text-base-content text-sm">
                    ویدیوی شما با موفقیت بارگذاری شد
                  </div>
                )}

                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => removeVideoForm(index)}
                    className="mt-4 text-base-content"
                  >
                    حذف -
                  </button>
                </div>
              </div>
            );
          })}

          <div className="flex justify-center">
            <button
              type="button"
              onClick={addVideoForm}
              className="text-base-content"
            >
              افزودن +
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Videos;
