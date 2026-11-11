
import { useState } from "react";
import "./App.css";

import TicketForm from "./components/TicketForm";
import TicketResult from "./components/TicketResult";
import classifyTicket from "./utils/classifyTicket";

function App() {
  const [result, setResult] = useState(null);

  function handleTicketSubmit(ticketData) {
    // Pass both description and Order ID to the classifier
    const classification = classifyTicket(
      ticketData.description,
      ticketData.orderId
    );

    // Store the classification result
    setResult(classification);
  }

  return (
    <div className="app">
      <h1>Support Triage Desk</h1>

      <p>
        Submit your support issue to find the right support team.
      </p>

      <TicketForm onSubmit={handleTicketSubmit} />

      <TicketResult result={result} />
    </div>
  );
}

export default App;
