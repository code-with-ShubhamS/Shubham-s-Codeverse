import "./App.css";
import Background from "./components/Background";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <>
      <div className="min-h-screen  sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Background */}
          <div className="fixed inset-0 z-0">
            <Background />
          </div>

          {/* Layout wrapper */}
          <div className="relative z-10 flex flex-col min-h-screen ">
            <Header />

            <main className="flex-1  flex flex-col  pb-20 text-white mt-[2rem] px-[12px]">
               <Outlet /> 
            </main>

            {/* Footer */}
            <footer className="">
              <Footer />
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
