import Axios from "axios";
import { Link } from "react-router-dom";

function UserListRow(props) {
  const { _id, username, fullName, email, phone, password, bookedEvents } = props.obj;

  const handleClick = () => {
    // 1️⃣ Delete the user
    Axios.delete(`https://eventhub-t514.onrender.com/eventRoute/delete-user/${_id}`)
      .then((res) => {
        if (res.status === 200) {
          alert("Record deleted successfully");
          // Reloads the current route (no redirect to /)
          window.location.reload();
        } else {
          return Promise.reject();
        }
      })
      .catch((err) => alert(err));

    // 2️⃣ Clean up the user's registrations in all events
    Axios.get("https://eventhub-t514.onrender.com/eventRoute/event-list")
      .then((eventResponse) => {
        if (eventResponse.status === 200) {
          const collectedEvents = eventResponse.data;
          for (let i = 0; i < collectedEvents.length; i++) {
            let eventData = collectedEvents[i];
            eventData.registeredUsers = eventData.registeredUsers.filter(
              (user) => user.username !== username
            );

            Axios.put(
              `https://eventhub-t514.onrender.com/eventRoute/update-event/${eventData._id}`,
              eventData
            )
              .then((updateResponse) => {
                if (updateResponse.status === 200) console.log("Event details updated");
                else Promise.reject();
              })
              .catch((updateError) => alert(updateError));
          }
        }
      });
  };

  return (
    <tr>
      <td>{username}</td>
      <td>{fullName}</td>
      <td>{email}</td>
      <td>{phone}</td>

      <td className="d-flex justify-content-center">
        {/* Explicitly set type to prevent form-submit navigation */}
        <button type="button" onClick={handleClick} className="btn delete-button">
          Delete
        </button>
      </td>
    </tr>
  );
}

export default UserListRow;
