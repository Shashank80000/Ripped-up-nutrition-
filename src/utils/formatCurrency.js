export function formatINR(value) {
  const n = Number(value) || 0
  // show two decimal places, prefix with Indian Rupee symbol
  return `₹${n.toFixed(2)}`
}

export default formatINR
