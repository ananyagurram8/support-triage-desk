
function TicketResult({ result }) {
  if (!result) {
    return null;
  }

  let categoryClass = "manual-review";

  if (result.category === "Billing Issue") {
    categoryClass = "billing";
  } else if (result.category === "Account Access") {
    categoryClass = "account";
  } else if (result.category === "Delivery Issue") {
    categoryClass = "delivery";
  }

  return (
    <div className="result-card">
      <h2>Classification Result</h2>

      <p>
        <strong>Category:</strong>{" "}
        <span className={`category-badge ${categoryClass}`}>
          {result.category}
        </span>
      </p>

      <p>
        <strong>Assigned Team:</strong> {result.team}
      </p>

      <p>
        <strong>Explanation:</strong> {result.explanation}
      </p>
    </div>
  );
}

export default TicketResult;
