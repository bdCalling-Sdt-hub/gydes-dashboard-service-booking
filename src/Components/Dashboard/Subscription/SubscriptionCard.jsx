import { MdDelete, MdOutlineDone } from "react-icons/md";

const SubscriptionCard = ({ sub, showUpdateModal, showDeleteModal }) => {
  return (
    <div className="w-full min-h-[600px] max-w-full sm:max-w-[300px] md:max-w-[350px] lg:max-w-[400px] xl:max-w-[400px] flex flex-col justify-between bg-secondary-color text-white p-10 rounded-3xl shadow-lg">
      <div>
        <div
          onClick={() => showDeleteModal(sub)}
          className="p-1 bg-primary-color rounded-full w-fit ml-auto cursor-pointer"
        >
          <MdDelete className="text-red-500 size-6 " />
        </div>
        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center text-primary-color font-bold mb-2">
          {sub.name}
        </h3>
        <p className="text-3xl sm:text-4xl lg:text-5xl text-center font-bold mb-10">
          ${sub.price}/
          <span className="text-xl sm:text-2xl lg:text-3xl">
            {sub.duration} Days
          </span>
        </p>
        <ul className="mb-10">
          {sub?.features.map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-center gap-2">
              <div className="p-1 rounded-full bg-[#EDE9E9] -mt-4">
                <MdOutlineDone className="size-3 text-base-color" />
              </div>
              <p className="sm:text-lg lg:text-xl text-[#EDE9E9] mb-5">
                {feature}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button
          onClick={() => showUpdateModal(sub)}
          className="w-full py-3 text-lg sm:text-xl lg:text-2xl rounded-2xl text-secondary-color font-bold bg-primary-color"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCard;
