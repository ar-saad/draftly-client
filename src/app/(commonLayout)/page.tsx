import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="w-full h-[calc(100vh-200px)] flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold">Home</h1>
      <Button className="m-10" variant="outline">
        Click Here
      </Button>
    </div>
  );
}
