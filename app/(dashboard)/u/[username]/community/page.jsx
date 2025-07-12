import {format } from "date-fns";




import { getBlockList } from "@/lib/block-service/getblocklist";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

const CommunityPage = async () => {
  const blockedUsers = await getBlockList();
  // Format data for table 
  const formattedData = blockedUsers.map((block) => ({
  userId: block.blocked._id.toString(),
  imageUrl: block.blocked.imageurl,
  username: block.blocked.username,
  createdAt: format(new Date(block.createdAt), "dd/MM/yyyy"),
  }));

  return ( 
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">
          Community Settings
        </h1>
      </div>
      <DataTable columns={columns} data={formattedData} />
    </div>
   );
}
 
export default CommunityPage;