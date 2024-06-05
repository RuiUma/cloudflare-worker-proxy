export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
	
		
		const pattern = /^(http?:\/\/[^\/]+\/)proxy\//;
		const newBase = 'https://coding-club-nextjs.vercel.app/';
		
		console.log(request.url);
		const url = new URL(request.url.replace(pattern, newBase));

		console.log(url);
		
		if (url.toString() === request.url) {
			return new Response('cannot modify URL');
		}
		// const proxyUrl = url.searchParams.get('proxyUrl'); // get a query param value (?proxyUrl=...)
		// const modify = url.searchParams.has('modify'); // check if a query param is set (?proxyUrl=...&modify)

		// if (!proxyUrl) {
		// 	return new Response('Bad request: Missing `proxyUrl` query param', { status: 400 });
		// }

		// make subrequests with the global `fetch()` function
		let res = await fetch(url, request);

		// optionally, modify the respone
		res = new Response(res.body, res);
		res.headers.set('X-My-Header', 'My Header Value');
		

		return res;
	},
};
