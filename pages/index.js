import Head from "next/head";
import Banner from "../components/Banner/Banner";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import LargeCard from "../components/LargeCard/LargeCard";
import MediumCard from "../components/MediumCard/MediumCard";
import SmallCard from "../components/SmallCard/SmallCard";

export default function Home({ exploreData, cardsData }) {
  return (
    <div>
      <Head>
        <title>Airbnb</title>
        <link
          rel="icon"
          href="https://cdn.freelogovectors.net/wp-content/uploads/2016/12/airbnb_logo.png"
        />
      </Head>

      <Header />
      <Banner />

      <main className="max-w-7xl mx-auto my-8 px-8 sm:px-16 shadow-lg rounded-xl">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 ld:grid-cols-3 xl:grid-cols-4">
            {exploreData?.map(({ img, distance, location }, index) => (
              <SmallCard
                key={index}
                img={img}
                distance={distance}
                location={location}
              />
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>
          <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3">
            {cardsData?.map(({ img, title }, key) => (
              <MediumCard key={key} img={img} title={title} />
            ))}
          </div>
        </section>
        <LargeCard
          img="https://links.papareact.com/4cj"
          title="The Greatest Outdoors"
          description="Wishlist curated by Airbnb"
          buttonText="Get inspired"
        />
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const exploreData = await fetch("https://links.papareact.com/pyp")
    .then((res) => res.json())
    .catch((error) => console.log(error));

  const cardsData = await fetch("https://links.papareact.com/zp1")
    .then((res) => res.json())
    .catch((error) => console.log(error));

  return {
    props: {
      exploreData,
      cardsData,
    },
  };
}
