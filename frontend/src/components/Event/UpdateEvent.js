import { useState, useEffect } from "react";
import Axios from "axios";
import EventRegistrationForm from "./eventform";

function UpdateEvent() {
  const [formData, setFormData] = useState({
    nameValue: "",
    startTimeValue: "", // fixed typo: was `startValue`
    endTimeValue: "",
    dateValue: "",
    placeValue: "",
    descriptionValue: "",
    clubValue: "",
    slotsValue: "",
  });

  const [registeredUsersValue, setRegisteredUsersValue] = useState([]);

  useEffect(() => {
    const eventID = localStorage.getItem("eventID");
    Axios.get(`https://eventhub-t514.onrender.com/eventRoute/check-event/${eventID}`)
      .then((response) => {
        const data = response.data;
        setFormData({
          nameValue: data.name,
          startTimeValue: data.startTime,
          endTimeValue: data.endTime,
          dateValue: data.date,
          placeValue: data.place,
          descriptionValue: data.description,
          clubValue: data.club,
          slotsValue: data.slots,
        });
        setRegisteredUsersValue(data.registeredUsers);
      })
      .catch((error) => {
        console.error("Error fetching event details:", error);
      });
  }, []); // ✅ empty dependency: only run once

  return (
    <EventRegistrationForm
      nameValue={formData.nameValue}
      startTimeValue={formData.startTimeValue}
      endTimeValue={formData.endTimeValue}
      dateValue={formData.dateValue}
      placeValue={formData.placeValue}
      descriptionValue={formData.descriptionValue}
      clubValue={formData.clubValue}
      slotsValue={formData.slotsValue}
      action="update"
      id={localStorage.getItem("eventID")}
      registeredUsersValue={registeredUsersValue}
    />
  );
}

export default UpdateEvent;
