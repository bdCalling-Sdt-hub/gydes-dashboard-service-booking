import { Button } from "antd";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";

const PrivacyPolicy = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const handleOnSave = () => {
    console.log(content);
  };

  return (
    <div
      className=" min-h-[90vh]  rounded-xl"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      <div className="bg-secondary-color w-full flex items-center p-5 mb-10  rounded-tl-xl rounded-tr-xl">
        <p className="text-2xl text-primary-color font-semibold">
          Privacy policy
        </p>
      </div>
      <div className=" flex justify-center items-center">
        <div className="w-[95%]">
          <div className="">
            <JoditEditor
              ref={editor}
              value={content}
              config={{ height: 500, theme: "light", readonly: false }}
              onBlur={(newContent) => setContent(newContent)}
            />
          </div>
          <Button
            onClick={handleOnSave}
            className="w-full py-6 border !border-secondary-color hover:border-secondary-color text-xl !text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded-2xl mt-8"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};
export default PrivacyPolicy;
