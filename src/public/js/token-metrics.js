async function fetchTokenMetrics() {
    try {
        const response = await fetch('/api/token/metrics');
        const { data } = await response.json();
        
        // Update UI elements
        document.querySelector('.total-holders').textContent = data.totalHolders;
        document.querySelector('.total-supply').textContent = 
            `${(data.totalSupply / 1000000).toFixed(2)}M $BYTE`;
        
        // Update holder list if needed
        if (data.holders) {
            updateHolderList(data.holders);
        }
    } catch (error) {
        console.error('Error fetching token metrics:', error);
    }
}

// Fetch metrics every 60 seconds
setInterval(fetchTokenMetrics, 60000);
fetchTokenMetrics(); // Initial fetch 