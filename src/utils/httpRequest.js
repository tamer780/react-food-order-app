export async function fetchMeals() {
  const response = await fetch("http://localhost:3000/meals");
  if (!response.ok) {
    throw new Error("Failed to fetch meals.");
  }
  const meals = await response.json();
  return meals;
}
export async function sendMealRequest(meals, customerInfo) {
  const response = await fetch("http://localhost:3000/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      order: {
        items: meals,
        customer: customerInfo,
      },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to send order.");
  }
}
