module.exports = {
  format_date: (date) => {
    if (!(date instanceof Date)) {
      throw new Error('Invalid date provided');
    }
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  
  format_amount: (amount) => {
    if (typeof amount !== 'number') {
      throw new Error('Invalid amount provided');
    }
    // Format large numbers with commas
    return amount.toLocaleString();
  },

  get_emoji: () => {
    const randomNum = Math.random();

    // Return a random emoji
    if (randomNum > 0.7) {
      return `<span role="img" aria-label="lightbulb">💡</span>`;
    } else if (randomNum > 0.4) {
      return `<span role="img" aria-label="laptop">💻</span>`;
    } else {
      return `<span role="img" aria-label="gear">⚙️</span>`;
    }
  },
};  