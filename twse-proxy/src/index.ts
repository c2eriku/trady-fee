export default {
	async fetch(request: Request) {
		const { searchParams } = new URL(request.url);
		const stockId = searchParams.get('stockId');
		const url = `https://mis.twse.com.tw/stock/api/getStockInfo.jsp?json=1&delay=0&ex_ch=tse_${stockId}.tw`;
		const response = await fetch(url);
		const data = await response.text();
		return new Response(data, {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Cache-Control': 'public, max-age=300',
			},
		});
	},
};
