
import classifyTicket from "./classifyTicket.js";

const testCases = [
  {
    ticket: "I was charged twice for my order.",
    orderId: "ORD123",
    expectedCategory: "Billing Issue",
    expectedTeam: "Billing"
  },
  {
    ticket: "I need a refund for my order.",
    orderId: "",
    expectedCategory: "Billing Issue",
    expectedTeam: "Manual Review"
  },
  {
    ticket: "My package was due yesterday and hasn't arrived.",
    orderId: "ORD456",
    expectedCategory: "Delivery Issue",
    expectedTeam: "Fulfillment"
  },
  {
    ticket: "My package is delayed.",
    orderId: "",
    expectedCategory: "Delivery Issue",
    expectedTeam: "Manual Review"
  },
  {
    ticket: "I cannot log in to my account.",
    orderId: "",
    expectedCategory: "Account Access",
    expectedTeam: "Account Support"
  },
  {
    ticket: "Please help me.",
    orderId: "",
    expectedCategory: "Unclear",
    expectedTeam: "Manual Review"
  },
  {
    ticket: "I can't log in and I need a refund.",
    orderId: "ORD789",
    expectedCategory: "Unclear",
    expectedTeam: "Manual Review"
  },
  {
    ticket: "I was not charged twice. I only paid once.",
    orderId: "",
    expectedCategory: "Unclear",
    expectedTeam: "Manual Review"
  },
  {
    ticket: "I need a refund for my order.",
    orderId: "ORD111",
    expectedCategory: "Billing Issue",
    expectedTeam: "Billing"
  },
  {
    ticket: "My delivery has not arrived.",
    orderId: "ORD222",
    expectedCategory: "Delivery Issue",
    expectedTeam: "Fulfillment"
  }
];

let passed = 0;
let failed = 0;

testCases.forEach((test, index) => {
  const result = classifyTicket(test.ticket, test.orderId);

  const isCorrect =
    result.category === test.expectedCategory &&
    result.team === test.expectedTeam;

  console.log(`TEST ${index + 1}: ${isCorrect ? "PASSED" : "FAILED"}`);
  console.log("Ticket:", test.ticket);
  console.log("Order ID:", test.orderId || "Not provided");
  console.log("Expected:", test.expectedCategory, "-", test.expectedTeam);
  console.log("Actual:", result.category, "-", result.team);
  console.log("------------------------");

  if (isCorrect) {
    passed++;
  } else {
    failed++;
  }
});

console.log("\nTEST SUMMARY");
console.log("Total tests:", testCases.length);
console.log("Passed:", passed);
console.log("Failed:", failed);
