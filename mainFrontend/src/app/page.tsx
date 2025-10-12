import Heading from "@/components/Heading";
import CardCarousel from "@/components/BannerCarousel";
import ViewProducts from "@/components/ViewProducts";

export default function Home() {
  return (
    <div className="bg-white flex flex-col justify-center items-center m-2">
      <Heading fontsize1="text-7xl" />
      <CardCarousel />
      <ViewProducts />

    </div>
  );
}
