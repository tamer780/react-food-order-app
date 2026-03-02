import { useFetch } from "../../hooks/useFetch.jsx";
import ErrorPage from "../UI/ErrorPage.jsx";
import MealItem from "./MealItem.jsx";

export default function Meals() {
  const {
    data: meals,
    loading,
    error,
  } = useFetch("http://localhost:3000/meals", []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-50">
        <p className="text-xl font-semibold animate-pulse text-gray-600">
          Fetching data...
        </p>
      </div>
    );
  }

  if (error) {
    return <ErrorPage title="Failed to fetch meals" message={error.message} />;
  }

  return (
    <section className="my-14">
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-4 w-[80%] max-w-280 mx-auto ">
        {meals.map((meal) => (
          <MealItem meal={meal} key={meal.id} />
        ))}
      </ul>
    </section>
  );
}
