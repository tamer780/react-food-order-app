import Button from "./Button.jsx";

export default function SuccessPage({ onSuccess }) {
  return (
    <>
      <h2>Success!</h2>
      <p>Your order was submitted successfully.</p>
      <p className="modal-actions">
        <Button onClick={onSuccess}>Okay</Button>
      </p>
    </>
  );
}
