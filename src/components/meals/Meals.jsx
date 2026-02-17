import MealItem from "./MealItem.jsx";
import { fetchMeals } from "../../utils/httpRequest.js";
import { useFetch } from "../../hooks/useHttp.js";
import ErrorPage from "../UI/ErrorPage.jsx";
export default function Meals() {
  const { data: meals, isLoading, isError } = useFetch(fetchMeals, []);

  if (isError) {
    return (
      <ErrorPage
        title="Failed to fetch meals"
        message={isError.message || "Something went wrong!"}
      />
    );
  }

  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }
  return (
    <ul id="meals">
      {meals.length > 0 ? (
        meals.map((meal) => <MealItem key={meal.id} meal={meal} />)
      ) : (
        <p className="center">No meals found.</p>
      )}
    </ul>
  );
}
