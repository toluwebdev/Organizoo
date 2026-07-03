import React from "react";
import FeaturesCards from "./FeaturesCards";
import FeaturesCards2 from "./FeauturesCard2";
import { motion } from "framer-motion";
import { images } from "../../assets/data";
import GlobalButton from "../GlobalButton";
const Feautures = () => {
  const [showAll, setShowAll] = React.useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-5xl px-3 mt-20 mx-auto"
    >
      <h1 className="font-primary mt-2 text-2xl font-semibold text-center max-w-3xl mx-auto mb-20 tracking-tight text-[#110111] sm:mt-3 sm:text-3xl lg:text-5xl">
        Everything You Need to Make Events Memorable
      </h1>
      <div className="flex  gap-20 flex-col ">
        <FeaturesCards
          index={1}
          image={images.event1}
          title={"Event Creation & Management"}
          buttonText="Create an Event"
          description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis perferendis deserunt ipsum tenetur similique. Placeat veritatis rem animi a accusantium ipsam, mollitia eveniet. Animi aperiam culpa suscipit, ab minima deleniti."
        />
        <FeaturesCards
          index={2}
          image={images.event2}
          title={" Social Event Discovery"}
          buttonText={"View Socials"}
          description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis perferendis deserunt ipsum tenetur similique. Placeat veritatis rem animi a accusantium ipsam, mollitia eveniet. Animi aperiam culpa suscipit, ab minima deleniti."
        />
        <FeaturesCards
          index={3}
          image={images.event3}
          buttonText={"Get Tickets"}
          title={"Tickets & Registration"}
          description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis perferendis deserunt ipsum tenetur similique. Placeat veritatis rem animi a accusantium ipsam, mollitia eveniet. Animi aperiam culpa suscipit, ab minima deleniti."
        />
        <FeaturesCards
          index={4}
          image={images.event4}
          buttonText="Get Started"
          title={"Notifications & Reminders"}
          description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis perferendis deserunt ipsum tenetur similique. Placeat veritatis rem animi a accusantium ipsam, mollitia eveniet. Animi aperiam culpa suscipit, ab minima deleniti."
        />
        <FeaturesCards
          index={5}
          image={images.event4}
          title={"Community Interaction"}
          buttonText="Get Started"
          description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis perferendis deserunt ipsum tenetur similique. Placeat veritatis rem animi a accusantium ipsam, mollitia eveniet. Animi aperiam culpa suscipit, ab minima deleniti."
        />
        <FeaturesCards
          index={6}
          image={images.event4}
          title={"Analytics & Insights"}
          buttonText="View Analytics"
          description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis perferendis deserunt ipsum tenetur similique. Placeat veritatis rem animi a accusantium ipsam, mollitia eveniet. Animi aperiam culpa suscipit, ab minima deleniti."
        />

        <div className="flex flex-col justify-center">
          {showAll && (
            <>
              <motion.h1
                initial={{ opacity: 0, y: 10, }}
                transition={{duration:1}}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{once: true}}
                className="font-primary mt-2 text-2xl font-semibold text-center max-w-3xl mx-auto mb-10 tracking-tight text-[#110111] sm:mt-3 sm:text-3xl lg:text-5xl">
                Other Feautures
              </motion.h1>
              <div className="flex flex-col gap-5">
                <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 max-sm:gap-3">
                  <FeaturesCards2
                    index={0}
                    img={images.event1}
                    text="Event Creation & Management  "
                    description=" Easily create events, manage RSVPs, and track attendees."
                  />
                  <FeaturesCards2
                    index={1}
                    img={images.event1}
                    text="Social Event Discovery "
                    description="Explore trending or nearby events, see what friends are attending"
                  />
                </div>

                <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-sm:gap-3">
                  <FeaturesCards2
                    index={2}
                    img={images.event1}
                    text="Tickets & Registration"
                    description="Sell tickets or manage free registrations seamlessly."
                  />

                  <FeaturesCards2
                    index={3}
                    img={images.event1}
                    text="Notifications & Reminders"
                    description="Never miss an event with smart alerts."
                  />
                  <FeaturesCards2
                    index={4}
                    img={images.event1}
                    text="Community Interaction  "
                    description="Comment, like, and share events with friends."
                  />
                </div>
                <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 max-sm:gap-3">
                  <FeaturesCards2
                    index={5}
                    img={images.event1}
                    text="Analytics & Insights"
                    description="Monitor attendance, engagement, and feedback to improve your events."
                  />
                  <FeaturesCards2
                    index={6}
                    img={images.event1}
                    text="Text"
                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis harum, deserunt saepe minima ipsa nisi voluptatum asperiores cupiditate neque?"
                  />
                </div>
              </div>
            </>
          )}
          <div className="max-w-xl mt-10 mx-auto">
            <GlobalButton
              onClick={() => setShowAll(!showAll)}
              outlined
              text={showAll ? "View less" : "View more"}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Feautures;
