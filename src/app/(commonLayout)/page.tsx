import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default async function Home() {
  const session = await authClient.getSession();
  console.log(session);

  return (
    <div className="w-full h-[calc(100vh-200px)] flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold">Home</h1>
      <Button className="m-10" variant="outline">
        Click Here
      </Button>
    </div>
  );
}
