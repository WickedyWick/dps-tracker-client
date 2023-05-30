/** @type {import('./$types').PageServerLoad} */
//import { db } from '$lib';
import { getDataForRoom } from '../../lib/utils/service';
export async function load({ url }) {
    const pwd = url.searchParams.get('Pwd') || '';
    const id = url.searchParams.get('Id') || ''
    console.log(pwd, id)
    return {
        pwd: pwd,
        id: id
    };
    /*return {
        data: {
        'DaddyWick': {
            hp: 0,
            ar: 0,
            lastHp:0,
            lastAr:0
        },
        'Folidar': {
            hp: 0,
            ar: 0,
            lastHp:0,
            lastAr:0
        },
        'Remath': {
            hp: 0,
            ar: 0,
            lastHp:0,
            lastAr:0
        },
        'Celerity': {
            hp: 0,
            ar: 0,
            lastHp:0,
            lastAr:0
        },
        'Lyramis': {
            hp: 0,
            ar: 0,
            lastHp:0,
            lastAr:0
        },
        'Lice': {
            hp: 0,
            ar: 0,
            lastHp:0,
            lastAr:0
        },
        'Vetala': {
            hp: 0,
            ar: 0,
            lastHp:0,
            lastAr:0
        },
        'Addled Figment': {
            hp: 0,
            ar: 0,
            lastHp:0,
            lastAr:0
        },
        'Stun Trap': {
            hp: 0,
            ar: 0,
            lastHp:0,
            lastAr:0
        },
        'Deldaron': {
            hp: 0,
            ar: 0,
            lastHp:0,
            lastAr:0
        },
        'Remechanics': {
            hp: 0,
            ar: 0,
            lastHp:0,
            lastAr:0
        },
        'Ranperre': {
            hp: 0,
            ar: 0,
            lastHp:0,
            lastAr:0
        },
        'McBreezy': {
            hp: 0,
            ar: 0,
            lastHp:0,
            lastAr:0
        },
        'ProfessorCat': {
            hp: 0,
            ar: 0,
            lastHp:0,
            lastAr:0
        },
        'Thunderbird': {
            hp: 0,
            ar: 0,
            lastHp:0,
            lastAr:0
        },
        'Razzly': {
            hp: 0,
            ar: 0,
            lastHp:0,
            lastAr:0
        },
        'The25thBaam': {
            hp: 0,
            ar: 0,
            lastHp:0,
            lastAr:0
        }
    }}*/

};

export const ssr = true;