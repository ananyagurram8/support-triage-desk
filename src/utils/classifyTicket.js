
function classifyTicket(description, orderId = "") {
  // Step 1: Normalize the inputs
  const text = description.trim().toLowerCase();
  const hasOrderId = orderId.trim().length > 0;

  // Step 2: Define keyword groups
  const billingKeywords = [
    "charged",
    "payment",
    "refund",
    "invoice",
    "billing",
    "double charge",
    "charged twice"
  ];

  const accountKeywords = [
    "password",
    "login",
    "log in",
    "sign in",
    "account access",
    "can't log in",
    "cannot log in"
  ];

  const deliveryKeywords = [
    "package",
    "delivery",
    "shipment",
    "shipped",
    "arrived",
    "not arrived",
    "delayed"
  ];

  // Step 3: Check for phrases denying a duplicate charge
  const noDuplicateCharge = [
    "not charged twice",
    "was not charged twice",
    "wasn't charged twice",
    "only paid once",
    "no duplicate charge"
  ].some(phrase => text.includes(phrase));

  const otherBillingKeywords = [
    "refund",
    "invoice",
    "billing",
    "payment"
  ];

  const hasOtherBillingIssue = otherBillingKeywords.some(
    keyword => text.includes(keyword)
  );

  // Step 4: Identify matching categories
  const matches = [];

  if (
    (!noDuplicateCharge &&
      billingKeywords.some(keyword => text.includes(keyword))) ||
    hasOtherBillingIssue
  ) {
    matches.push("billing");
  }

  if (accountKeywords.some(keyword => text.includes(keyword))) {
    matches.push("account");
  }

  if (deliveryKeywords.some(keyword => text.includes(keyword))) {
    matches.push("delivery");
  }

  // Step 5: Handle unclear or conflicting tickets
  if (matches.length !== 1) {
    return {
      category: "Unclear",
      team: "Manual Review",
      explanation:
        "The ticket does not provide enough clear information to assign it to one support team."
    };
  }

  // Step 6: Apply the routing policy
  switch (matches[0]) {
    case "billing":
      if (!hasOrderId) {
        return {
          category: "Billing Issue",
          team: "Manual Review",
          explanation:
            "Billing issue identified. An Order ID is required for direct routing to the Billing team."
        };
      }

      return {
        category: "Billing Issue",
        team: "Billing",
        explanation:
          "The ticket mentions a payment or billing-related problem."
      };

    case "account":
      return {
        category: "Account Access",
        team: "Account Support",
        explanation:
          "The ticket mentions a login or account access problem."
      };

    case "delivery":
      if (!hasOrderId) {
        return {
          category: "Delivery Issue",
          team: "Manual Review",
          explanation:
            "Delivery issue identified. An Order ID is required for direct routing to the Fulfillment team."
        };
      }

      return {
        category: "Delivery Issue",
        team: "Fulfillment",
        explanation:
          "The ticket mentions a delivery or shipment-related problem."
      };

    default:
      return {
        category: "Unclear",
        team: "Manual Review",
        explanation:
          "The ticket could not be classified confidently."
      };
  }
}

export default classifyTicket;
