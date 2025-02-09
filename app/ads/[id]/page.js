import AdTotal from "./AdTotal";
import { fetchAdDetails } from "@/utils/Requests";

const AdDetailsPage = async ({ params }) => {
  const { id } = await params;
  const data = await fetchAdDetails(id);

  return (
    <div className="px-6 pt-40 py-40 bg-neutral">
      {data.error ? (
        <div className="text-base-content px-6 py-40 font-vazir text-center bg-neutral">
          {data.error}
        </div>
      ) : (
        <div className="max-w-screen-xl mx-auto">
          <AdTotal adDetails={data} />
        </div>
      )}
    </div>
  );
};

export default AdDetailsPage;
