import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import Catalogue from "@/components/Catalogue";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Banner />
        <Catalogue />
      </main>
    </>
  );
}
