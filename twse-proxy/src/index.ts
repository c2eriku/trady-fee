export default {
	async fetch(request: Request) {
		const url = 'https://openapi.twse.com.tw/v1/exchangeReport/STOCK_DAY_ALL';
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
