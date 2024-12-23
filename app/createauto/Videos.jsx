import React, { useState, useEffect } from "react";
import StepButtons from "../components/global/StepButtons";

const Videos = ({ step, setStep, setVideo }) => {
  if (step !== 5) return null;

  const [videoForms, setVideoForms] = useState([
    { title: "", description: "", videoFile: null },
  ]);

  // Add new form
  const addVideoForm = () => {
    if (videoForms.length < 6) {
      setVideoForms([
        ...videoForms,
        { title: "", description: "", videoFile: null },
      ]);
    }
  };

  // Remove form
  const removeVideoForm = (index) => {
    const updatedForms = [...videoForms];
    updatedForms.splice(index, 1);
    setVideoForms(updatedForms);
  };

  // Handle file upload
  const handleFileChange = (e, index) => {
    const updatedForms = [...videoForms];
    updatedForms[index].videoFile = e.target.files[0];
    setVideoForms(updatedForms);
  };

  // Handle form submit
  const handleSubmit = () => {
    const validVideos = videoForms.filter((form) => {
      return (
        (form.videoFile && (!form.title || !form.description)) ||
        (form.title && form.description && form.videoFile)
      );
    });

    if (validVideos.length > 0) {
      setVideo(validVideos);
      console.log(validVideos);
    }
    setStep(6);
  };

  return (
    <div className="px-2 md:px-0 font-vazir">
      <div dir="rtl" className="pt-2 md:max-w-lg mx-auto">
        <StepButtons step={step} setStep={setStep} onSubmit={handleSubmit} />

        <form className="px-4">
          {videoForms.map((form, index) => (
            <div key={index} className="mb-4">
              <label className="input mt-8 flex items-center gap-2 md:max-w-screen-sm mx-auto bg-neutral">
                <input
                  dir="rtl"
                  type="text"
                  value={form.title}
                  onChange={(e) => {
                    const updatedForms = [...videoForms];
                    updatedForms[index].title = e.target.value;
                    setVideoForms(updatedForms);
                  }}
                  className="grow placeholder:text-base-content"
                  placeholder="عنوان"
                />
              </label>

              <label className="form-control">
                <textarea
                  value={form.description}
                  onChange={(e) => {
                    const updatedForms = [...videoForms];
                    updatedForms[index].description = e.target.value;
                    setVideoForms(updatedForms);
                  }}
                  className="text-base textarea mt-4 h-40 flex items-center gap-2 md:max-w-screen-sm mx-auto bg-neutral placeholder:text-base-content w-full"
                  placeholder="توضیحات"
                ></textarea>
              </label>

              <div className="h-36 border-dashed flex items-center bg-base-200 border-base-content border rounded-lg justify-center mt-4">
                <input
                  type="file"
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
                    برای آپلود ویدیو را اینجا رها کنید
                  </span>
                </label>
              </div>
              {form.videoFile && (
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
          ))}

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
