import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useRouter } from "next/dist/client/router";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard/InfoCard";
import Map from "../components/Map/Map";
import Fade from "react-reveal/Fade";
import Head from "next/head";

function Search({ searchResults }) {
  const router = useRouter();
  const { location, startDate, endDate, noOfGuests } = router.query;
  const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
  const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
  const range = `from ${formattedStartDate} to ${formattedEndDate}`;

  return (
    <>
      <Head>
        <title>Airbnb - Search Page</title>
      </Head>

      <div>
        <Header
          placeholder={`${
            location.charAt(0).toUpperCase() + location.substring(1)
          } | ${range} | ${noOfGuests} ${noOfGuests == 1 ? "guest" : "guests"}`}
        />

        <main className="flex">
          <section className="flex-grow pt-14 px-6">
            <p className="text-xs">
              300+ Stays - {range} - for {noOfGuests}{" "}
              {noOfGuests == 1 ? "guest" : "guests"}
            </p>
            <h1 className="text-3xl font-semibold mt-2 mb-6">
              Stays in{" "}
              {location.charAt(0).toUpperCase() + location.substring(1)}
            </h1>
            <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
              <p className="button">Cancellation Flexibility</p>
              <p className="button">Type of Place</p>
              <p className="button">Price</p>
              <p className="button">Rooms and Beds</p>
              <p className="button">More filters</p>
            </div>
            <div className="flex flex-col">
              <Fade left>
                {searchResults?.map(
                  (
                    { img, location, title, description, star, price, total },
                    index
                  ) => (
                    <InfoCard
                      key={index}
                      img={img}
                      location={location}
                      title={title}
                      description={description}
                      star={star}
                      price={price}
                      total={total}
                    />
                  )
                )}
              </Fade>
            </div>
          </section>

          <Fade right>
            <section className="hidden xl:inline-flex xl:min-w-[600px] items-center">
              <Map searchResults={searchResults} />
            </section>
          </Fade>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default Search;

export async function getServerSideProps() {
  const searchResults = await fetch("https://links.papareact.com/isz")
    .then((res) => res.json())
    .catch((error) => console.log(error));

  return {
    props: {
      searchResults,
    },
  };
}
