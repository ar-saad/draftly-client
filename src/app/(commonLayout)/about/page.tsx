export default async function AboutPage() {
  //* To simulate API calls
  await new Promise((resolve) => setTimeout(resolve, 4000));

  //* To simulate an error
  // throw new Error("Something went wrong");

  return (
    <div className="w-full h-[calc(100vh-200px)] flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold">About us page</h1>
    </div>
  );
}
