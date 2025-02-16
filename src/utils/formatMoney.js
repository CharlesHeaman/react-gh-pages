function formatMoney(pounds) {
    const formatter = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',      
      });
    return formatter.format(pounds)
}

module.exports = formatMoney