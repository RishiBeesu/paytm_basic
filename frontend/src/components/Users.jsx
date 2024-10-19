import { useState } from "react";
import { Button } from "./Button";

export function Users() {
  const [users, setUsers] = useState([
    {
      firstName: "rishi",
      lastName: "beesu",
      _id: 1,
    },
  ]);

  return (
    <>
      <div className="font-bold mt-6 text-xl">Users</div>
      <div className="px-4 my-4">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full border rounded border-slate-200 px-2 py-1"
        />
      </div>
      <div>
        {users.map((user) => (
          <User user={user} />
        ))}
      </div>
    </>
  );
}

function User({ user }) {
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="mr-2 flex justify-center rounded-full bg-slate-200 w-12 h-12">
          <div className="flex flex-col justify-center text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="font-bold text-xl">
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center mr-4">
        <Button label={"Send Money"} />
      </div>
    </div>
  );
}
