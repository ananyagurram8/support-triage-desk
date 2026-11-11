
import { useState } from "react";

function TicketForm({ onSubmit }) {
  const [description, setDescription] = useState("");
  const [orderId, setOrderId] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit({
      description,
      orderId
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="description">
        Describe your issue
      </label>

      <textarea
        id="description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Example: I was charged twice for my order..."
        required
      />

      <label htmlFor="orderId">
        Order ID (optional)
      </label>

      <input
        id="orderId"
        type="text"
        value={orderId}
        onChange={(event) => setOrderId(event.target.value)}
        placeholder="Enter your order ID"
      />

      <button type="submit">
        Classify Ticket
      </button>
    </form>
  );
}

export default TicketForm;
