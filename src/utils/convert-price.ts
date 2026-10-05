export function convertPrice(price: number) {
	return price.toLocaleString("uk-UA", {
		style: "currency",
		currency: "EUR",
	});
}
