import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { getEvents } from "../../services";
import { apiConstants } from "../../utils";
import { sortUpcomingEventByDate, sortPastEventsByDate } from "../../utils/helpers";


import Slider from "react-slick";
import { carouselSettings } from "../../components/Carousel";

const Events = () => {
  const eventCall = useQuery(apiConstants.events, getEvents);
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [pastEvents, setPastEvents] = useState([])
  
  useEffect(() => {
    if (eventCall.isFetched && eventCall.isSuccess) {
      const events = eventCall.data
      const _pastEvents = sortPastEventsByDate(events)
      const _upcomingEvents = sortUpcomingEventByDate(events)
      if (_pastEvents.length) {
        setPastEvents(_pastEvents)
      }
      if (_upcomingEvents) {
        setUpcomingEvents(_upcomingEvents)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Events</title>
        <meta
          name="description"
          content="Get free access to events focused on empowering and getting more young girls and women into technology across cities and tertiary institutions in Africa."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Events" />
        <meta
          property="og:description"
          content="Get free access to events focused on empowering and getting more young girls and women into technology across cities and tertiary institutions in Africa."
        />
        <meta name="twitter:title" content="Events" />
        <meta
          name="twitter:description"
          content="Get free access to events focused on empowering and getting more young girls and women into technology across cities and tertiary institutions in Africa."
        />
      </Helmet>
      <Header page={"events"} />
      <div className="bg-[#FFF7FC] pb-10">
        <main className="container mx-auto bg-[#FFF7FC]">

          {upcomingEvents.length ? 
            <div className="container mx-auto w-11/12 mb-12 p-3 md:px-8 lg:py-44">
              <Slider {...carouselSettings}>
                {upcomingEvents.map(({ title, description, _id }, index) => {
                  return (
                    <div key={index} className="py-2">
                      <p className="font-medium">Upcoming!</p>
                      <h4 className="text-3xl sm:text-4xl lg:text-5xl w-10/12 sm:7/12 lg:w-6/12 font-bold leading-tight">
                        {title}
                      </h4>
                      <p className="text-lg sm:w-7/12 lg:w-6/12 md:text-xl">
                        {description}
                      </p>
                      <div className="mt-16 mb-5">
                        <Link
                          to={"/view/events/" + _id}
                          className="border bg-primary-main-pink px-12 font-semibold rounded border-primary-main-pink py-4 text-white"
                        >
                          Learn More
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          : null}
          <section className="border-[5px] border-white shadow-[0px_4px_250px_rgba(183,5,105,0.15)] bg-white p-8 sm:p-12 lg:p-24 w-11/12 md:w-[87%] mx-auto md:h-[417px]">
            <h4 className="text-primary-main-pink font-bold text-3xl md:text-4xl my-2">
              SCA Events
            </h4>
            <p className="text-xl md:text-2xl sm:w-7/12 lg:w-6/12">
              Get free access to events focused on empowering and getting more
              young girls and women into technology across cities and tertiary
              institutions in Africa.
            </p>
          </section>

          {eventCall.isLoading ?
            <div className="flex flex-wrap gap-6 mx-10 md:mx-5 my-10">
              {[1, 2, 3].map((_, index) => (
                <Loading key={index} />
              ))}
            </div>
          : null}

          {eventCall.isError ?
            <div className="flex justify-center  mx-10 md:mx-5 my-20" >
              <Error />
            </div>
          : null}

          {eventCall.isSuccess ?
            <>
              <div className="md:my-28 my-12">
                <section className="py-3 md:py-5 text-center lg:w-6/12 md:w-8/12 mx-auto">
                  <h4 className="text-primary-main-pink text-3xl md:text-4xl font-bold">
                    Upcoming Events
                  </h4>
                  <p className=" text-lg leading-8">
                    View our upcoming programs and discover events curated to match
                    your technical passion and skills.
                  </p>
                </section>
                <section className="container mx-auto md:p-8">
                  <div className="grid md:grid-cols-2 gap-x-5 gap-y-10 md:gap-y-20 mx-auto p-6">
                    {upcomingEvents.length ?
                      upcomingEvents.map((event, index) => {
                        return (
                          <div
                            key={index}
                            className="h-auto min-w-[250px] min-h-[250px] sm:min-w-[300px] lg:min-h-[526px] lg:min-w-[526px] place-self-center w-10/12"
                          >
                            <div className="border-primary-main-pink border-2">
                              <img
                                className="lg:min-h-[526px] lg:w-[550px] object-cover"
                                src={event.image}
                                alt={`${event.title}`}
                              />
                            </div>
                            <div className="bg-white text-center border-primary-main-pink border-[5px] py-8">
                              <p className="text-xl font-semibold">{event.title}</p>
                              <Link
                                to={"/view/events/" + event._id}
                                className="bg-primary-main-pink text-white py-2 px-10 rounded-md font-semibold"
                              >
                                Learn More
                              </Link>
                            </div>
                          </div>
                        )
                      })
                      : <div>
                        We have no upcoming event at the moment
                      </div>}
                  </div>
                </section>
              </div>

              <div className="md:my-28 my-12">
                <section className="py-3 md:py-5 text-center lg:w-6/12 md:w-8/12 mx-auto">
                  <h4 className="text-primary-main-pink text-4xl font-bold">
                    Past Events
                  </h4>
                  <p className=" text-lg leading-8">
                    View some of our past programs and the amazing moments.
                  </p>
                </section>
                <section className="container mx-auto md:p-8">
                  <div className="grid md:grid-cols-2 gap-x-5 gap-y-10 md:gap-y-20 mx-auto p-6">
                    {eventCall.isSuccess && pastEvents.length ?
                      pastEvents.map((event, index) => {
                        return (
                          <div
                            key={index}
                            className="h-auto min-w-[250px] min-h-[250px] sm:min-w-[300px] lg:min-h-[526px] lg:min-w-[526px] place-self-center w-10/12"
                          >
                            <div className="border-primary-main-pink border-2">
                              <img
                                className="lg:min-h-[526px] lg:w-[550px] object-cover"
                                src={event.image}
                                alt={`${event.title}`}
                              />
                            </div>
                            <div className="bg-white text-center border-primary-main-pink border-[5px] py-8">
                              <p className="text-xl font-semibold">{event.title}</p>
                              <Link
                                to={"/view/events/" + event._id}
                                className="bg-primary-main-pink text-white py-2 px-10 rounded-md font-semibold visited:text-primary-dark-pink"
                              >
                                Learn More
                              </Link>
                            </div>
                          </div>
                        );
                      })
                      : <div>
                        There are no Past event at the moment
                      </div>}
                  </div>
                </section>
              </div>
            </>
          : null}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Events;
