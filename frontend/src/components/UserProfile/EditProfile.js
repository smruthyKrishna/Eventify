import { useState, useEffect } from "react";
import Axios from "axios";
import RegistrationForm from "../Login/RegistrationForm";

function UserUpdateForm() {
  const [formData, setFormData] = useState({
    usernameValue: '',
    fullNameValue: '',
    emailValue: '',
    phoneValue: '',
    passwordValue: '',
  });

  const [bookedEventsValue, setBookedEventsValue] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) return;

    Axios.get(`https://eventhub-t514.onrender.com/eventRoute/check-user/${user}`)
      .then(response => {
        const { username, fullName, email, phone, password, bookedEvents } = response.data;

        setFormData({
          usernameValue: username || '',
          fullNameValue: fullName || '',
          emailValue: email || '',
          phoneValue: phone || '',
          passwordValue: password || '',
        });

        setBookedEventsValue(bookedEvents || []);
        console.log("From profile page:", response.data);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });
  }, []); // ✅ empty dependency array: runs only once on mount

  return (
    <RegistrationForm
      usernameValue={formData.usernameValue}
      fullNameValue={formData.fullNameValue}
      emailValue={formData.emailValue}
      phoneValue={formData.phoneValue}
      passwordValue={formData.passwordValue}
      bookedEventsValue={bookedEventsValue}
      id={localStorage.getItem("userID")}
      action="update"
    />
  );
}

export default UserUpdateForm;
