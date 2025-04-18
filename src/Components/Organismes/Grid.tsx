import UserCard from "../Molecules/UserCard/UserCard";
import { Status } from "../Molecules/UserCard";
import Search from "../Atoms/Search/Search";
import { useState, ChangeEvent, useRef } from "react";
import LoadingPage from "../Pages/LoadingPage";
import { useFetchUsers } from "../../hooks/useFetchUsers";
import { useFetchUser } from "../../hooks/useFetchUser";
import { useThemeStore } from "../../store/theme/themeStore";

const Grid = () => {
  const { data: allUsers, fetching: fetchingAll } = useFetchUsers();
  const {
    users: searchedUsers,
    fetching: fetchingSearch,
    fetchUser,
  } = useFetchUser();

  const [searchMessage, setSearchMessage] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const lightTheme = useThemeStore((state) => state.lightTheme);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchMessage(value);

    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    timeoutId.current = setTimeout(() => {
      if (value.trim() !== "") {
        fetchUser(value);
        setHasSearched(true);
      } else {
        setHasSearched(false);
      }
    }, 750);
  };

  const isSearching = hasSearched;
  const displayedUsers = isSearching ? searchedUsers : allUsers;
  const isLoading = isSearching ? fetchingSearch : fetchingAll;

  if (isLoading) return <LoadingPage />;
  else
    return (
      <div
        className={`${lightTheme ? "bg-white" : "bg-gray-500"} min-h-screen`}
      >
        <Search label={searchMessage} onChange={handleChange} />
        {displayedUsers.length == 0 ? (
          <div className="flex flex-col justify-between items-center">
            <div
              className={`flex flex-col justify-center items-center rounded-2xl p-2 ${
                lightTheme ? "bg-gray-500" : "bg-gray-700"
              } `}
            >
              <h1
                className={`text-2xl font-bold text-center p-2 roundex-2xl ${
                  lightTheme
                    ? "text-[var(--color-primary)]"
                    : "text-[var(--color-secondary)]"
                }`}
              >
                No User Match Search Criteria
              </h1>
            </div>
          </div>
        ) : (
          <div className="m-8 grid gap-4 max-w-full grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayedUsers.map((user) => (
              <UserCard
                key={user.id}
                firstName={user.firstName}
                lastName={user.lastName}
                email={user.email}
                status={user.status as Status}
                dob={new Date(user.dateOfBirth)}
              />
            ))}
          </div>
        )}
      </div>
    );
};
export default Grid;