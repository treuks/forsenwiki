import toHTML from "$lib/worker/toHTML";

/**
 * @param {string} update
 */
export const updateToHTML = async (update) => {
	try {
		const html = await toHTML({ config: 'article', update });

		return html;
	} catch (err) {
		console.error(err);
		throw 500;
	}
};
