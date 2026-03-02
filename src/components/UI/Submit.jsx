import { useFormStatus } from "react-dom";
import Button from "./Button.jsx";

export default function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="shadow-md">
      {pending ? "Submitting..." : "Submit"}
    </Button>
  );
}
