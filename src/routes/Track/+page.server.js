/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {
        'test': 'test'
    };
};

export const ssr = true;