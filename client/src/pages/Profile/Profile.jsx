import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Profile.css";
import avatar from "../../assets/avatars/avatar3.png";
import { Button, Heading, Image } from "@chakra-ui/react";
import ProfileDetails from "../../components/Profile/ProfileDetails/ProfileDetails";
import RecentResults from "../../components/Profile/RecentResults/RecentResults";
import { useDispatch, useSelector } from "react-redux";
import { getAllResults } from "../../actions/results";
import { countExamsByDate } from "../../utils/ProfileUtils";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { useToast } from "@chakra-ui/react";

const Profile = () => {
  const User = useSelector((state) => state.currentUserReducer)?.result;
  console.log(User);
  const userId = User?._id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllResults(userId));
  }, [userId, dispatch]);
  const results = useSelector((state) => state.resultsReducer).data;
  console.log(results);
  let heatmapData = [];
  if (results.length > 0) {
    heatmapData = countExamsByDate(results);
    console.log(heatmapData);
  }
  const toast = useToast();

  return (
    <div className="profile-outer-container">
      <Navbar heading="orangered" button="orange" />
      <div className="profile-navbar-container"></div>
      <div className="profile-main-container">
        <div className="profile-left-container">
          <div className="profile-img-container">
            <Image src={avatar} alt="avatar" height="35vh" />
          </div>
          <div className="profile-details-container">
            {User && <ProfileDetails user={User} />}
          </div>
        </div>
        <div className="profile-right-container">
          <div className="profile-top-container">
            {results?.length > 0 && <RecentResults results={results} />}
          </div>
          {heatmapData.length > 0 && (
            <div className="profile-bottom-container">
              <div className="profile-heatmap-heading">
                <Heading
                  size="lg"
                  fontWeight="normal"
                  color="teal"
                  textAlign="left"
                >
                  செயல்பாடு
                </Heading>
              </div>
              <div className="profile-heatmap-container">
                <CalendarHeatmap
                  startDate={new Date("2024-01-01")}
                  endDate={new Date("2024-12-31")}
                  gutterSize={2}
                  onClick={(value) =>
                    value?.date
                      ? toast({
                          description: value?.date
                            ? `${value?.date} அன்று நீங்கள் ${value?.value} சோதனைகளை முடித்தீர்கள்`
                            : ``,
                          status: `info`,
                        })
                      : null
                  }
                  values={heatmapData}
                  titleForValue={(value) =>
                    value?.date
                      ? `On ${value?.date}, you completed ${value?.value} tests`
                      : ""
                  }
                  classForValue={(value) => {
                    if (!value) {
                      return "color-empty";
                    }
                    return `color-scale-${value.value}`;
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
