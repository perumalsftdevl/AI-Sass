import SideBar from "@/components/ui/SideBar";
import NavBar from "@/components/ui/navbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();
  if (!userId) {
    return;
  }
  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId,
    },
  });
  const count: any = userApiLimit?.count;

  return (
    <div className="h-full relative" id="layout">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
        <div className="">
          <SideBar apiLimitCount={count} isPro={false} />
        </div>
      </div>
      <main className="md:pl-72">
        <NavBar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
