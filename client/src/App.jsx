import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
function App() {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-7xl">Hello</h1>
        <Toaster />
        <Button
          onClick={() => {
            toast("YAY")
            ;
          }}
        >
          Click me
        </Button>
      </div>
    </>
  );
}

export default App;
