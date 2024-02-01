import Navbar from "./components/Navbar";
import VideoSection from "./components/VideoSection";

function App() {
  return (
    <div className="h-screen w-screen overflow-x-hidden">
      <Navbar />
      <main className="m-16">
        <h1 className="font-normal text-center my-10ssss">
          Web RTC{" "}
          <b className="relative before:z-[-10] z-100 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-blue-600">
            Coredge
          </b>
        </h1>

        <VideoSection />
      </main>
    </div>
  );
}

export default App;
