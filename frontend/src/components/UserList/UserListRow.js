import Axios from "axios";
import { useCallback } from "react";

function UserListRow(props) {
  const { _id, username, fullName, email, phone } = props.obj;

  const handleClick = useCallback(() => {
    // Delete the user
    Axios.delete(`https://eventhub-t514.onrender.com/eventRoute/delete-user/${_id}`)
      .then((res) => {
        if (res.status === 200) {
          alert("Record deleted successfully");
          // Then clean up all events
          Axios.get("https://eventhub-t514.onrender.com/eventRoute/event-list")
            .then((eventResponse) => {
              if (eventResponse.status === 200) {
                const collectedEvents = eventResponse.data;
                collectedEvents.forEach((eventData) => {
                  const updatedUsers = eventData.registeredUsers.filter(
                    (user) => user.username !== username
                  );

                  if (updatedUsers.length !== eventData.registeredUsers.length) {
                    // Only update if something actually changed
                    Axios.put(
                      `https://eventhub-t514.onrender.com/eventRoute/update-event/${eventData._id}`,
                      { ...eventData, registeredUsers: updatedUsers }
                    )
                      .then((updateRes) => {
                        if (updateRes.status === 200) {
                          console.log("User removed from event:", eventData.name);
                        } else {
                          return Promise.reject();
                        }
                      })
                      .catch((updateError) => alert(updateError));
                  }
                });
              }
            })
            .catch((eventErr) => alert(eventErr));

          // Refresh the page after all cleanup
          setTimeout(() => window.location.reload(), 1000);
        } else {
          return Promise.reject();
        }
      })
      .catch((err) => alert(err));
  }, [_id, username]);

  return (
    <tr>
      <td>{username}</td>
      <td>{fullName}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td className="d-flex justify-content-center">
        <button type="button" onClick={handleClick} className="btn delete-button">
          Delete
        </button>
      </td>
    </tr>
  );
}

export default UserListRow;
